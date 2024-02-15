import { ContractReceipt, ContractTransaction } from 'ethers'
import { createContext, useState, useContext } from 'react'
import { Token, UniPosition, getTokensOnChain } from '../../chain/tokens'
import { useStableCoinsContext } from './StableCoinsProvider'
import { DEFAULT_CHAIN } from '../../constants'

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
  DepositPosition = 'DEPOSIT_POSITION',
  WithdrawPosition = 'WITHDRAW_POSITION',
  DepositPositionConfirmation = 'DEPOSIT_POSITION_CONFIRMATION',
  WithdrawPositionConfirmation = 'WITHDRAW_POSITION_CONFIRMATION',
  Delegate = 'DELEGATE',
  Undelegate = 'UNDELEGATE',
  DelegateIPT = 'DELEGATE_IPT',
  TransactionStatus = 'TRANSACTION_STATUS',
  MintSubVault = 'MINT_SUBVAULT',
  SetAllowance = 'SET_ALLOWANCE',
}

type TransactionState = 'PENDING' | 'SUCCESS' | 'FAILURE' | null

interface DepositWithdrawUSDC {
  token: Token
  amountToDeposit: string
  amountToWithdraw: string
  maxWithdraw: boolean
  maxDeposit: boolean
}

export type ModalContextType = {
  // Control Modal
  type: ModalType | null
  setType: (val: ModalType | null) => void

  // Control Collateral
  collateralToken: Token | UniPosition
  setCollateralToken: (val: Token | UniPosition) => void
  collateralDepositAmount: string
  setCollateralDepositAmount: (val: string) => void
  collateralWithdrawAmount: string
  setCollateralWithdrawAmount: (val: string) => void
  collateralDepositAmountMax: boolean
  collateralWithdrawAmountMax: boolean
  setCollateralDepositAmountMax: (val: boolean) => void
  setCollateralWithdrawAmountMax: (val: boolean) => void
  stake: boolean
  setStake: (val: boolean) => void
  wrap: boolean
  setWrap: (val: boolean) => void

  // Control USDC
  USDC: DepositWithdrawUSDC
  updateUSDC: (prop: string, val: any) => void

  // Transaction State
  transactionState: TransactionState
  updateTransactionState: (val: ContractReceipt | ContractTransaction) => void
  transaction: ContractReceipt | ContractTransaction | null
}

export const ModalContentContext = createContext({} as ModalContextType)

export const ModalContentProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [type, setType] = useState<ModalType | null>(null)
  const [collateralToken, setCollateralToken] = useState<Token | UniPosition>(
    getTokensOnChain(DEFAULT_CHAIN)['WETH']
  )
  const [collateralDepositAmount, setCollateralDepositAmount] = useState('')
  const [collateralWithdrawAmount, setCollateralWithdrawAmount] = useState('')
  const [collateralDepositAmountMax, setCollateralDepositAmountMax] =
    useState(false)
  const [collateralWithdrawAmountMax, setCollateralWithdrawAmountMax] =
    useState(false)
  
  const [stake, setStake] = useState(true)
  const [wrap, setWrap] = useState(false)

  const { USDC:usdcContext } = useStableCoinsContext()
  const createDepositWithdrawUSDC = () => {
    return {
      token: usdcContext,
      amountToDeposit: '0',
      amountToWithdraw: '0',
      maxWithdraw: false,
      maxDeposit: false,
    }
  }

  const [USDC, setUSDC] = useState<DepositWithdrawUSDC>(
    createDepositWithdrawUSDC
  )

  const updateUSDC = (prop: string, val: any) => {
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
        stake,
        setStake,
        wrap,
        setWrap,
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
