import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type VaultDataContextType = {
  hasVault: boolean;
  setVaultID: Dispatch<SetStateAction<string | null>>;
  vaultID: string | null;
  vaultAddress?: string;
  setVaultAddress: Dispatch<SetStateAction<string | undefined>>;
};

export const VaultDataContext = React.createContext({} as VaultDataContextType);

export const VaultDataProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [hasVault, setHasVault] = useState(false);
  const [vaultID, setVaultID] = useState<string | null>(null);
  const [vaultAddress, setVaultAddress] = useState<VaultDataContextType['vaultAddress']>(undefined);

  useEffect(() => {
    setHasVault(!!vaultID);
  }, [vaultID]);

  useEffect(() => {

  })

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
