import { Box, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import SVGBox from '../../icons/misc/SVGBox'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseSwitch } from '../switch'
import { BaseModal } from './BaseModal'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { Token, isToken } from '../../../chain/tokens'
import { DepositWithdrawPositionContent } from './DepositWithdrawPositionModal'
import { DepositWithdrawCollateralContent } from './ModalContent/DepositWithdrawCollateralContent'

export const DepositWithdrawCollateralModal = () => {
  const {
    type,
    setType,
    collateralToken: token,
    setCollateralDepositAmount,
    setCollateralWithdrawAmount,
    setCollateralDepositAmountMax,
    setCollateralWithdrawAmountMax,
  } = useModalContext()
  const isDepositType = type === ModalType.DepositCollateral || type === ModalType.DepositPosition
  const isCollateralToken = isToken(token)

  const onSwitch = (val: boolean) => {
    setCollateralDepositAmount('')
    setCollateralWithdrawAmount('')
    setCollateralDepositAmountMax(false)
    setCollateralWithdrawAmountMax(false)
    if (isCollateralToken) {
      setType(val ? ModalType.DepositCollateral : ModalType.WithdrawCollateral)
    } else {
      setType(val ? ModalType.DepositPosition : ModalType.WithdrawPosition)
    }
  }

  return (
    <BaseModal
      open={
        type === ModalType.DepositCollateral ||
        type === ModalType.WithdrawCollateral ||
        type === ModalType.DepositPosition ||
        type === ModalType.WithdrawPosition
      }
      onClose={() => {
        setType(null)
        setCollateralDepositAmount('')
        setCollateralWithdrawAmount('')
        setCollateralDepositAmountMax(false)
        setCollateralWithdrawAmountMax(false)
      }}
    >
      <BaseSwitch
        option1="Deposit"
        option2="Withdraw"
        onOptionChange={onSwitch}
        defaultIsOption1={isDepositType}
      />
      {isCollateralToken ? 
        <DepositWithdrawCollateralContent />
      : <DepositWithdrawPositionContent />}
    </BaseModal>
  )
}
