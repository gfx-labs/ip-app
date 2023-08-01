import React, { useContext, useState, useEffect } from 'react'
import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import { DEFAULT_CHAIN } from '../../../constants'
import getGasPrice from '../../../contracts/misc/getGasPrice'
import { ChainIDs, Chains } from '../../../chain/chains'
import { type WalletClient, useWalletClient, useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { ethers, providers } from 'ethers'
//import { getProvider, useEthersSigner } from "./ethers";

interface Contract {
  address: `0x${string}`;
  blockCreated?: number;
}

interface Chain {
  id: number;
  name: string;
  contracts?: {
      ensRegistry?: Contract;
  };
}

export type Web3Data = {
  disconnectWallet: () => void
  switchNetwork: (network: number) => void
  currentAccount: string
  currentSigner: JsonRpcSigner | undefined
  connected: boolean
  provider: JsonRpcProvider | Web3Provider
  chainId: number
  dataBlock: number
  gasPrice: string
}

export type Web3ContextData = {
  web3ProviderData: Web3Data
}

const reload = async () => {
  window.location.reload()
}

export const Web3Context = React.createContext({} as Web3ContextData)

export const Web3ContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { address: account, isConnected: active } = useAccount({ onDisconnect: reload })
  const { chain: rawChain } = useNetwork()
  const { disconnect: disconnectWallet } = useDisconnect()
  const { switchNetwork: doSwitchNetwork } = useSwitchNetwork({ onSuccess: reload })
  const { data: walletClient } = useWalletClient()
  
  const [chainId, setChainId] = useState(rawChain?.id ?? DEFAULT_CHAIN)
  const [provider, setProvider] = useState<JsonRpcProvider | Web3Provider>(new JsonRpcProvider(Chains[chainId].rpc))
  const [currentSigner, setCurrentSigner] = useState<JsonRpcSigner>()
  const [dataBlock, setDataBlock] = useState(0)
  const [gasPrice, setGasPrice] = useState('0')

  useEffect(() => {
    if (!rawChain) {
      return
    }
    if (chainId !== rawChain.id) {
      setChainId(rawChain.id)
    }
  }, [rawChain])

  useEffect(() => {
    if (!active) {
      setProvider(new JsonRpcProvider(Chains[chainId].rpc))
    }
  }, [chainId])

  const switchNetwork = async (network: number) => {
    if (chainId !== network) {
      if (doSwitchNetwork) {
        doSwitchNetwork(network)
      } else {
        setChainId(network)
      }
    }
  }

  // useEffect(() => {
  //   if (doSwitchNetwork) {
  //     if (chainId !== targetChainId) {
  //       console.log("switching to", targetChainId)
  //       doSwitchNetwork(targetChainId)
  //     }
  //   }
  // }, [doSwitchNetwork, chainId, targetChainId])
  useEffect(() => {
      if (walletClient && rawChain) {
      const { account, transport } = walletClient
      const network = {
          chainId: rawChain.id,
          name: rawChain.name,
          ensAddress: rawChain.contracts?.ensRegistry?.address,
      }
      // provider.removeAllListeners()
      // setDataBlock(0)
      const temp = new providers.Web3Provider(transport, network)
      setProvider(temp)
      setCurrentSigner(temp.getSigner(account.address))
    }
  }, [walletClient, rawChain])
  

  useEffect(() => {
    if (!provider) {
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
          gasPrice,
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
