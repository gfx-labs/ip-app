import { Box, Typography, Button } from '@mui/material'
import { blue, formatColor, neutral } from '../../../../theme'
import { useState, useEffect } from 'react'
import { Token } from '../../../../chain/tokens'
import { BPT_WARNING_MSG, DISPLAY_DECIMALS, MKR_WARNING_MSG } from '../../../../constants'
import { round } from '../../../../easy/bn'
import { useLight } from '../../../../hooks/useLight'
import { SwapIcon } from '../../../icons/misc/SwapIcon'
import { useModalContext, ModalType } from '../../../providers/ModalContentProvider'
import { useVaultDataContext } from '../../../providers/VaultDataProvider'
import { DisableableModalButton } from '../../button/DisableableModalButton'
import { DecimalInput } from '../../textFields'
import { ModalInputContainer } from './ModalInputContainer'
import SVGBox from '../../../icons/misc/SVGBox'
import CheckboxButton from '../../button/CheckBox'
import { BaseSwitch } from '../../switch'
import WarningAlert from '../WarningAlert'
import { utils } from 'ethers'

function roundDown(val: number, dec: number) {
  dec = dec || 0
  const mul = Math.pow(10, dec)
  return Math.floor(val * mul) / mul
}

function countDecimals(val: string): number {
  if (Math.floor(Number(val)) === Number(val)) return 0
  return val.toString().split('.')[1].length || 0
}

export const DepositWithdrawCollateralContent = (): JSX.Element => {
  const {
    type,
    setType,
    collateralToken: token,
    setCollateralDepositAmount,
    setCollateralWithdrawAmount,
    setCollateralDepositAmountMax,
    setCollateralWithdrawAmountMax,
    stake,
    setStake,
    setWrap,
    setCollateralToken,
  } = useModalContext()
  const { borrowingPower, accountLiability, tokens } = useVaultDataContext()
  const isLight = useLight()
  const [disabled, setDisabled] = useState(true)
  const [focus, setFocus] = useState(false)
  const [isMoneyValue, setIsMoneyValue] = useState(false)
  const toggle = () => setFocus(!focus)
  const [newBorrowingPower, setNewBorrowingPower] = useState(0)
  const [inputAmount, setInputAmount] = useState('')
  const isDepositType = type === ModalType.DepositCollateral
  const collateralToken = token as Token
  const ltv = tokens![collateralToken.ticker].token_LTV || 0

  const greaterThanMax = (input: string) => {
    const bn = utils.parseUnits(input, collateralToken.decimals)
    if (!isMoneyValue) {
      return isDepositType ? bn.gt(collateralToken.wallet_amount!) : bn.gt(collateralToken.vault_amount!)
    }
    const amt = Number(input) / collateralToken.price
    const amtBn = utils.parseUnits(amt.toString(), collateralToken.decimals)
    return isDepositType ? amtBn.gt(collateralToken.wallet_amount!) : bn.gt(collateralToken.vault_amount!)
  }

  const trySetInputAmount = (amount: string) => {
    setInputAmount(amount)
    isDepositType ? setCollateralDepositAmountMax(false) : setCollateralWithdrawAmountMax(false)
  }

  const setDepositMax = () => {
    const inputAmount = isMoneyValue
      ? Number(collateralToken.wallet_amount_str)! * collateralToken.price
      : Number(collateralToken.wallet_amount_str)!
    setInputAmount(inputAmount.toString())
    setCollateralDepositAmountMax(true)
  }

  const setWithdrawMax = () => {
    if (collateralToken && collateralToken.vault_amount) {
      //allowed to withdraw
      let amt = 0
      if (Number(accountLiability) == 0) {
        setCollateralWithdrawAmountMax(true)
        amt = isMoneyValue ? Number(collateralToken.vault_balance) : Number(collateralToken.vault_amount_str)
      } else {
        const a = Number(borrowingPower) - Number(accountLiability)
        const dec = Math.max(countDecimals(collateralToken.vault_amount_str!), 2)
        if (a > 0) {
          const max = (a * 100) / ltv
          amt = (max * 100) / (collateralToken.price * 100)
          if (isMoneyValue) {
            if (Number(collateralToken.vault_balance) < max) {
              setCollateralWithdrawAmountMax(true)
              amt = Number(collateralToken.vault_balance)
            } else {
              amt = roundDown(max, dec)
              setCollateralWithdrawAmountMax(false)
            }
          } else {
            if (Number(collateralToken.vault_amount_str) < amt) {
              setCollateralWithdrawAmountMax(true)
              amt = Number(collateralToken.vault_amount_str)
            } else {
              amt = roundDown(amt, dec)
              setCollateralWithdrawAmountMax(false)
            }
          }
        } else {
          setInputAmount('0')
        }
      }
      setInputAmount(amt.toString())
      setDisabled(false)
    } else {
      setInputAmount('0')
    }
  }

  useEffect(() => {
    if (isDepositType) {
      if (isMoneyValue) {
        setCollateralDepositAmount((Number(inputAmount) / collateralToken.price).toString())
        setNewBorrowingPower(Number(borrowingPower) + Number(inputAmount) * (ltv / 100))
      } else {
        setCollateralDepositAmount(inputAmount)
        setNewBorrowingPower(Number(borrowingPower) + Number(inputAmount) * collateralToken.price * (ltv / 100))
      }
    } else {
      let newBorrowingPower: number
      if (isMoneyValue) {
        newBorrowingPower = Number(borrowingPower) - Number(inputAmount) * (ltv / 100)
        let amt = roundDown((Number(inputAmount) * 100) / (collateralToken.price * 100), 2)
        setCollateralWithdrawAmount(amt.toString())
      } else {
        newBorrowingPower = Number(borrowingPower) - Number(inputAmount) * collateralToken.price * (ltv / 100)
        setCollateralWithdrawAmount(inputAmount)
      }
      if (newBorrowingPower <= 0) {
        setNewBorrowingPower(0)
      } else {
        setNewBorrowingPower(newBorrowingPower)
      }
    }
    setDisabled(Number(inputAmount) <= 0 || newBorrowingPower < Number(accountLiability) || greaterThanMax(inputAmount))
  }, [inputAmount])

  const swapHandler = () => {
    if (!isMoneyValue) {
      setInputAmount((Number(inputAmount) * collateralToken.price).toString())
    } else {
      setInputAmount((Number(inputAmount) / collateralToken.price).toString())
    }
    setIsMoneyValue(!isMoneyValue)
  }

  const balanceInfo: string = isDepositType
    ? `Wallet Balance: ${round(collateralToken.wallet_amount_str || 0, DISPLAY_DECIMALS)} ${collateralToken?.ticker}`
    : `Vault balance: ${round(collateralToken.vault_amount_str || 0, DISPLAY_DECIMALS)} ${collateralToken.ticker}`

  return (
    <Box>
      {isDepositType && collateralToken.can_wrap && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            mt: 1,
            width: '100%',
          }}
        >
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
      {!isDepositType && collateralToken.ticker == 'MKR' && <WarningAlert msg={MKR_WARNING_MSG} />}
      {!isDepositType && collateralToken.bpt && <WarningAlert msg={BPT_WARNING_MSG} />}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <SVGBox width={40} height={40} svg_name={collateralToken.ticker} alt={collateralToken.name} />
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
      {isDepositType && collateralToken.bpt && <CheckboxButton onChange={setStake} state={stake} label={'Stake'} />}
      <Box textAlign="right" mb={1}>
        <Typography variant="label_semi" color={formatColor(neutral.gray3)}>
          {balanceInfo}
        </Typography>
      </Box>
      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={trySetInputAmount}
          placeholder={`0 ${isMoneyValue ? 'USD' : collateralToken?.ticker}`}
          value={inputAmount}
          isMoneyValue={isMoneyValue}
        />
        <Box sx={{ display: 'flex', paddingBottom: 0.5, alignItems: 'center' }}>
          <Typography
            variant="body3"
            sx={{
              color: formatColor(neutral.gray3),
              marginLeft: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {isMoneyValue
              ? `${
                  inputAmount === '0' ? '0' : (Number(inputAmount) / collateralToken?.price).toFixed(4)
                } ${collateralToken?.ticker}`
              : `$${(Number(inputAmount) * collateralToken?.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </Typography>
          <Button
            onClick={isDepositType ? setDepositMax : setWithdrawMax}
            sx={{
              minWidth: 'auto',
              height: 30,
              paddingY: 2,
              paddingX: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                '.MuiTypography-root.MuiTypography-body1': {
                  color: formatColor(neutral.gray1),
                },
              },
            }}
          >
            <Typography
              variant="body3"
              color={formatColor(neutral.gray3)}
              sx={{
                '&:hover': {
                  color: isLight ? formatColor(neutral.gray1) : formatColor(neutral.white),
                },
              }}
            >
              Max
            </Typography>
          </Button>
          <Button
            sx={{
              minWidth: 'auto',
              borderRadius: '50%',
              width: 30,
              height: 30,
              paddingY: 0,
              paddingX: 2,
            }}
            onClick={swapHandler}
          >
            <SwapIcon sx={{ width: 30, height: 30 }} />
          </Button>
        </Box>
      </ModalInputContainer>
      <Box marginTop={2}>
        <DisableableModalButton
          text={isDepositType ? 'Deposit' : 'Withdraw'}
          disabled={disabled}
          onClick={() => {
            setType(isDepositType ? ModalType.DepositCollateralConfirmation : ModalType.WithdrawCollateralConfirmation)
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 2,
        }}
      >
        <Typography variant="label_semi" color={formatColor(blue.blue1)}>
          Borrowing Power
        </Typography>
        <Box component="img" src="images/up_arrow_blue.png" width={10} height={12} marginX={1} />
        <Typography variant="label_semi" color={formatColor(blue.blue1)}>
          ${newBorrowingPower.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  )
}
