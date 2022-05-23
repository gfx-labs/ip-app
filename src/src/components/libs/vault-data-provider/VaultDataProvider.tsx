import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  getTokensListOnCurrentChain,
  Token,
} from "../../../chain/tokens";
import { useRolodexContext } from "../rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";
import { getVaultTokenBalanceAndPrice } from "./getVaultTokenBalanceAndPrice";
import { getVaultBorrowingPower } from "./getBorrowingPower";

export type VaultDataContextType = {
  hasVault: boolean;
  setVaultID: Dispatch<SetStateAction<string | null>>;
  vaultID: string | null;
  vaultAddress?: string;
  setVaultAddress: Dispatch<SetStateAction<string | undefined>>;
  borrowingPower: string;
  // tokens: Token[]
};

export const VaultDataContext = React.createContext({} as VaultDataContextType);

export const VaultDataProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { provider, currentAccount, chainId } = useWeb3Context();
  const rolodex = useRolodexContext();

  const [hasVault, setHasVault] = useState(false);
  const [vaultID, setVaultID] = useState<string | null>(null);
  const [vaultAddress, setVaultAddress] =
    useState<VaultDataContextType["vaultAddress"]>(undefined);
    const [borrowingPower, setBorrowingPower] = useState('0')

  const [tokens, setTokens] = useState({});

  useEffect(() => {
    setHasVault(!!vaultID);

    if(!!vaultID && rolodex) {
      getVaultBorrowingPower(vaultID, rolodex).then(res => setBorrowingPower(res as any))
    } else {
      setBorrowingPower('0')
    }
  }, [vaultID]);

  useEffect(() => {
    if (vaultAddress) {
      const tokenList = getTokensListOnCurrentChain(chainId);

      for (const key in tokenList) {
        const token: Token = (tokenList as any)[key];
        console.log(token.ticker, "token");
        getVaultTokenBalanceAndPrice(
          vaultAddress,
          token.address,
          rolodex!
        ).then((res) => {
          console.log(res);

          token.vault_amount = Number(res.balance);
          token.value = Number(res.livePrice);
          token.vault_balance = Number(
            (token.vault_amount * token.value).toFixed(2)
          );
        });
      }

      setTokens(tokenList);
    }
  }, [vaultAddress]);

  return (
    <VaultDataContext.Provider
      value={{ hasVault, setVaultID, vaultID, vaultAddress, setVaultAddress, borrowingPower }}
    >
      {children}
    </VaultDataContext.Provider>
  );
};

export const useVaultDataContext = () => {
  const context = useContext(VaultDataContext);

  if (context === undefined) {
    throw new Error(
      "useVaultDataContext must be used within a WalletModalProvider"
    );
  }

  return context;
};
