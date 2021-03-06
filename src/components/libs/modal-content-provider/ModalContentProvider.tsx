import { ContractReceipt, ContractTransaction } from 'ethers'
import { createContext, useState, useContext } from 'react'
import {
  getStablecoins,
  Token,
  getTokensListOnCurrentChain,
} from '../../../chain/tokens'
import { useRolodexContext } from '../rolodex-data-provider/RolodexDataProvider'
import { useWeb3Context } from '../web3-data-provider/Web3Provider'

export enum ModalType {
  None = '',
  Borrow = 'BORROW',
  Repay = 'REPAY',
  Claim = 'CLAIM',
  WithdrawUSDC = 'WITHDRAW_USDC',
  DepositUSDC = 'DEPOSIT_USDC',
  DepositUSDCConfirmation = 'DEPOSIT_USDC_CONFIRMATION',
  WithdrawUSDCConfirmation = 'WITHDRAW_USDC_CONFIRMATION',
  DepositCollateral = 'DEPOSIT_COLLATERAL',
  WithdrawCollateral = 'WITHDRAW_COLLATERAL',
  DepositCollateralConfirmation = 'DEPOSIT_COLLATERAL_CONFIRMATION',
  WithdrawCollateralConfirmation = 'WITHDRAW_COLLATERAL_CONFIRMATION',
  Delegate = 'DELEGATE',
  DelegateIPT = 'DELEGATE_IPT',
  TransactionStatus = 'TRANSACTION_STATUS',
}

type TransactionState = 'PENDING' | 'SUCCESS' | 'FAILURE' | null

interface DepositWithdrawUSDC {
  token: Token
  amountToDeposit: string
  amountToWithdraw: string
}

export type ModalContextType = {
  // Control Modal
  type: ModalType | null
  setType: (val: ModalType | null) => void

  // Control Collateral
  collateralToken: Token
  setCollateralToken: (val: Token) => void
  collateralDepositAmount: string
  setCollateralDepositAmount: (val: string) => void
  collateralWithdrawAmount: string
  setCollateralWithdrawAmount: (val: string) => void
  collateralDepositAmountMax: boolean
  collateralWithdrawAmountMax: boolean
  setCollateralDepositAmountMax: (val: boolean) => void
  setCollateralWithdrawAmountMax: (val: boolean) => void
  // Control USDC
  USDC: DepositWithdrawUSDC
  updateUSDC: (prop: string, val: string) => void

  // Transaction State
  transactionState: TransactionState
  updateTransactionState: (val: ContractReceipt | ContractTransaction) => void
  transaction: ContractReceipt | ContractTransaction | null
}

const createDepositWithdrawUSDC = () => {
  const rolodex = useRolodexContext()
  return {
    token: getStablecoins(rolodex!).USDC,
    amountToDeposit: '0',
    amountToWithdraw: '0',
  }
}

export const ModalContentContext = createContext({} as ModalContextType)

export const ModalContentProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const { chainId } = useWeb3Context()

  const [type, setType] = useState<ModalType | null>(null)
  const [collateralToken, setCollateralToken] = useState<Token>(
    getTokensListOnCurrentChain(chainId)['WETH']
  )
  const [collateralDepositAmount, setCollateralDepositAmount] = useState('')
  const [collateralWithdrawAmount, setCollateralWithdrawAmount] = useState('')
  const [collateralDepositAmountMax, setCollateralDepositAmountMax] =
    useState(false)
  const [collateralWithdrawAmountMax, setCollateralWithdrawAmountMax] =
    useState(false)

  const [USDC, setUSDC] = useState<DepositWithdrawUSDC>(
    createDepositWithdrawUSDC()
  )

  const updateUSDC = (prop: string, val: string) => {
    setUSDC({
      ...USDC,
      [prop]: val,
    })
  }

  const [transactionState, setTransactionState] =
    useState<TransactionState>(null)

  const [transaction, setTransaction] =
    useState<ModalContextType['transaction']>(null)

  function isContractTransaction(
    transaction: ContractReceipt | ContractTransaction
  ): transaction is ContractTransaction {
    return Object.prototype.hasOwnProperty.call(transaction, 'wait')
  }

  const updateTransactionState = (
    transaction: ContractReceipt | ContractTransaction
  ) => {
    if (isContractTransaction(transaction)) {
      setTransactionState('PENDING')
      setTransaction(transaction)
      setType(ModalType.TransactionStatus)
    } else {
      if (transaction.status === 1) {
        setTransactionState('SUCCESS')
      } else {
        setTransactionState('FAILURE')
      }
    }
    setTransaction(transaction)
  }

  return (
    <ModalContentContext.Provider
      value={{
        type,
        setType,
        collateralToken,
        setCollateralToken,
        collateralDepositAmount,
        collateralDepositAmountMax,
        setCollateralDepositAmountMax,
        setCollateralDepositAmount,
        collateralWithdrawAmount,
        collateralWithdrawAmountMax,
        setCollateralWithdrawAmount,
        setCollateralWithdrawAmountMax,
        USDC,
        updateUSDC,

        transactionState,
        updateTransactionState,
        transaction,
      }}
    >
      {children}
    </ModalContentContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContentContext)

  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }

  return context
}
