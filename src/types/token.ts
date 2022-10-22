import { BigNumber } from 'ethers'

export interface Token {
  name: string
  address: string
  ticker: string
  value: number

  wallet_balance?: number
  wallet_amount?: number
  wallet_amount_bn?: BigNumber

  vault_balance?: number
  vault_amount?: number
  vault_unformatted_amount?: string
  vault_amount_bn?: BigNumber
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
  value?: number
  can_delegate?: boolean
}

export interface CollateralTokens {
  [key: string]: Token
}
