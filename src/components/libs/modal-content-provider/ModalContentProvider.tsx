import { createContext, useState, useContext, useEffect } from "react";
import {
  getStablecoins,
  Token,
} from "../../../chain/tokens";
import { useRolodexContext } from "../rolodex-data-provider/RolodexDataProvider";

export enum ModalType {
  None = "",
  Borrow = "BORROW",
  Repay = "REPAY",
  Claim = "CLAIM",
  WithdrawUSDC = "WITHDRAW_USDC",
  DepositUSDC = "DEPOSIT_USDC",
  DepositUSDCConfirmation = "DEPOSIT_USDC_CONFIRMATION",
  WithdrawUSDCConfirmation = "WITHDRAW_USDC_CONFIRMATION",
  DepositCollateral = 'DEPOSIT_COLLATERAL',
  WithdrawCollateral = 'WITHDRAW_COLLATERAL',
  DepositCollateralConfirmation = 'DEPOSIT_COLLATERAL_CONFIRMATION',
  WithdrawCollateralConfirmation = 'WITHDRAW_COLLATERAL_CONFIRMATION',
}

interface DepositWithdrawToken {
  token: Token;
  amountFrom: string;
  amountTo: string;
}

export type ModalContextType = {
  type: ModalType | null;
  setType: (val: ModalType | null) => void;
  token: Token | undefined
  setToken: (val: Token | undefined) => void;
  deposit: DepositWithdrawToken;
  withdraw: DepositWithdrawToken;
  updateDeposit: (prop: string, val: string) => void;
  updateWithdraw: (prop: string, val: string) => void;
};

const createDepositWithdrawToken = () => {
  const rolodex = useRolodexContext()
  return {
    token: getStablecoins(rolodex!).USDC,
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
  const [token, setToken] = useState<Token | undefined>(undefined);
  const [deposit, setDeposit] = useState<DepositWithdrawToken>(
    createDepositWithdrawToken()
  );
  const [withdraw, setWithdraw] = useState<DepositWithdrawToken>(
    createDepositWithdrawToken()
  );

  useEffect(() => {
    if(token){
      setDeposit({
        ...deposit,
        token: token,
      })
      setWithdraw({
        ...deposit,
        token: token,
      })
    }
  }, [token]);

  const updateDeposit = (prop: string, val: string) => {
    setDeposit({
      ...deposit,
      [prop]: val
    });
  };
  const updateWithdraw = (prop: string, val: string) => {
    setWithdraw({
      ...withdraw,
      [prop]: val
    });
  };

  return (
    <ModalContentContext.Provider
      value={{
        type,
        token,
        setType,
        setToken,
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
