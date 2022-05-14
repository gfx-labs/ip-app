import { createContext, useState, useContext } from "react";
import { Tokens, Token } from "../../../chain/tokens";

const getToken = (name: string): Token => {
  const token = Tokens.find((token) => token.name === name);

  if (token === undefined) {
    throw new TypeError("Cannot find token");
  }

  return token;
};

type SwapTokenContextType = [
  Token,
  Token,
  () => void,
  (name: string) => void,
  (name: string) => void
];

export const SwapTokenContext = createContext(
  [] as unknown as SwapTokenContextType
);

export const SwapTokenProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [token1, setToken1] = useState<Token>(() => getToken("USDC"));
  const [token2, setToken2] = useState<Token>(() => getToken("ETH"));

  const swapTokenPositions = () => {
    const newToken2 = { ...token1 };

    setToken1({ ...token2 });
    setToken2({ ...newToken2 });
  };

  const switchToken1 = (name: string) => setToken1({ ...getToken(name) });
  const switchToken2 = (name: string) => setToken2({ ...getToken(name) });

  return (
    <SwapTokenContext.Provider
      value={[token1, token2, swapTokenPositions, switchToken1, switchToken2]}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};

export const useSwapTokenContext = () => {
  const context = useContext(SwapTokenContext);

  if (context === undefined) {
    throw new Error(
      "useSwapTokenContext must be used within a SwapTokenProvider"
    );
  }

  return context;
};
