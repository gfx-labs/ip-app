import {
  createContext,
  useState,
  useContext,
} from "react";

export enum ModalType {
  Deposit = "DEPOSIT",
  Withdraw = "WITHDRAW",
  Borrow = "BORROW",
  Repay = "REPAY",
}

export type ModalContextType = {
  type: ModalType | null;
  setType: (val: ModalType | null) => void;
};

export const ModalContentContext = createContext({} as ModalContextType);

export const ModalContentProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [type, setType] = useState<ModalType | null>(null);

  return (
    <ModalContentContext.Provider value={{ type, setType }}>
      {children}
    </ModalContentContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContentContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};
