import { Rolodex } from '../chain/rolodex/rolodex'
import initializeToken from '../components/util/tokens/initializeToken'
import { CollateralTokens, Token, TokenInfo } from '../types/token'
import { ChainIDs } from './chains'
import { tickerToName, tickerToDecimals, tokensToChains } from './tokensToChains'

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

const initToken = (ticker: string, token: TokenInfo): Token => {
  let name = ticker
  if (Object.prototype.hasOwnProperty.call(tickerToName, ticker)) {
    name = tickerToName[ticker]
  }
  let t = initializeToken({
    name: name,
    ticker: ticker,
    address: token.addr!,
    capped_token: token.capped_addr !== undefined,
    capped_address: token.capped_addr,
    can_delegate: token.can_delegate ?? false,
    bpt: token.bpt ?? false,
    icons: token.icons ?? undefined,
    can_wrap: token.can_wrap ?? false,
    unwrapped: token.can_wrap && token.unwrapped ? token.unwrapped : undefined,
    display: token.display ?? true,
  })
  if (Object.prototype.hasOwnProperty.call(tickerToDecimals, ticker)) {
    t.decimals = tickerToDecimals[ticker]
  }
  return t
}

export const getTokensListOnCurrentChain = (
  chain_id: ChainIDs
): CollateralTokens => {
  let out: CollateralTokens = {}
  for (const ticker in tokensToChains) {
    let token = tokensToChains[ticker][chain_id]
    if (token && token.addr) {
      out[ticker] = initToken(ticker, token)
    }
    // if (token && token.addr) {
    //   let name = ticker
    //   if (Object.prototype.hasOwnProperty.call(tickerToName, ticker)) {
    //     name = tickerToName[ticker]
    //   }
    //   out[ticker] = initializeToken({
    //     name: name,
    //     ticker: ticker,
    //     address: token.addr!,
    //     capped_token: token.capped_addr !== undefined,
    //     capped_address: token.capped_addr,
    //     can_delegate: token.can_delegate ?? false,
    //     bpt: token.bpt ?? false,
    //     icons: token.icons ?? undefined,
    //     can_wrap: token.can_wrap ?? false,
    //     unwrapped: token.can_wrap ? initializeToken(token.unwrapped)
    //   })
    //   if (Object.prototype.hasOwnProperty.call(tickerToDecimals, ticker)) {
    //     out[ticker].decimals = tickerToDecimals[ticker]
    //   }
    // }
  }
  return out
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
