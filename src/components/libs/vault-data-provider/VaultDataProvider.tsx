import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  getTokensListOnCurrentChain,
  SupportedTokens,
  Token,
} from "../../../chain/tokens";
import { useRolodexContext } from "../rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";
import { connectVaultContract, getVaultTokenData } from "./connectVaultContract";

export type VaultDataContextType = {
  hasVault: boolean;
  setVaultID: Dispatch<SetStateAction<string | null>>;
  vaultID: string | null;
  vaultAddress?: string;
  setVaultAddress: Dispatch<SetStateAction<string | undefined>>;
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

  const [tokens, setTokens] = useState({});

  useEffect(() => {
    setHasVault(!!vaultID);
  }, [vaultID]);

  useEffect(() => {
    if (vaultAddress) {
      console.log(rolodex, 'rolo')
      const tokenList = getTokensListOnCurrentChain(chainId);

      // for (const key in tokenList) {
      //   const token: Token = tokenList[key];
      //   console.log(token.ticker, 'token')
      //   getVaultTokenData(vaultAddress, token.address, provider?.getSigner(currentAccount)!, rolodex!).then(res => {
      //     console.log(res)

      //     token.amount = Number(res.balance)
      //     token.value = Number(res.livePrice)
      //     token.balance = Number((token.amount * token.value).toFixed(2))
      //   })
      // }

      setTokens(tokenList);
    }
  }, [vaultAddress]);

  return (
    <VaultDataContext.Provider
      value={{ hasVault, setVaultID, vaultID, vaultAddress, setVaultAddress }}
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
