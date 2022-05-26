import { Rolodex } from "../chain/rolodex/rolodex";
import { ChainIDs } from "./chains";
export interface Token {
  name: string;
  address: string;
  ticker: string;
  value: number;

  wallet_balance: number;
  wallet_amount: number;

  vault_balance?: number;
  vault_amount?: number;

  token_LTV?: number;
  token_penalty?: number;

  can_delegate?:boolean;
}

export const chainsToTokens = {
  WBTC: {
    [ChainIDs.MAINNET]: "0x65058d7081FCdC3cd8727dbb7F8F9D52CefDd291",
    [ChainIDs.ROPSTEN]: "0x442Be68395613bDCD19778e761f03261ec46C06D",
    [ChainIDs.GOERLI]: "0x442Be68395613bDCD19778e761f03261ec46C06D",
    [ChainIDs.MUMBAI]: "0x442Be68395613bDCD19778e761f03261ec46C06D",
  },
  WETH: {
    [ChainIDs.MAINNET]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainIDs.ROPSTEN]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainIDs.GOERLI]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [ChainIDs.MUMBAI]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
  UNI: {
    [ChainIDs.MAINNET]: "0xC8F88977E21630Cf93c02D02d9E8812ff0DFC37a",
    [ChainIDs.ROPSTEN]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    [ChainIDs.GOERLI]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    [ChainIDs.MUMBAI]: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  },
};

export const getStablecoins = (
  rolodex: Rolodex
): {
  USDI: Token;
  USDC: Token;
} => {
  return {
    USDI: {
      name: "USDI",
      address: rolodex?.addressUSDI,
      ticker: "USDI",
      value: 1,
      wallet_balance: 0,
      wallet_amount: 0,
    },
    USDC: {
      name: "USDC",
      address: rolodex?.addressUSDC!,
      ticker: "USDC",
      value: 1,
      wallet_balance: 0,
      wallet_amount: 0,
    },
  };
};


export interface CollateralTokens {
  WETH: Token;
  UNI: Token;
  WBTC: Token;
 [key: string]: Token};
export const getTokensListOnCurrentChain = (
  chain_id: ChainIDs
):CollateralTokens => {
  return {
    WETH: {
      name: "Wrapped ETH",
      address: chainsToTokens.WETH[chain_id],
      ticker: "WETH",
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty:0,
    },
    UNI: {
      name: "Uniswap",
      address: chainsToTokens.UNI[chain_id],
      ticker: "UNI",
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty:0,
      can_delegate: true,
    },

    WBTC: {
      name: "Wrapped BTC",
      address: chainsToTokens.WBTC[chain_id],
      ticker: "WBTC",
      value: 0,
      vault_balance: 0,
      vault_amount: 0,
      wallet_balance: 0,
      wallet_amount: 0,
      token_LTV: 0,
      token_penalty:0,
    },
  };
};

export const getTokenFromTicker = (
  chainId: ChainIDs,
  ticker: string
): Token => {
  const tokens = getTokensListOnCurrentChain(chainId);

  const tok = (tokens as any)[ticker];
  if (tok != undefined) {
    return tok;
  }

  throw new TypeError("Could not find Token");
};
