import { Rolodex } from "../chain/rolodex/rolodex";
import { ChainIDs } from "./chains";
export interface Token {
  name: string;
  address: string;
  ticker: string;
  value: number;
  balance: number;
  amount: number;
}

export enum SupportedTokens {
  USDC = "USDC",
  USDI = "USDI",
  WETH = "WETH",
  WBTC = "WBTC",
  UNI = "UNI",
}

export const chainsToTokens = {
  //mainnet
  [SupportedTokens.WBTC]: {
    // *remove. Using ropsten address for testing
    [ChainIDs.MAINNET]: "0x442Be68395613bDCD19778e761f03261ec46C06D",
    // [ChainIDs.ROPSTEN]: "0x442Be68395613bDCD19778e761f03261ec46C06D",
    [ChainIDs.ROPSTEN]: '0x65058d7081FCdC3cd8727dbb7F8F9D52CefDd291',
    [ChainIDs.GOERLI]: "0x442Be68395613bDCD19778e761f03261ec46C06D",
    [ChainIDs.MUMBAI]: "0x442Be68395613bDCD19778e761f03261ec46C06D",
  },
  [SupportedTokens.WETH]: {
    [ChainIDs.MAINNET]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainIDs.ROPSTEN]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainIDs.GOERLI]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainIDs.MUMBAI]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
  [SupportedTokens.UNI]: {
    [ChainIDs.MAINNET]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    // [ChainIDs.ROPSTEN]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    [ChainIDs.ROPSTEN]: '0xC8F88977E21630Cf93c02D02d9E8812ff0DFC37a',
    [ChainIDs.GOERLI]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    [ChainIDs.MUMBAI]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  },
};

export const getStablecoins = (rolodex: Rolodex): {[SupportedTokens.USDI]: Token, [SupportedTokens.USDC]: Token} => {
  return {
    [SupportedTokens.USDI]: {
      name: SupportedTokens.USDI,
      address: rolodex?.addressUSDI,
      ticker: SupportedTokens.USDI,
      value: 1,
      balance: 0,
      amount: 0,
    },
    [SupportedTokens.USDC]: {
      name: SupportedTokens.USDC,
      address: rolodex?.addressUSDC!,
      ticker: SupportedTokens.USDC,
      value: 1,
      balance: 0,
      amount: 0,
    },
  };
};

export const getTokensListOnCurrentChain = (
  chain_id: ChainIDs
): {
  [tokenName in SupportedTokens &
    Omit<SupportedTokens.USDC, SupportedTokens.USDI>]: Token;
} => {
  return {
    [SupportedTokens.WETH]: {
      name: "Wrapped ETH",
      address: chainsToTokens[SupportedTokens.WETH][chain_id],
      ticker: SupportedTokens.WETH,
      value: 0,
      balance: 0,
      amount: 0,
    },
    [SupportedTokens.UNI]: {
      name: "Uniswap",
      address: chainsToTokens[SupportedTokens.UNI][chain_id],
      ticker: SupportedTokens.UNI,
      value: 0,
      balance: 0,
      amount: 0,
    },
    [SupportedTokens.WBTC]: {
      name: "Wrapped BTC",
      address: chainsToTokens[SupportedTokens.WBTC][chain_id],
      ticker: SupportedTokens.WBTC,
      value: 0,
      balance: 0,
      amount: 0,
    },
  };
};

export const getTokenFromTicker = (chainId: ChainIDs, ticker: string): Token => {
  const tokens = getTokensListOnCurrentChain(chainId);

  const tok = (tokens as any)[ticker]
  if(tok != undefined) {
    return tok
  }

  throw new TypeError("Could not find Token");
};
