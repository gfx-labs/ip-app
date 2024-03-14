import React, { useContext, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Token, UniPosition, getTokensOnChain } from '../../chain/tokens'
import { useRolodexContext } from './RolodexDataProvider'
import { useWeb3Context } from './Web3Provider'
import { getVaultTokenBalanceAndPrice, getVaultTokenMetadata } from '../../contracts/Vault/getVaultTokenBalanceAndPrice'
import { BNtoDec } from '../../easy/bn'
import { Logp } from '../../logger'
import {
  getBalanceOf,
  getBalanceOfPosition,
  getNumWalletPositions,
  getVaultPositions,
} from '../../contracts/Token/getBalanceOf'
import {
  getVotingVaultAddress,
  getBptVaultAddress,
  getMKRVotingVaultAddr,
  getNftVaultAddr,
} from '../../contracts/Vault/getSubVault'
import { ChainIDs, Chains } from '../../chain/chains'
import { utils } from 'ethers'
import { ZERO_ADDRESS } from '../../constants'
import { UniPoolAddresses } from '../../chain/tokensToChains'
import { Rolodex } from '../../chain/rolodex'
import { useChainDataContext } from './ChainDataProvider'

const getVaultBorrowingPower = async (vaultID: string, rolodex: Rolodex): Promise<string> => {
  try {
    const BP = await rolodex.VC?.vaultBorrowingPower(vaultID)
    if (BP?._isBigNumber) {
      return utils.formatUnits(BP, 18)
    }
    return '0'
  } catch (err) {
    console.error(err)
    throw new Error('Error getting Borrowing Power')
  }
}

export type VaultDataContextType = {
  hasVault: boolean
  vaultId: string | null
  setVaultId: Dispatch<SetStateAction<string | null>>
  redraw: boolean
  setRedraw: Dispatch<SetStateAction<boolean>>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  vaultAddress?: string
  setVaultAddress: Dispatch<SetStateAction<string | undefined>>
  borrowingPower: string
  accountLiability: string
  totalBaseLiability: number
  tokens: { [key: string]: Token }
  pools: { [key: string]: UniPosition }
  votingVaultAddress: string | undefined
  hasVotingVault: boolean
  setHasVotingVault: Dispatch<SetStateAction<boolean>>
  bptVaultAddress: string | undefined
  hasBptVault: boolean
  setHasBptVault: Dispatch<SetStateAction<boolean>>
  MKRVotingVaultAddr: string | undefined
  hasMKRVotingVault: boolean
  setHasMKRVotingVault: Dispatch<SetStateAction<boolean>>
  NftVaultAddr: string | undefined
  hasNftVault: boolean
  setHasNftVault: Dispatch<SetStateAction<boolean>>
}

export const VaultDataContext = React.createContext({} as VaultDataContextType)

export const VaultDataProvider = ({ children }: { children: React.ReactElement }) => {
  const { currentAccount, chainId, provider, connected } = useWeb3Context()
  const { block: dataBlock } = useChainDataContext()
  const rolodex = useRolodexContext()
  const [redraw, setRedraw] = useState(false)
  const [hasVault, setHasVault] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [vaultId, setVaultId] = useState<string | null>(null)
  const [vaultAddress, setVaultAddress] = useState<VaultDataContextType['vaultAddress']>(undefined)
  const [accountLiability, setAccountLiability] = useState('0')
  const [borrowingPower, setBorrowingPower] = useState('0')
  const [tokens, setTokens] = useState<VaultDataContextType['tokens']>(getTokensOnChain(chainId))
  const [pools, setPools] = useState<VaultDataContextType['pools']>(UniPoolAddresses)
  const [totalBaseLiability, setTotalBaseLiability] = useState(0)
  const [votingVaultAddress, setVotingVaultAddress] = useState<string | undefined>(undefined)
  const [bptVaultAddress, setBptVaultAddress] = useState<string | undefined>(undefined)
  const [MKRVotingVaultAddr, setMKRVotingVaultAddr] = useState<string | undefined>()
  const [NftVaultAddr, setNftVaultAddr] = useState<string | undefined>()
  const [hasVotingVault, setHasVotingVault] = useState(false)
  const [hasBptVault, setHasBptVault] = useState(false)
  const [hasMKRVotingVault, setHasMKRVotingVault] = useState(false)
  const [hasNftVault, setHasNftVault] = useState(false)

  const update = async () => {
    const px: Array<Promise<any>> = []
    if (rolodex && rolodex.VC) {
      if (vaultId) {
        rolodex
          .VC!.vaultLiability(vaultId!)
          .then((val) => {
            const vl = utils.formatUnits(val, 18)
            setAccountLiability(vl)
          })
          .catch((e) => {
            console.log('could not get account liability', e)
          })

        getVaultBorrowingPower(vaultId, rolodex)
          .then(setBorrowingPower)
          .catch((e) => {
            console.log('could not get borrowing power ', e)
          })
      }

      rolodex.VC?.totalBaseLiability().then((res) => {
        const bl = BNtoDec(res)
        setTotalBaseLiability(bl)
      })

      if (tokens) {
        for (const [_, token] of Object.entries(tokens)) {
          const tokenAddress = token.capped_address ?? token.address
          let p1 = getVaultTokenMetadata(tokenAddress, rolodex!)
            .then((res) => {
              token.token_penalty = res.penalty
              token.token_LTV = res.ltv
            })
            .catch(Logp('failed token metadata check'))
          if (!(token.token_LTV && token.token_penalty)) {
            px.push(p1)
          }
          if (token.display) {
            let p2 = getVaultTokenBalanceAndPrice(vaultAddress, token, token.decimals, rolodex!, provider!)
              .then((res) => {
                token.price = res.livePrice
                token.vault_amount_str = res.unformattedBalance
                token.vault_amount = res.balanceBN

                if (token.vault_amount.isZero()) {
                  token.vault_balance = '0'
                } else {
                  token.vault_balance = res.balance
                }
              })
              .catch((e) => {
                console.error('failed token balance check', e)
              })
            px.push(p2)
          }
          if (currentAccount && connected) {
            let p3 = getBalanceOf(currentAccount, token.address, token.decimals, provider!)
              .then((val) => {
                token.wallet_amount = val.bn
                token.wallet_amount_str = val.str
              })
              .catch((e) => {
                console.log('failed to get token balances')
              })
            px.push(p3)
          }
        }
      }
      if (pools) {
        // get penalty and ltv
        let pos1 = Object.values(pools)[0]
        let penalty
        let LTV
        let p1 = getVaultTokenMetadata(pos1.address, rolodex!)
          .then((res) => {
            pos1.penalty = res.penalty
            pos1.LTV = res.ltv
            penalty = res.penalty
            LTV = res.ltv
          })
          .catch(Logp('failed token metadata check'))
        if (!(pos1.LTV && pos1.penalty)) {
          px.push(p1)
        }
        for (let [_, pos] of Object.entries(pools)) {
          if (penalty && LTV) {
            pos.penalty = penalty
            pos.LTV = LTV
          }
          if (vaultAddress) {
            let p2 = getBalanceOfPosition(vaultAddress, pos.address, provider!)
              .then((val) => {
                pos.vault_balance = val
              })
              .catch((e) => {
                console.error('failed position balance check', e)
              })
            px.push(p2)
            let p3 = getVaultPositions(pos.address, currentAccount, provider!).then((val) => {
              pos.vault_positions = val
            })
          }
          if (currentAccount && connected) {
            let p3 = getNumWalletPositions(currentAccount, provider!)
              .then((val) => {
                pos.wallet_balance = val
              })
              .catch((e) => {
                console.log('failed to get position wallet balance', e)
              })
            px.push(p3)
          }
        }
      }
      return Promise.all(px)
    }
  }

  useEffect(() => {
    if (redraw) {
      setRedraw(false)
    }
  }, [redraw])

  // updating every time block # updates (every 5 secs)
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

  // setting token list
  useEffect(() => {
    if (Chains[chainId]) {
      setTokens(getTokensOnChain(chainId))
      if (chainId === ChainIDs.OPTIMISM) {
        setPools(UniPoolAddresses)
      }
    }
  }, [chainId])

  useEffect(() => {
    if (currentAccount && rolodex && provider) {
      rolodex?.VC?.vaultIDs(currentAccount).then((vaultIDs) => {
        if (vaultIDs && vaultIDs?.length > 0) {
          const id = vaultIDs.toString()
          const addr = Chains[chainId].votingVaultController_addr
          setVaultId(id)

          getVotingVaultAddress(addr!, id, provider).then((addr) => {
            setVotingVaultAddress(addr)
            setHasVotingVault(addr !== ZERO_ADDRESS)
          })

          getBptVaultAddress(addr!, id, provider).then((addr) => {
            setBptVaultAddress(addr)
            setHasBptVault(addr !== ZERO_ADDRESS)
          })

          if (chainId === ChainIDs.MAINNET) {
            getMKRVotingVaultAddr(id, provider).then((addr) => {
              setMKRVotingVaultAddr(addr)
              setHasMKRVotingVault(addr !== ZERO_ADDRESS)
            })
          }

          if (chainId === ChainIDs.OPTIMISM) {
            getNftVaultAddr(id, provider).then((addr) => {
              setNftVaultAddr(addr)
              setHasNftVault(addr !== ZERO_ADDRESS)
            })
          }
        } else {
          setVaultId(null)
        }
      })
    }
  }, [currentAccount, rolodex])

  useEffect(() => {
    setHasVault(!!vaultId)
    if (!!vaultId && rolodex) {
      rolodex?.VC?.vaultAddress(vaultId)
        .then(setVaultAddress)
        .catch((e) => {
          console.error('failed to get vault address', e)
        })
    }
  }, [vaultId, rolodex])

  return (
    <VaultDataContext.Provider
      value={{
        hasVault,
        vaultId,
        setVaultId,
        vaultAddress,
        setVaultAddress,
        borrowingPower,
        redraw,
        setRedraw,
        refresh,
        setRefresh,
        tokens,
        pools,
        accountLiability,
        totalBaseLiability,
        hasVotingVault,
        setHasVotingVault,
        hasBptVault,
        setHasBptVault,
        votingVaultAddress,
        bptVaultAddress,
        MKRVotingVaultAddr,
        NftVaultAddr,
        hasMKRVotingVault,
        setHasMKRVotingVault,
        hasNftVault,
        setHasNftVault,
      }}
    >
      {children}
    </VaultDataContext.Provider>
  )
}

export const useVaultDataContext = () => {
  const context = useContext(VaultDataContext)
  if (context === undefined) {
    throw new Error('useVaultDataContext must be used within a WalletModalProvider')
  }
  return context
}
