import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  CollateralTokens,
  getTokensListOnCurrentChain,
} from '../../../chain/tokens'
import { useRolodexContext } from '../rolodex-data-provider/RolodexDataProvider'
import { useWeb3Context } from '../web3-data-provider/Web3Provider'
import {
  getVaultTokenBalanceAndPrice,
  getVaultTokenMetadata,
} from './getVaultTokenBalanceAndPrice'
import { getVaultBorrowingPower } from './getBorrowingPower'
import { BN } from '../../../easy/bn'
import { BigNumber } from 'ethers'
import { Logp } from '../../../logger'
import { getBalanceOf } from '../../../contracts/ERC20/getBalanceOf'

export type VaultDataContextType = {
  hasVault: boolean
  setVaultID: Dispatch<SetStateAction<string | null>>
  redraw: boolean
  setRedraw: Dispatch<SetStateAction<boolean>>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  vaultID: string | null
  vaultAddress?: string
  setVaultAddress: Dispatch<SetStateAction<string | undefined>>
  borrowingPower: number
  accountLiability: number
  totalBaseLiability: number
  tokens: CollateralTokens | undefined
  setTokens: Dispatch<SetStateAction<CollateralTokens | undefined>>
}

export const VaultDataContext = React.createContext({} as VaultDataContextType)

export const VaultDataProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const { dataBlock, currentAccount, chainId, signerOrProvider, connected } =
    useWeb3Context()
  const rolodex = useRolodexContext()
  const [redraw, setRedraw] = useState(false)
  const [hasVault, setHasVault] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [vaultID, setVaultID] = useState<string | null>(null)
  const [vaultAddress, setVaultAddress] =
    useState<VaultDataContextType['vaultAddress']>(undefined)
  const [accountLiability, setAccountLiability] = useState(0)
  const [borrowingPower, setBorrowingPower] = useState(0)
  const [tokens, setTokens] =
    useState<VaultDataContextType['tokens']>(undefined)
  const [totalBaseLiability, setTotalBaseLiability] = useState(0)

  const update = async () => {
    const px: Array<Promise<any>> = []
    if (rolodex && rolodex.VC) {
      if (vaultID) {
        rolodex
          .VC!.vaultLiability(vaultID!)
          .then((val) => {
            const vl = val.div(BN('1e16')).toNumber() / 100
            setAccountLiability(vl)
          })
          .catch((e) => {
            console.log('could not get account liability', e)
          })

        getVaultBorrowingPower(vaultID, rolodex)
          .then((res) => {
            if (res != undefined) {
              setBorrowingPower(res)
            }
          })
          .catch((e) => {
            console.log('could not get borrowing power ', e)
          })
      }

      rolodex.VC?.totalBaseLiability().then((res) => {
        const bl = res.div(BN('1e16')).toNumber() / 100

        setTotalBaseLiability(bl)
      })
      for (const [key, token] of Object.entries(tokens!)) {
        let p1 = getVaultTokenMetadata(token.address, rolodex!)
          .then((res) => {
            token.token_penalty = res.penalty
            token.token_LTV = res.ltv
          })
          .catch(Logp('failed token metadata check'))
        if (!(token.token_LTV && token.token_penalty)) {
          px.push(p1)
        }
        let p2 = getVaultTokenBalanceAndPrice(
          vaultAddress,
          token.address,
          rolodex!,
          signerOrProvider!
        )
          .then((res) => {
            if (res.livePrice) {
              token.value = Math.round(100 * Number(res.livePrice)) / 100
              token.vault_amount = res.balance
              token.vault_unformatted_amount = res.unformattedBalance
              token.vault_balance = Number(
                (token.vault_amount * token.value).toFixed(2)
              )
            }
          })
          .catch((e) => {
            console.log('failed vault balance & price', e)
          })
        px.push(p2)
        if (currentAccount && connected) {
          let p3 = getBalanceOf(
            currentAccount,
            token.address,
            signerOrProvider!
          )
            .then((val) => {
              token.wallet_amount = val.num
            })
            .catch((e) => {
              console.log('failed to get token balances')
            })
          px.push(p3)
        }
      }
    }
    return Promise.all(px)
  }
  useEffect(() => {
    if (redraw) {
      setRedraw(false)
    }
  }, [redraw])

  useEffect(() => {
    if (rolodex && tokens) {
      console.log('update called @ block', dataBlock)
      update()
        .then(() => {
          setRedraw(true)
        })
        .catch((e) => {
          setRedraw(true)
          console.log('update error', e)
        })
    }
    setRefresh(false)
  }, [tokens, vaultAddress, rolodex, refresh, dataBlock, currentAccount])

  useEffect(() => {
    setTokens(getTokensListOnCurrentChain(chainId))
  }, [chainId])

  useEffect(() => {
    if (currentAccount && rolodex) {
      rolodex?.VC?.vaultIDs(currentAccount).then((vaultIDs) => {
        if (vaultIDs && vaultIDs?.length > 0) {
          const id = BigNumber.from(vaultIDs[0]._hex).toString()
          setVaultID(id)
        } else {
          setVaultID(null)
        }
      })
    }
  }, [currentAccount, rolodex])

  useEffect(() => {
    setHasVault(!!vaultID)
    if (hasVault && rolodex) {
      rolodex?.VC?.vaultAddress(vaultID!)
        .then((addr) => {
          setVaultAddress(addr)
        })
        .catch((e) => {
          console.log('failed to get vault address', e)
        })
    }
  }, [vaultID, rolodex])

  return (
    <VaultDataContext.Provider
      value={{
        hasVault,
        setVaultID,
        vaultID,
        vaultAddress,
        setVaultAddress,
        borrowingPower,
        redraw,
        setRedraw,
        refresh,
        setRefresh,
        tokens,
        setTokens,
        accountLiability,
        totalBaseLiability,
      }}
    >
      {children}
    </VaultDataContext.Provider>
  )
}

export const useVaultDataContext = () => {
  const context = useContext(VaultDataContext)

  if (context === undefined) {
    throw new Error(
      'useVaultDataContext must be used within a WalletModalProvider'
    )
  }

  return context
}
