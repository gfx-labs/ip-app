import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { ChainIDs } from "../../chain/chains";
import { useWeb3Context } from "./Web3Provider";
import getGasPrice from "../../contracts/Chains/getGasPrice";

const ChainDataContext = createContext<{
  block: number
  ethBlock: number,
  gasPrice: string
}>({ block: 0, ethBlock: 0, gasPrice: '' })

export const ChainDataContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { provider, ethProvider, chainId } = useWeb3Context()
  const [ethBlock, setEthBlock] = useState(0)
  const [opBlock, setOpBlock] = useState(0)
  const [gasPrice, setGasPrice] = useState('0')
  const { data: opData, refetch, isError: opDataError } = useQuery({
    refetchInterval: 5000,
    queryKey: ['op block'],
    queryFn: async () => {
      const block = await provider?.getBlockNumber()
      return block
    },
    enabled: chainId !== ChainIDs.MAINNET
  })
  const { data: ethData, isError: ethDataError } = useQuery({
    refetchInterval: 5000,
    queryKey: ['eth block'],
    queryFn: async () => {
      const ans = await ethProvider?.getBlockNumber()
      return ans
    },
  })
  const { data: gas, isError: gasError } = useQuery({
    refetchInterval: 5000,
    queryKey: ['gas'],
    queryFn: async () => {
      const block = await getGasPrice(provider!)
      return block
    },
    enabled: chainId === ChainIDs.MAINNET
  })

  useEffect(() => {
    refetch()
  }, [provider])

  useEffect(() => {
    if (opData) {
      setOpBlock(opData)
    }
  }, [opData])

  useEffect(() => {
    if (ethData) {
      setEthBlock(ethData)
    }
  }, [ethData])

  useEffect(() => {
    if (gas) {
      setGasPrice(gas)
    }
  })

  function block(id: ChainIDs) {
    switch(id) {
      case ChainIDs.MAINNET: return ethBlock
      case ChainIDs.OPTIMISM: return opBlock
    }
  }

  return <ChainDataContext.Provider value={{block: block(chainId), ethBlock: ethBlock, gasPrice: gasPrice}}>{children}</ChainDataContext.Provider>
}

export const useChainDataContext = () => useContext(ChainDataContext)
