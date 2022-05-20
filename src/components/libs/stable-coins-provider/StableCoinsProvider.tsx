import { ethers } from "ethers";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { getStablecoins, SupportedTokens, Token } from "../../../chain/tokens";
import { useBalanceOf } from "../../../hooks/useBalanceOf";
import { useRolodexContext } from "../rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";

export type StableCoinsContextType = {
  USDI: Token;
  USDC: Token;
};

export const StableCoinsContext = React.createContext(
  {} as StableCoinsContextType
);

export const StableCoinsProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { currentAccount } = useWeb3Context();
  const rolodex = useRolodexContext();

  const [USDC, setUSDC] = useState<Token>(
    () => getStablecoins(rolodex!)[SupportedTokens.USDC]
  );
  const [USDI, setUSDI] = useState<Token>(
    () => getStablecoins(rolodex!)[SupportedTokens.USDI]
  );

  useEffect(() => {
    if (rolodex?.addressUSDC) {
      useBalanceOf(
        currentAccount,
        rolodex.addressUSDC,
      ).then((res) => {
        setUSDC({ ...USDC, balance: res, amount: res })});
    }
  }, [rolodex?.addressUSDC, currentAccount]);

  useEffect(() => {
    if (rolodex?.addressUSDI) {
       useBalanceOf(
        currentAccount,
        rolodex.addressUSDI,
      ).then((res) => setUSDI({ ...USDI, balance: res, amount: res }));
    }
  }, [rolodex?.addressUSDI, currentAccount]);

  return (
    <StableCoinsContext.Provider value={{ USDC, USDI }}>
      {children}
    </StableCoinsContext.Provider>
  );
};

export const useStableCoinsContext = () => {
  const context = useContext(StableCoinsContext);

  if (context === undefined) {
    throw new Error(
      "useStableCoinsContext must be used within a WalletModalProvider"
    );
  }

  return context;
};
