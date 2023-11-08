import { BigNumber } from 'ethers'
import { ChainIDs } from '../chain/chains'

export interface Token {
  name: string
  address: string
  ticker: string
  price: number
  decimals: number

  wallet_balance?: string
  wallet_amount?: BigNumber
  wallet_amount_str?: string

  vault_balance?: string
  vault_amount?: BigNumber
  vault_amount_str?: string

  token_LTV?: number
  token_penalty?: number

  can_delegate?: boolean

  capped_token?: boolean
  capped_address?: string

  bpt?: boolean
  can_wrap?: boolean
  icons?: string[]
  unwrapped?: string
  display: boolean
}

export interface InitializeTokenProps {
  name: string
  ticker: string
  address: string
  capped_token?: boolean
  capped_address?: string
  price?: number
  can_delegate?: boolean
  decimals?: number
  bpt?: boolean
  can_wrap?: boolean
  icons?: string[]
  unwrapped?: string
  display?: boolean
}

// ticker: token object
export interface CollateralTokens {
  [key: string]: Token
}

export interface TokenInfo {
  addr?: string
  capped_addr?: string
  can_delegate?: boolean
  bpt?: boolean
  can_wrap?: boolean
  icons?: string[]
  unwrapped?: string
  display?: boolean
}

export interface TokensOnChains {
  [key: string]: Record<ChainIDs, TokenInfo>
}
