import { Box, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseSwitch } from '../switch'
import { BaseModal } from './BaseModal'
import { DepositCollateralContent } from './ModalContent/DepositCollateralContent'
import { WithdrawCollateralContent } from './ModalContent/WithdrawCollateralContent'

export const DepositWithdrawCollateralModal = () => {
  const {
    type,
    setType,
    collateralToken,
    setCollateralDepositAmount,
    setCollateralWithdrawAmount,
    setCollateralDepositAmountMax,
    setCollateralWithdrawAmountMax,
  } = useModalContext()

  const isDepositType = type === ModalType.DepositCollateral

  const onSwitch = (val: boolean) => {
    setCollateralDepositAmount('')
    setCollateralWithdrawAmount('')
    setCollateralDepositAmountMax(false)
    setCollateralWithdrawAmountMax(false)
    setType(val ? ModalType.DepositCollateral : ModalType.WithdrawCollateral)
  }

  return (
    <BaseModal
      open={
        type === ModalType.DepositCollateral ||
        type === ModalType.WithdrawCollateral
      }
      setOpen={() => {
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <Box
          component="img"
          width={80}
          height={80}
          src={`images/${collateralToken.ticker}.svg`}
          alt={collateralToken.name}
        ></Box>
        <Box>
          <Typography variant="body3" color={formatColor(neutral.gray3)}>
            1 {collateralToken.ticker}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" mb={1}>
            $
            {collateralToken.value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </Box>

      {isDepositType ? (
        <DepositCollateralContent />
      ) : (
        <WithdrawCollateralContent />
      )}
    </BaseModal>
  )
}
