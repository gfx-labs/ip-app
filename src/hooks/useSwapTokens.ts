import { useState } from "react";
import { Token, Tokens } from "../chain/tokens";

export const useSwapTokens = (): [
  Token,
  Token,
  () => void,
  (name: string) => void,
  (name: string) => void
] => {
  const [token1, setToken1] = useState<Token>(() => getToken("USDC"));
  const [token2, setToken2] = useState<Token>(() => getToken("ETH"));

  const swapTokenPositions = () => {
    const newToken2 = { ...token1 };

    setToken1({ ...token2 });
    setToken2({ ...newToken2 });
    return
  };

  const switchToken1 = (name: string) => setToken1({ ...getToken(name) });
  const switchToken2 = (name: string) => setToken2({ ...getToken(name) });

  return [token1, token2, swapTokenPositions, switchToken1, switchToken2];
};

const getToken = (name: string): Token => {
  const token = Tokens.find((token) => token.name === name);

  if (token === undefined) {
    throw new TypeError("Cannot find token");
  }

  return token;
};
