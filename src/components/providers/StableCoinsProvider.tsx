import { useContext, useEffect, useState, ReactElement, createContext } from 'react'
import { Token, getStablecoins } from '../../chain/tokens'
import { getBalanceOf } from '../../contracts/Token/getBalanceOf'
import { useRolodexContext } from './RolodexDataProvider'
import { useWeb3Context } from './Web3Provider'
import { useChainDataContext } from './ChainDataProvider'

export type StableCoinsContextType = {
  USDI: Token
  USDC: Token
}

export const StableCoinsContext = createContext({} as StableCoinsContextType)

export const StableCoinsProvider = ({ children }: { children: ReactElement }) => {
  const { currentAccount, chainId } = useWeb3Context()
  const { block: dataBlock } = useChainDataContext()
  const rolodex = useRolodexContext()

  const [USDC, setUSDC] = useState<Token>(() => getStablecoins(rolodex!).USDC!)
  const [USDI, setUSDI] = useState<Token>(() => getStablecoins(rolodex!).USDI!)

  useEffect(() => {
    if (rolodex && rolodex?.addressUSDC) {
      getBalanceOf(currentAccount, rolodex.addressUSDC, rolodex.provider).then((res) => {
        setUSDC({ ...USDC, wallet_balance: res.str, wallet_amount: res.bn })
      })
    }
  }, [currentAccount, dataBlock, chainId, rolodex])

  useEffect(() => {
    if (rolodex && rolodex?.addressUSDI) {
      getBalanceOf(currentAccount, rolodex.addressUSDI, rolodex.provider).then((res) =>
        setUSDI({ ...USDI, wallet_balance: res.str, wallet_amount: res.bn })
      )
    }
  }, [currentAccount, dataBlock, chainId, rolodex])

  return <StableCoinsContext.Provider value={{ USDC, USDI }}>{children}</StableCoinsContext.Provider>
}

export const useStableCoinsContext = () => {
  const context = useContext(StableCoinsContext)

  if (context === undefined) {
    throw new Error('useStableCoinsContext must be used within a WalletModalProvider')
  }

  return context
}
