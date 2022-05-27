import { createContext, useState, useContext } from "react";
import { getTokensListOnCurrentChain, Token } from "../../../chain/tokens";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";

type AppGovernanceContextType = {
  isApp: boolean;
  setIsApp: (val: boolean) => void;
  delegateToken: Token;
  setDelegateToken: (val: Token) => void;
};

export const AppGovernanceContext = createContext(
  [] as unknown as AppGovernanceContextType
);

export const AppGovernanceProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { chainId } = useWeb3Context();

  const [isApp, setIsApp] = useState<boolean>(true);
  const [delegateToken, setDelegateToken] = useState<Token>(
    getTokensListOnCurrentChain(chainId || 1)["UNI"]
  );
  return (
    <AppGovernanceContext.Provider
      value={{ isApp, setIsApp, delegateToken, setDelegateToken }}
    >
      {children}
    </AppGovernanceContext.Provider>
  );
};

export const useAppGovernanceContext = () => {
  const context = useContext(AppGovernanceContext);

  if (context === undefined) {
    throw new Error(
      "useAppGovernanceContext must be used within a AppGovernanceProvider"
    );
  }

  return context;
};
