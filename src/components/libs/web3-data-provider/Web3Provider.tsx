import React, { useContext, useState, useEffect } from 'react'
import { JsonRpcProvider, JsonRpcSigner, Web3Provider, WebSocketProvider } from '@ethersproject/providers'

import { DEFAULT_CHAIN } from '../../../constants'
import getGasPrice from '../../../contracts/misc/getGasPrice'
import { ChainIDs, Chains } from '../../../chain/chains'
import { useWalletClient, useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { providers } from 'ethers'
//import { getProvider, useEthersSigner } from "./ethers";

export type Web3Data = {
  disconnectWallet: () => void
  switchNetwork: (network: number) => void
  currentAccount: string
  currentSigner: JsonRpcSigner | undefined
  connected: boolean
  provider: JsonRpcProvider | Web3Provider | undefined
  ethProvider: JsonRpcProvider
  chainId: number
  dataBlock: number
  ethBlock: number
  gasPrice: string
}

export type Web3ContextData = {
  web3ProviderData: Web3Data
}

const reload = async () => {
  window.location.reload()
}

export const Web3Context = React.createContext({} as Web3ContextData)

const newProviderFromString = (x:string):JsonRpcProvider => {
  console.log("initializing new provider", x)
  return x.startsWith("ws") ? new WebSocketProvider(x) : new JsonRpcProvider(x)
}

export const Web3ContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { address: account, isConnected: active } = useAccount({ onConnect({ address, connector, isReconnected, }) {
    if (!isReconnected) {
      reload()
    }
  }, onDisconnect: reload })
  const { chain: rawChain } = useNetwork()
  const { disconnect: disconnectWallet } = useDisconnect()
  const { switchNetwork: doSwitchNetwork } = useSwitchNetwork({ onSuccess: reload })
  const { data: walletClient } = useWalletClient()

  const [chainId, setChainId] = useState(rawChain?.id ?? DEFAULT_CHAIN)
  const [provider, setProvider] = useState<JsonRpcProvider | Web3Provider>(newProviderFromString(Chains[chainId]?.rpc ?? Chains[DEFAULT_CHAIN].rpc))
  const [currentSigner, setCurrentSigner] = useState<JsonRpcSigner>()
  const [dataBlock, setDataBlock] = useState(0)
  const [ethBlock, setEthBlock] = useState(0)
  const [gasPrice, setGasPrice] = useState('0')
  const [ethProvider] = useState(newProviderFromString(Chains[1].rpc))

  useEffect(() => {
    const subscription = ethProvider.on('block', (blockNumber: number) => {
      setEthBlock(blockNumber)
    })
    return () => {
      setGasPrice('0')
      subscription.removeAllListeners()
    }
  }, [ethProvider])

  useEffect(() => {
    if (!rawChain) {
      return
    }
    if (chainId !== rawChain.id) {
      setChainId(rawChain.id)
    }
  }, [rawChain])

  const switchNetwork = async (network: number) => {
    if (chainId !== network) {
      if (doSwitchNetwork) {
        doSwitchNetwork(network)
      } else {  // no wallet connected
        setChainId(network)
        setProvider(newProviderFromString(Chains[network].rpc))
      }
    }
  }

  useEffect(() => {
    if (walletClient && rawChain) {
      const { account, transport } = walletClient
      const network = {
        chainId: rawChain.id,
        name: rawChain.name,
        ensAddress: rawChain.contracts?.ensRegistry?.address,
      }
      const temp = new providers.Web3Provider(transport, network)
      setProvider(temp)
      setCurrentSigner(temp.getSigner(account.address))
    }
  }, [walletClient, rawChain])

  useEffect(() => {
    if (!provider || !Chains[chainId]) {
      return
    }
    const subscription = provider.on('block', (blockNumber: number) => {
      if (chainId === ChainIDs.MAINNET) {
        getGasPrice(currentSigner ?? provider).then(setGasPrice)
      }
      setDataBlock(blockNumber)
    })
    return () => {
      setGasPrice('0')
      subscription.removeAllListeners()
    }
  }, [provider])

  // if chain changes based on injection not buttons
  useEffect(() => {
    if (window && window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          disconnectWallet,
          switchNetwork: switchNetwork,
          provider,
          currentSigner,
          connected: active,
          chainId: chainId,
          dataBlock,
          ethBlock,
          gasPrice,
          ethProvider,
          currentAccount: account?.toLowerCase() || DEFAULT_ADDRESS,
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
