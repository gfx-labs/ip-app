export interface Token {
  name: string;
  address: string;
  ticker: string;
  value: number;
  balance: number;
  amount: number;
}

export const chainsToTokens = {
  //mainnet
  1: {
    usdiAddress: "0x4129f68ca5b72e1D6E73ACe10715B6905589f837",
    usdcAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", // *remove. Using ropsten address for testing
    wbtcAddress: "0x442Be68395613bDCD19778e761f03261ec46C06D",
    uniAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    wethAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
  //ropsten
  3: {
    usdiAddress: "0x4129f68ca5b72e1D6E73ACe10715B6905589f837",
    usdcAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", // *remove. Using ropsten address for testing
    wbtcAddress: "0x442Be68395613bDCD19778e761f03261ec46C06D",
    uniAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    wethAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
};

export const getTokensListOnCurrentChain = (chain_id: number): Token[] => {
  // get correct chain

  return [
    {
      name: "USDI",
      address: chainsToTokens[chain_id].usdiAddress,
      ticker: "USDI",
      value: 0,
      balance: 0,
      amount: 0,
    },
    {
      name: "USDC",
      address: chainsToTokens[chain_id].usdcAddress,
      ticker: "USDC",
      value: 0,
      balance: 0,
      amount: 0,
    },
    {
      name: "Wrapped ETH",
      address: chainsToTokens[chain_id].wethAddress,
      ticker: "ETH",
      value: 0,
      balance: 0,
      amount: 0,
    },
    {
      name: "Uniswap",
      address: chainsToTokens[chain_id].uniAddress,
      ticker: "UNI",
      value: 0,
      balance: 0,
      amount: 0,
    },
    {
      name: "Wrapped BTC",
      address: chainsToTokens[chain_id].wbtcAddress,
      ticker: "WBTC",
      value: 0,
      balance: 0,
      amount: 0,
    },
  ];
};

export const getTokenFromTicker = (chainId: number, ticker: string): Token => {
  const tokens = getTokensListOnCurrentChain(chainId);

  const token = tokens.find((token) => token.ticker === ticker);

  if (token === undefined) {
    throw new TypeError("Could not find Token");
  }

  return token;
};
