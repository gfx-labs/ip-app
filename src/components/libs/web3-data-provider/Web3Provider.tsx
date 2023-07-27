import React, { useContext, useState, useEffect } from 'react'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { BACKUP_PROVIDER, DEFAULT_CHAIN } from '../../../constants'
import getGasPrice from '../../../contracts/misc/getGasPrice'
import { ChainIDs, networkParams } from '../../../chain/chains'
import {useAccount, useDisconnect, useNetwork, useSwitchNetwork} from "wagmi";
import {useEthersProvider} from "./ethers";

export type ERC20TokenType = {
  address: string
  symbol: string
  decimals: number
  image?: string
  aToken?: boolean
}

export type Web3Data = {
  disconnectWallet: () => void
  switchNetwork: (network: number) => void
  currentAccount: string
  currentSigner: JsonRpcSigner | undefined
  connected: boolean
  provider: JsonRpcProvider
  chainId: number
  dataBlock: number
  gasPrice: string
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
}

export type Web3ContextData = {
  web3ProviderData: Web3Data
}

export const toHex = (num: any) => {
  const val = Number(num);
  return "0x" + val.toString(16);
}

export const Web3Context = React.createContext({} as Web3ContextData)

export const Web3ContextProvider = ({ children }: { children: React.ReactElement }) => {
  const {address: account, isConnected: active} = useAccount()
  const {chain} = useNetwork()
  const {disconnect: disconnectWallet} = useDisconnect()
  const {switchNetwork: doSwitchNetwork} = useSwitchNetwork()
  const library = useEthersProvider()

  const chainId = chain?.id

  const switchNetwork = (chainId: number) => {
    doSwitchNetwork?.(chainId)
  }

  const [currentSigner, setCurrentSigner] = useState<JsonRpcSigner>()
  const [provider, setProvider] = useState<JsonRpcProvider>(library || new JsonRpcProvider(BACKUP_PROVIDER))
  const [signerOrProvider, setSignerOrProvider] = useState<JsonRpcSigner | JsonRpcProvider>(provider)

  const [tried, setTried] = useState<boolean>(false)
  const [dataBlock, setDataBlock] = useState(0)

  const [gasPrice, setGasPrice] = useState('0')

  useEffect(() => {
    if (library) {
      setProvider(library)
    } else {
      setProvider(new JsonRpcProvider(BACKUP_PROVIDER))
    }
  }, [library])

  useEffect(() => {
    if (provider && account) {
      setCurrentSigner(provider?.getSigner(account?.toLowerCase()))
    }
  }, [provider, account])

  useEffect(() => {
    setSignerOrProvider(currentSigner ? currentSigner : provider)
  }, [provider, currentSigner])

  useEffect(() => {
    if (provider) {
      console.log('started auto refresh of blockNumber for', provider)
      provider.on('block', (n: number) => {
        const tempSignerOrProvider = signerOrProvider ? signerOrProvider : provider
        if (chainId === ChainIDs.MAINNET) {
          getGasPrice(tempSignerOrProvider!).then(setGasPrice)
        }
        if (n > dataBlock) {
          setDataBlock(n)
        }
      })
      return () => {
        console.log('stopped auto refresh of blockNumber for', provider)
        provider.on('block', () => {})
      }
    }
  }, [provider])

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

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          disconnectWallet,
          switchNetwork,
          provider,
          currentSigner,
          connected: active,
          chainId: chainId || DEFAULT_CHAIN,
          dataBlock,
          gasPrice,
          currentAccount: account?.toLowerCase() || DEFAULT_ADDRESS,
          signerOrProvider,
        },
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
export const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000"

export const useWeb3Context = () => {
  const { web3ProviderData } = useContext(Web3Context)
  if (!web3ProviderData || Object.keys(web3ProviderData).length === 0) {
    throw new Error('useWeb3Context() can only be used inside of <Web3ContextProvider />, ' + 'please declare it at a higher level.')
  }

  return web3ProviderData
}
