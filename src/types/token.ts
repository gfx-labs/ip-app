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
}

export interface CollateralTokens {
  [key: string]: Token
}

export type TokenInfo {
  addr?: string,
  capped_addr?: string,
  can_delegate?: boolean,
}

export interface TokensOnChains {
  [key: string]: Record<ChainIDs, TokenInfo>
}
