import { createContext, useState, useContext } from "react";
import {
  getStablecoins,
  SupportedTokens,
  Token,
} from "../../../chain/tokens";
import { useRolodexContext } from "../rolodex-data-provider/RolodexDataProvider";

export enum ModalType {
  Deposit = "DEPOSIT",
  Withdraw = "WITHDRAW",
  Borrow = "BORROW",
  Repay = "REPAY",
  Claim = "CLAIM",
  DepositConfirmation = "DEPOSIT_CONFIRMATION",
  WithdrawConfirmation = "WITHDRAW_CONFIRMATION",
}

interface DepositWithdrawToken {
  token: Token;
  amountFrom: string;
  amountTo: string;
}

export type ModalContextType = {
  type: ModalType | null;
  setType: (val: ModalType | null) => void;
  deposit: DepositWithdrawToken;
  withdraw: DepositWithdrawToken;
  updateDeposit: (prop: string, val: string) => void;
  updateWithdraw: (prop: string, val: string) => void;
};

const createDepositWithdrawToken = () => {
  const rolodex = useRolodexContext()

  return {
    token: getStablecoins(rolodex!)[SupportedTokens.USDC],
    amountFrom: "",
    amountTo: "",
  };
};
export const ModalContentContext = createContext({} as ModalContextType);

export const ModalContentProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [deposit, setDeposit] = useState<DepositWithdrawToken>(
    createDepositWithdrawToken()
  );
  const [withdraw, setWithdraw] = useState<DepositWithdrawToken>(
    createDepositWithdrawToken()
  );

  const updateDeposit = (prop: string, val: string) => {
    setDeposit({
      ...deposit,
      amountFrom: val,
      amountTo: val
    });
  };

  const updateWithdraw = (prop: string, val: string) => {
    setWithdraw({
      ...withdraw,
      amountFrom: val,
      amountTo: val
    });
  };

  return (
    <ModalContentContext.Provider
      value={{
        type,
        setType,
        deposit,
        withdraw,
        updateDeposit,
        updateWithdraw,
      }}
    >
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
