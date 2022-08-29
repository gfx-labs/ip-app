import React, { useCallback, useContext, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { getWallet, WalletType } from './WalletOptions'
import {
  JsonRpcProvider,
  JsonRpcSigner,
  TransactionResponse,
} from '@ethersproject/providers'
import { BigNumber, providers } from 'ethers'

import { SignatureLike } from '@ethersproject/bytes'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BACKUP_PROVIDER } from '../../../constants'
import hexToAscii from '../../util/helpers/hexToAscii'
import getGasPrice from '../../../contracts/misc/getGasPrice'

type transactionType = {
  value?: string | undefined
  from?: string | undefined
  to?: string | undefined
  nonce?: number | undefined
  gasLimit?: BigNumber | undefined
  gasPrice?: BigNumber | undefined
  data?: string | undefined
  chainId?: number | undefined
}

export type ERC20TokenType = {
  address: string
  symbol: string
  decimals: number
  image?: string
  aToken?: boolean
}

export type Web3Data = {
  connectWallet: (wallet: WalletType) => Promise<boolean>
  disconnectWallet: () => void
  currentAccount: string
  currentSigner: JsonRpcSigner | undefined
  connected: boolean
  loading: boolean
  provider: JsonRpcProvider | undefined
  chainId: number
  dataBlock: number
  gasPrice: number
  getTxError: (txHash: string) => Promise<string>
  sendTx: (txData: transactionType) => Promise<TransactionResponse>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signTxData: (unsignedData: string) => Promise<SignatureLike>
  error: Error | undefined
  signerOrProvider: JsonRpcSigner | JsonRpcProvider | undefined
}

export type Web3ContextData = {
  web3ProviderData: Web3Data
}

export const Web3Context = React.createContext({} as Web3ContextData)

export const Web3ContextProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const {
    account,
    chainId,
    library: provider,
    activate,
    active,
    error,
    deactivate,
    setError,
  } = useWeb3React<providers.Web3Provider>()

  const [loading, setLoading] = useState<boolean>(false)
  const [connector, setConnector] = useState<AbstractConnector>()
  const [currentSigner, setCurrentSigner] = useState<JsonRpcSigner>()
  const [signerOrProvider, setSignerOrProvider] = useState<
    JsonRpcSigner | JsonRpcProvider | undefined
  >()

  const [deactivated, setDeactivated] = useState<boolean>(false)
  const [tried, setTried] = useState<boolean>(false)

  const [dataBlock, setDataBlock] = useState(0)
  const [gasPrice, setGasPrice] = useState(0)

  // Wallet connection and disconnection
  // clean local storage
  const cleanConnectorStorage = useCallback((): void => {
    if (connector instanceof WalletConnectConnector) {
      localStorage.removeItem('walletconnect')
    }
    if (connector instanceof WalletLinkConnector) {
      localStorage.removeItem('-walletlink:https://www.walletlink.org:version')
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:id'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:secret'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:session:linked'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:AppVersion'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:Addresses'
      )
      localStorage.removeItem(
        '-walletlink:https://www.walletlink.org:walletUsername'
      )
    }
  }, [connector])

  const disconnectWallet = useCallback(async () => {
    cleanConnectorStorage()

    localStorage.removeItem('walletProvider')
    deactivate()

    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error
      await connector.close()
    }

    setDeactivated(true)

    setLoading(false)

    window.location.reload()
  }, [provider, connector])

  const connectWallet = useCallback(
    async (wallet: WalletType) => {
      setLoading(false)
      try {
        const connector: AbstractConnector = getWallet(wallet, chainId)

        if (connector instanceof WalletConnectConnector) {
          connector.walletConnectProvider = undefined
        }

        await activate(connector, undefined, true)
        setConnector(connector)
        localStorage.setItem('walletProvider', wallet.toString())
        setDeactivated(false)
        setLoading(false)
        return true
      } catch (e) {
        const err = e as Error
        setError(err)
        setLoading(false)
        console.error(err)

        throw new Error('Error connecting to')
      }
    },
    [disconnectWallet]
  )

  useEffect(() => {
    const tempProvider = provider
      ? provider
      : new JsonRpcProvider(BACKUP_PROVIDER)

    if (tempProvider) {
      console.log('started auto refresh of blockNumber for', tempProvider)
      tempProvider.on('block', (n: number) => {
        const tempSignerOrProvider = signerOrProvider
          ? signerOrProvider
          : tempProvider

        getGasPrice(tempSignerOrProvider!).then((gas) => {
          setGasPrice(Number(gas))
        })
        if (n > dataBlock) {
          setDataBlock(n)
        }
      })
      return () => {
        console.log('stopped auto refresh of blockNumber for', provider)
        tempProvider.on('block', () => {})
      }
    }
  }, [provider])

  useEffect(() => {
    setSignerOrProvider(
      currentSigner ? currentSigner : new JsonRpcProvider(BACKUP_PROVIDER)
    )
  }, [provider, currentSigner])

  // handle logic to eagerly connect to the injected ethereum provider,
  // if it exists and has granted access already
  useEffect(() => {
    const lastWalletProvider = localStorage.getItem('walletProvider')
    if (!active && !deactivated) {
      if (!!lastWalletProvider) {
        connectWallet(lastWalletProvider as WalletType).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    }
  }, [activate, setTried, active, connectWallet, deactivated])

  useEffect(() => {
    if (window && window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  const getTxError = async (txHash: string): Promise<string> => {
    try {
      const tx = await provider?.getTransaction(txHash)
      // @ts-expect-error TODO: need think about "tx" type
      const code = await provider.call(tx, tx?.blockNumber)
      const txError = hexToAscii(code.substr(138))

      return txError
    } catch (err) {
      const error = err as Error

      throw new Error(error.message)
    }
  }

  const sendTx = async (
    txData: transactionType
  ): Promise<TransactionResponse> => {
    const { from, value } = txData

    const bigNumValue = value ? BigNumber.from(value) : undefined
    try {
      const signer = provider?.getSigner(from)

      // @ts-expect-error
      const txResponse: TransactionResponse = await signer.sendTransaction({
        ...txData,
        value: bigNumValue,
      })

      return txResponse
    } catch (err) {
      const error = err as Error

      throw new Error(error.message)
    }
  }

  const signTxData = async (unsignedData: string): Promise<SignatureLike> => {
    try {
      const signature: SignatureLike = await provider?.send(
        'eth_signTypedData_v4',
        [account, unsignedData]
      )

      return signature
    } catch (err) {
      const error = err as Error
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    if (provider && account) {
      setCurrentSigner(provider?.getSigner(account?.toLowerCase()))
    }
  }, [provider, account])

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          connectWallet,
          disconnectWallet,
          provider,
          currentSigner,
          connected: active,
          loading,
          chainId: chainId || 1,
          getTxError,
          sendTx,
          dataBlock,
          gasPrice,
          signTxData,
          error,
          currentAccount: account?.toLowerCase() || '',
          signerOrProvider,
        },
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Context = () => {
  const { web3ProviderData } = useContext(Web3Context)
  if (Object.keys(web3ProviderData).length === 0) {
    throw new Error(
      'useWeb3Context() can only be used inside of <Web3ContextProvider />, ' +
        'please declare it at a higher level.'
    )
  }

  return web3ProviderData
}
