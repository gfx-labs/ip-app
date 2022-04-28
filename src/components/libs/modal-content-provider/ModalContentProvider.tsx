import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

export enum ModalType {
  DepositWithdraw,
  BorrowRepay,
}

export type ModalContextType = {
  type?: ModalType
  setType: Dispatch<SetStateAction<ModalType | undefined>>
}

export const ModalContentContext = createContext({} as ModalContextType)

export const ModalContentProvider = ({children} : {children: React.ReactElement}) => {

  const [type, setType] = useState<ModalContextType['type']>()

  return (
    <ModalContentContext.Provider value={{type, setType}}>
      {children}
    </ModalContentContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContentContext);

  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};
