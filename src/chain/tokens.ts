import { Rolodex } from '../chain/rolodex/rolodex'
import { ChainIDs } from './chains'
export interface Token {
  name: string
  address: string
  ticker: string
  value: number

  wallet_balance?: number
  wallet_amount?: number

  vault_balance?: number
  vault_amount?: number
  vault_unformatted_amount?: string

  token_LTV?: number
  token_penalty?: number

  can_delegate?: boolean

  capped_token?: boolean
  capped_address?: string
}

export const chainsToTokens = {
  WBTC: {
    [ChainIDs.MAINNET]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    [ChainIDs.ROPSTEN]: '0x442Be68395613bDCD19778e761f03261ec46C06D',
    [ChainIDs.GOERLI]: '0x442Be68395613bDCD19778e761f03261ec46C06D',
    [ChainIDs.POLYGON]: '0xa8A6d7c39270ddc658DC53ECbd0500a4C64C9Cc9',
    [ChainIDs.LOCAL]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
  WETH: {
    [ChainIDs.MAINNET]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [ChainIDs.ROPSTEN]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    [ChainIDs.GOERLI]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    [ChainIDs.POLYGON]: '0x8afBfe06dA3D035c82C5bc55C82EB3FF05506a20',
    [ChainIDs.LOCAL]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
  stETH: {
    [ChainIDs.MAINNET]: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    [ChainIDs.ROPSTEN]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.GOERLI]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.POLYGON]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.LOCAL]: '0x0000000000000000000000000000000000000000',
  },
  UNI: {
    [ChainIDs.MAINNET]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    [ChainIDs.ROPSTEN]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    [ChainIDs.GOERLI]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    [ChainIDs.POLYGON]: '0xBAB395136FaEa31F33f32737218D79E2e92b32C1',
    [ChainIDs.LOCAL]: '0x0000000000000000000000000000000000000000',
  },
  MATIC: {
    [ChainIDs.MAINNET]: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    [ChainIDs.ROPSTEN]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.GOERLI]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.POLYGON]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.LOCAL]: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  },
}

export const getStablecoins = (
  rolodex: Rolodex
): {
  USDI: Token
  USDC: Token
} => {
  return {
    USDI: {
      name: 'USDI',
      address: rolodex?.addressUSDI,
      ticker: 'USDI',
      value: 1,
      wallet_balance: undefined,
      wallet_amount: undefined,
      vault_unformatted_amount: '0',
    },
    USDC: {
      name: 'USDC',
      address: rolodex?.addressUSDC!,
      ticker: 'USDC',
      value: 1,
      wallet_balance: undefined,
      wallet_amount: undefined,
      vault_unformatted_amount: '0',
    },
  }
}

export interface CollateralTokens {
  WETH: Token
  UNI: Token
  WBTC: Token
  stETH: Token
  [key: string]: Token
}
export const getTokensListOnCurrentChain = (
  chain_id: ChainIDs
): CollateralTokens => {
  return {
    WETH: {
      name: 'Wrapped ETH',
      address: chainsToTokens.WETH[chain_id],
      ticker: 'WETH',
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty: 0,
      vault_unformatted_amount: '0',
      capped_token: false,
    },
    stETH: {
      name: 'Lido Staked ETH',
      address: chainsToTokens.stETH[chain_id],
      ticker: 'stETH',
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty: 0,
      vault_unformatted_amount: '0',
      capped_token: false,
    },
    WBTC: {
      name: 'Wrapped BTC',
      address: chainsToTokens.WBTC[chain_id],
      ticker: 'WBTC',
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty: 0,
      vault_unformatted_amount: '0',
      capped_token: false,
    },
    UNI: {
      name: 'Uniswap',
      address: chainsToTokens.UNI[chain_id],
      ticker: 'UNI',
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty: 0,
      can_delegate: true,
      vault_unformatted_amount: '0',
      capped_token: false,
    },
    MATIC: {
      name: 'Matic',
      address: chainsToTokens.MATIC[chain_id],
      ticker: 'MATIC',
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty: 0,
      can_delegate: false,
      vault_unformatted_amount: '0',
      capped_token: true,
      capped_address: '0x5aC39Ed42e14Cf330A864d7D1B82690B4D1B9E61',
    },
  }
}

export const getTokenFromTicker = (
  chainId: ChainIDs,
  ticker: string
): Token => {
  const tokens = getTokensListOnCurrentChain(chainId)

  const tok = (tokens as any)[ticker]
  if (tok != undefined) {
    return tok
  }

  throw new TypeError('Could not find Token')
}
