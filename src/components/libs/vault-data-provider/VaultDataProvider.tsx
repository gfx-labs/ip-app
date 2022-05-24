import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  CollateralTokens,
  getTokensListOnCurrentChain,
  Token,
} from "../../../chain/tokens";
import { useRolodexContext } from "../rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";
import { getVaultTokenBalanceAndPrice, getVaultTokenMetadata } from "./getVaultTokenBalanceAndPrice";
import { getVaultBorrowingPower } from "./getBorrowingPower";
import {useBalanceOf} from "../../../hooks/useTokenInfo";
import {getBalance} from "../../../hooks/useBalanceOf";

export type VaultDataContextType = {
  hasVault: boolean;
  setVaultID: Dispatch<SetStateAction<string | null>>;
  vaultID: string | null;
  vaultAddress?: string;
  setVaultAddress: Dispatch<SetStateAction<string | undefined>>;
  borrowingPower: string;
  tokens: CollateralTokens | undefined;
  setTokens: Dispatch<SetStateAction<CollateralTokens | undefined>>;
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
  const [vaultAddress, setVaultAddress] = useState<VaultDataContextType["vaultAddress"]>(undefined);
  const [borrowingPower, setBorrowingPower] = useState('0')
  const [tokens, setTokens] = useState<VaultDataContextType["tokens"]>(undefined);
  useEffect(() => {
    setHasVault(!!vaultID);
    if(!!vaultID && rolodex) {
      getVaultBorrowingPower(vaultID, rolodex).then(res => setBorrowingPower(res as any))
    } else {
      setBorrowingPower('0')
    }
  }, [vaultID]);

  useEffect(() => {
    if (vaultAddress && currentAccount) {
      const tokenList = getTokensListOnCurrentChain(chainId);
      const reqs:Array<Promise<any>> = []
      for (const [key, token] of Object.entries(tokenList)) {
        const prm = getVaultTokenBalanceAndPrice(
          vaultAddress,
          token.address,
          rolodex!
        ).then((res) => {
          token.vault_amount = Number(res.balance);
          token.value = Number(res.livePrice);
          token.vault_balance = Number(
            (token.vault_amount * token.value).toFixed(2)
          );
        });
        reqs.push(prm)
        const prm2 = getVaultTokenMetadata(
          vaultAddress,
          token.address,
          rolodex!
        ).then((res) => {
          token.token_penalty = res.penalty
          token.token_LTV = res.ltv
        });
        reqs.push(prm2)
        reqs.push(getBalance(token.address,  currentAccount).then((val)=>{
          token.wallet_balance = val
        }))
      }
      Promise.allSettled(reqs).then(()=>{
        setTokens(tokenList);
      }).catch((e)=>{
        console.log("could not load all data", e)
        setTokens(tokenList);
      })
    }
  }, [vaultAddress, currentAccount]);

  return (
    <VaultDataContext.Provider
      value={{ hasVault, setVaultID, vaultID, vaultAddress, setVaultAddress, borrowingPower, tokens, setTokens }}
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
