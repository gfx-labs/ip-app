import React, { useContext, useState, useEffect } from 'react'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { DEFAULT_CHAIN } from '../../../constants'
import getGasPrice from '../../../contracts/misc/getGasPrice'
import { ChainIDs, Chains } from '../../../chain/chains'
import {useAccount, useDisconnect, useNetwork, useSwitchNetwork} from "wagmi";
import {useEthersSigner} from "./ethers";

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
  const {chain: rawChain} = useNetwork()
  const {disconnect: disconnectWallet} = useDisconnect()
  const {switchNetwork: doSwitchNetwork} = useSwitchNetwork()
  const chainId = rawChain?.id
  const currentSigner = useEthersSigner()

  const [targetChainID, setTargetChainID] = useState(chainId ?? DEFAULT_CHAIN)
  const setChainId = chainId ?? targetChainID

  const [provider, setProvider] = useState(new JsonRpcProvider(Chains[setChainId].rpc))
  useEffect(() => {
    setProvider(new JsonRpcProvider(Chains[setChainId].rpc))
  }, [setChainId])

  const [dataBlock, setDataBlock] = useState(0)

  const [gasPrice, setGasPrice] = useState('0')

  useEffect(() => {
    if (chainId === undefined || doSwitchNetwork === undefined) {
      return
    }
    if (chainId !== targetChainID) {
      console.log("switching to", targetChainID)
      doSwitchNetwork(targetChainID)
    }
  }, [doSwitchNetwork, chainId, targetChainID])

  useEffect(() => {
    console.log('started auto refresh of blockNumber for', provider)
    provider.on('block', (n: number) => {
      const signerOrProvider = currentSigner ?? provider
      if (chainId === ChainIDs.MAINNET) {
        getGasPrice(signerOrProvider!).then(setGasPrice)
      }
      if (n > dataBlock) {
        setDataBlock(n)
      }
    })
    return () => {
      console.log('stopped auto refresh of blockNumber for', provider)
      provider.on('block', () => {})
    }
  }, [provider])

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          disconnectWallet,
          switchNetwork: setTargetChainID,
          provider,
          currentSigner,
          connected: active,
          chainId: chainId ?? targetChainID,
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
