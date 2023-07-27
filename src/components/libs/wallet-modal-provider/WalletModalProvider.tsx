import React, { useContext } from "react";
import {useWeb3Modal} from "@web3modal/react";

export type WalletModalContextType = {
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => void;
};

export const WalletModalContext = React.createContext(
  {} as WalletModalContextType
);

export const WalletModalProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const {open, close, isOpen} = useWeb3Modal();

  return (
    <WalletModalContext.Provider
      value={{ isWalletModalOpen: isOpen, setIsWalletModalOpen: (isWalletModalOpen: boolean) => {
        if (isWalletModalOpen) {
          (async () => await open())()
        } else {
          close()
        }
      }}}
    >
      {children}
    </WalletModalContext.Provider>
  );
};

export const useWalletModalContext = () => {
  const context = useContext(WalletModalContext);

  if (context === undefined) {
    throw new Error(
      "useWalletModalContext must be used within a WalletModalProvider"
    );
  }

  return context;
};
