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

  token_LTV?: number
  token_penalty?: number

  can_delegate?: boolean
}

export const chainsToTokens = {
  WBTC: {
    [ChainIDs.MAINNET]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    [ChainIDs.ROPSTEN]: '0x442Be68395613bDCD19778e761f03261ec46C06D',
    [ChainIDs.GOERLI]: '0x442Be68395613bDCD19778e761f03261ec46C06D',
    [ChainIDs.POLYGON]: '0xa8A6d7c39270ddc658DC53ECbd0500a4C64C9Cc9',
  },
  WETH: {
    [ChainIDs.MAINNET]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [ChainIDs.ROPSTEN]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    [ChainIDs.GOERLI]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    [ChainIDs.POLYGON]: '0x8afBfe06dA3D035c82C5bc55C82EB3FF05506a20',
  },
  UNI: {
    [ChainIDs.MAINNET]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    [ChainIDs.ROPSTEN]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    [ChainIDs.GOERLI]: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    [ChainIDs.POLYGON]: '0xBAB395136FaEa31F33f32737218D79E2e92b32C1',
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
    },
    USDC: {
      name: 'USDC',
      address: rolodex?.addressUSDC!,
      ticker: 'USDC',
      value: 1,
      wallet_balance: undefined,
      wallet_amount: undefined,
    },
  }
}

export interface CollateralTokens {
  WETH: Token
  UNI: Token
  WBTC: Token
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
