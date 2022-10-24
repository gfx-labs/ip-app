import { Rolodex } from '../chain/rolodex/rolodex'
import initializeToken from '../components/util/tokens/initializeToken'
import { CollateralTokens, Token } from '../types/token'
import { ChainIDs } from './chains'

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
  ENS: {
    [ChainIDs.MAINNET]: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
    [ChainIDs.ROPSTEN]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.GOERLI]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.POLYGON]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.LOCAL]: '0x0000000000000000000000000000000000000000',
  },
  AAVE: {
    [ChainIDs.MAINNET]: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    [ChainIDs.ROPSTEN]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.GOERLI]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.POLYGON]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.LOCAL]: '0x0000000000000000000000000000000000000000',
  },
  BAL: {
    [ChainIDs.MAINNET]: '0xba100000625a3754423978a60c9317c58a424e3D',
    [ChainIDs.ROPSTEN]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.GOERLI]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.POLYGON]: '0x0000000000000000000000000000000000000000',
    [ChainIDs.LOCAL]: '0x0000000000000000000000000000000000000000',
  },
}

export const getStablecoins = (
  rolodex: Rolodex
): {
  USDI: Token
  USDC: Token
} => {
  return {
    USDI: initializeToken({
      name: 'USDI',
      address: rolodex?.addressUSDI,
      ticker: 'USDI',
    }),
    USDC: initializeToken({
      name: 'USDC',
      address: rolodex?.addressUSDC!,
      ticker: 'USDC',
      decimals: 6,
    }),
  }
}

export const getTokensListOnCurrentChain = (
  chain_id: ChainIDs
): CollateralTokens => {
  return {
    WETH: initializeToken({
      name: 'Wrapped ETH',
      address: chainsToTokens.WETH[chain_id],
      ticker: 'WETH',
      decimals: 8,
    }),
    stETH: initializeToken({
      name: 'Lido Staked ETH',
      address: chainsToTokens.stETH[chain_id],
      ticker: 'stETH',
    }),
    WBTC: initializeToken({
      name: 'Wrapped BTC',
      address: chainsToTokens.WBTC[chain_id],
      ticker: 'WBTC',
    }),
    UNI: initializeToken({
      name: 'Uniswap',
      address: chainsToTokens.UNI[chain_id],
      ticker: 'UNI',
      can_delegate: true,
    }),
    MATIC: initializeToken({
      name: 'Matic',
      address: chainsToTokens.MATIC[chain_id],
      ticker: 'MATIC',
      capped_token: true,
      capped_address: '0x5aC39Ed42e14Cf330A864d7D1B82690B4D1B9E61',
    }),
    ENS: initializeToken({
      name: 'Ethereum Name Service',
      address: chainsToTokens.ENS[chain_id],
      ticker: 'ENS',
      can_delegate: true,
      capped_token: true,
      capped_address: '0xfb42f5afb722d2b01548f77c31ac05bf80e03381',
    }),
    AAVE: initializeToken({
      name: 'Aave',
      address: chainsToTokens.AAVE[chain_id],
      ticker: 'AAVE',
      can_delegate: true,
      capped_token: true,
      capped_address: '0xd3bd7a8777c042De830965de1C1BCC9784135DD2',
    }),
    BAL: initializeToken({
      name: 'Balancer',
      address: chainsToTokens.BAL[chain_id],
      ticker: 'BAL',
      capped_token: true,
      capped_address: '0x05498574BD0Fa99eeCB01e1241661E7eE58F8a85',
    }),
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
