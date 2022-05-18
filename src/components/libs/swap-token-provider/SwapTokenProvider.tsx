import { createContext, useState, useContext } from "react";
import { Token,getTokenFromTicker } from "../../../chain/tokens";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";

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
  const {chainId} = useWeb3Context()

  const [token1, setToken1] = useState<Token>(() => getTokenFromTicker(chainId, "USDC"));
  const [token2, setToken2] = useState<Token>(() => getTokenFromTicker(chainId, "USDI"));

  const swapTokenPositions = () => {
    const newToken2 = { ...token1 };

    setToken1({ ...token2 });
    setToken2({ ...newToken2 });
  };

  const switchToken1 = (name: string) => setToken1({ ...getTokenFromTicker(chainId, name) });
  const switchToken2 = (name: string) => setToken2({ ...getTokenFromTicker(chainId, name) });

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
