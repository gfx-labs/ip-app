import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { getStablecoins, Token } from "../../../chain/tokens";
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
  const { currentAccount, dataBlock, chainId } = useWeb3Context();
  const rolodex = useRolodexContext();

  const [USDC, setUSDC] = useState<Token>(() => getStablecoins(rolodex!).USDC!);
  const [USDI, setUSDI] = useState<Token>(() => getStablecoins(rolodex!).USDI!);

  useEffect(() => {
    if (rolodex && rolodex?.addressUSDC) {
      useBalanceOf(currentAccount, rolodex.addressUSDC, rolodex.provider).then(
        (res) => {
          setUSDC({ ...USDC, wallet_balance: res, wallet_amount: res });
        }
      );
    }
  }, [currentAccount, dataBlock, chainId, rolodex]);

  useEffect(() => {
    if (rolodex && rolodex?.addressUSDI) {
      useBalanceOf(
        currentAccount,
        rolodex.addressUSDI,
        rolodex.provider
      ).then((res) =>
        setUSDI({ ...USDI, wallet_balance: res, wallet_amount: res })
      );
    }
  }, [currentAccount, dataBlock, chainId, rolodex]);

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
