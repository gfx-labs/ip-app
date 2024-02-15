import { Rolodex } from './rolodex'
import { ChainIDs } from './chains'
import { tickerToName, tickerToDecimals, tokensToChains, UniPoolAddresses } from './tokensToChains'
import { BigNumber } from 'ethers'

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

export interface UniPosition {
  name: string
  address: string
  token0: string // ticker
  token1: string
  pool: string
  fee: number
  
  wallet_balance?: string // # of positions
  wallet_positions?: string[] // list of token ids

  vault_balance?: string
  vault_positions?: string[]

  LTV?: number
  penalty?: number
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

export const isToken = (token: Token | UniPosition): token is Token => {
  return (token as UniPosition).pool == undefined
}

const initializeToken = ({
  name,
  ticker,
  address,
  capped_address,
  capped_token = false,
  can_delegate = false,
  decimals = 18,
  price = 0,
  bpt = false,
  icons,
  can_wrap = false,
  unwrapped,
  display = true,
}: {
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
}): Token => ({
  name,
  address,
  ticker,
  price,
  decimals,
  bpt,
  vault_balance: '0',
  vault_amount_str: '0',
  vault_amount: BigNumber.from(0),
  wallet_balance: '0',
  wallet_amount: BigNumber.from(0),
  wallet_amount_str: '0',
  token_LTV: 0,
  token_penalty: 0,
  capped_token,
  capped_address,
  can_delegate,
  icons,
  can_wrap,
  unwrapped,
  display,
})

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

export const getTokensOnChain = (
  chain_id: ChainIDs
) => {
  let out: {[key: string]: Token} = {}
  for (const ticker in tokensToChains) {
    let token = tokensToChains[ticker][chain_id]
    if (token && token.addr) {
      out[ticker] = initToken(ticker, token)
    }
  }
  return out
}

export const getPools = () => {
  let out: {[key: string]: UniPosition} = {}
  for (let name in UniPoolAddresses) {
    const pool = UniPoolAddresses[name]
    out[name] = pool 
  }
}

export const getKey = (pos: UniPosition) => {
  return pos.token0 + '/' + pos.token1 + pos.fee.toString()
}