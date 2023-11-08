import { Box, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import SVGBox from '../../icons/misc/SVGBox'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseSwitch } from '../switch'
import { BaseModal } from './BaseModal'
import { DepositCollateralContent } from './ModalContent/DepositCollateralContent'
import { WithdrawCollateralContent } from './ModalContent/WithdrawCollateralContent'
import { BPT_WARNING_MSG, MKR_WARNING_MSG } from '../../../constants'
import CheckboxButton from '../button/CheckBox'
import WarningAlert from './WarningAlert'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'

export const DepositWithdrawCollateralModal = () => {
  const {
    type,
    setType,
    collateralToken,
    setCollateralDepositAmount,
    setCollateralWithdrawAmount,
    setCollateralDepositAmountMax,
    setCollateralWithdrawAmountMax,
    stake,
    setStake,
    setWrap,
    setCollateralToken,
  } = useModalContext()
  const { tokens } = useVaultDataContext()

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
      {type == ModalType.DepositCollateral && collateralToken.can_wrap && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          mt: 1,
          width: '100%',
        }}>
          <BaseSwitch
            option1={Array.from(collateralToken.ticker)[0] == 'w' ? collateralToken.ticker : collateralToken.unwrapped!}
            option2={Array.from(collateralToken.ticker)[0] == 'w' ? collateralToken.unwrapped! : collateralToken.ticker}
            onOptionChange={() => {
              const other = tokens![collateralToken.unwrapped!]
              if (Array.from(collateralToken.ticker)[0] == 'w') {
                setWrap(true)
                if (other.price == 0) {
                  other.price = tokens!['WETH'].price
                }
              } else {
                setWrap(false)
              }
              setCollateralDepositAmount('')
              setCollateralDepositAmountMax(false)
              setCollateralToken(other)
            }}
            defaultIsOption1={true}
          />
        </Box>
      )}
      {type == ModalType.WithdrawCollateral && collateralToken.ticker == 'MKR' && (
        <WarningAlert msg={MKR_WARNING_MSG}/>
      )}
      {type == ModalType.WithdrawCollateral && collateralToken.bpt && (
        <WarningAlert msg={BPT_WARNING_MSG}/>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <SVGBox
          width={40}
          height={40}
          svg_name={collateralToken.ticker}
          alt={collateralToken.name}
        />
        <Box>
          <Typography variant="body3" color={formatColor(neutral.gray3)}>
            1 {collateralToken.ticker}
          </Typography>
          <Typography variant="h7" display="block" color="text.primary" mb={1}>
            $
            {collateralToken.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </Box>
      {type == ModalType.DepositCollateral && collateralToken.bpt && (
        <CheckboxButton onChange={setStake} state={stake} label={'Stake'} />
      )}
      {isDepositType ? (
        <DepositCollateralContent />
      ) : (
        <WithdrawCollateralContent />
      )}
    </BaseModal>
  )
}
