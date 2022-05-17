export interface Token {
  name: string;
  address: string;
  value: number;
  ticker: string;
  balance: number;
}

export const Tokens: Token[] = [
  {
    name: "USDI",
    address: "0xb27E2484Eead6Cbdf7DFb18a22ae2F358e41F1BE",
    value: 1,
    ticker: "USDI",
    balance: 1000
  },
  {
    name: "USDC",
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    value: 1,
    ticker: "USDC",
    balance: 0
  },
  {
    name: "ETH",
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    value: 2000,
    ticker: "ETH",
    balance: 5
  },
  {
    name: "UNI token",
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    value: 5.21,
    ticker: "UNI",
    balance: 500
  },
  {
    name: "Wrapped Bitcoin",
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    value: 30000,
    ticker: "WBTC",
    balance: 1.2
  },
];
