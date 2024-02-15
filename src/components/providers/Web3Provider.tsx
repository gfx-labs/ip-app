import React, { useContext, useState, useEffect } from 'react'
import { JsonRpcProvider, JsonRpcSigner, Web3Provider, WebSocketProvider } from '@ethersproject/providers'
import { DEFAULT_CHAIN, ZERO_ADDRESS } from '../../constants'
import { Chains } from '../../chain/chains'
import { useWalletClient, useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { providers } from 'ethers'

type Web3ContextType = {
  disconnectWallet: () => void
  switchNetwork: (network: number) => void
  currentAccount: string
  currentSigner: JsonRpcSigner | undefined
  connected: boolean
  provider: JsonRpcProvider | Web3Provider | undefined
  ethProvider: JsonRpcProvider
  chainId: number
}

const reload = async () => {
  window.location.reload()
}

const newProviderFromString = (x:string):JsonRpcProvider => {
  console.log("initializing new provider", x)
  return x.startsWith("ws") ? new WebSocketProvider(x) : new JsonRpcProvider(x)
}

const Web3Context = React.createContext({} as Web3ContextType)

export const Web3ContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { address: account, isConnected: active } = useAccount({ onConnect({ isReconnected, }) {
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
  const [ethProvider] = useState(newProviderFromString(Chains[1].rpc))

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

  //if chain changes based on injection not buttons
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
        disconnectWallet,
        switchNetwork: switchNetwork,
        provider,
        currentSigner,
        connected: active,
        chainId: chainId,
        ethProvider,
        currentAccount: account?.toLowerCase() || ZERO_ADDRESS,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Context = () => {
  const web3ProviderData = useContext(Web3Context)
  if (!web3ProviderData || Object.keys(web3ProviderData).length === 0) {
    throw new Error('useWeb3Context() can only be used inside of <Web3ContextProvider />, ' + 'please declare it at a higher level.')
  }
  return web3ProviderData
}
