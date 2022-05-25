import { ethers } from "ethers";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { getStablecoins,  Token } from "../../../chain/tokens";
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
  const { currentAccount, dataBlock} = useWeb3Context();
  const rolodex = useRolodexContext();

  const [USDC, setUSDC] = useState<Token>(
    () => getStablecoins(rolodex!).USDC!
  );
  const [USDI, setUSDI] = useState<Token>(
    () => getStablecoins(rolodex!).USDI!
  );

  useEffect(() => {
    if (rolodex?.addressUSDC) {
      useBalanceOf(
        currentAccount,
        rolodex.addressUSDC,
      ).then((res) => {
        setUSDC({ ...USDC, wallet_balance: res, wallet_amount: res })});
    }
  }, [rolodex?.addressUSDC, currentAccount, dataBlock]);

  useEffect(() => {
    if (rolodex?.addressUSDI) {
       useBalanceOf(
        currentAccount,
        rolodex.addressUSDI,
      ).then((res) => setUSDI({ ...USDI, wallet_balance: res, wallet_amount: res }));
    }
  }, [rolodex?.addressUSDI, currentAccount, dataBlock]);

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
