import { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { round } from '../../../../easy/bn'

import { blue, formatColor, neutral } from '../../../../theme'
import { DecimalInput } from '../../textFields'
import { DisableableModalButton } from '../../button/DisableableModalButton'
import { ModalInputContainer } from './ModalInputContainer'
import { SwapIcon } from '../../../icons/misc/SwapIcon'
import {
  ModalType,
  useModalContext,
} from '../../../libs/modal-content-provider/ModalContentProvider'
import { useVaultDataContext } from '../../../libs/vault-data-provider/VaultDataProvider'
import { useLight } from '../../../../hooks/useLight'
import { DISPLAY_DECIMALS } from '../../../../constants'

export const WithdrawCollateralContent = () => {
  const {
    setType,
    collateralToken,
    setCollateralWithdrawAmount,
    setCollateralWithdrawAmountMax,
    collateralWithdrawAmountMax,
  } = useModalContext()

  const isLight = useLight()
  const { borrowingPower, accountLiability, tokens } = useVaultDataContext()

  const [inputAmount, setInputAmount] = useState('')

  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus(!focus)
  const [isMoneyValue, setIsMoneyValue] = useState(false)

  const [disabled, setDisabled] = useState(true)
  const [newBorrowingPower, setNewBorrowingPower] = useState(0)
  const ltv = tokens![collateralToken.ticker].token_LTV || 0

  useEffect(() => {
    let newBorrowingPower: number
    if (isMoneyValue) {
      newBorrowingPower = Number(borrowingPower) - Number(inputAmount) * (ltv / 100)
      let amt = roundDown((Number(inputAmount) * 100) / (collateralToken.price * 100), 2)
      setCollateralWithdrawAmount(amt.toString())
    } else {
      newBorrowingPower = Number(borrowingPower) -
        Number(inputAmount) * collateralToken.price * (ltv / 100)
      setCollateralWithdrawAmount(inputAmount)
    }

    if (newBorrowingPower <= 0) {
      setNewBorrowingPower(0)
    } else {
      setNewBorrowingPower(newBorrowingPower)
    }

    if (
      Number(inputAmount) <= 0 || (newBorrowingPower < Number(accountLiability))
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [inputAmount])

  const swapHandler = () => {
    if (!isMoneyValue) {
      setInputAmount((Number(inputAmount) * collateralToken.price).toString())
    } else {
      setInputAmount((Number(inputAmount) / collateralToken.price).toString())
    }
    setIsMoneyValue(!isMoneyValue)
  }

  const trySetInputAmount = (amount: string) => {
    setCollateralWithdrawAmountMax(false)
    setInputAmount(amount)
  }

  // not precise but will only be < correct value so its ok
  function roundDown(val: number, dec: number) {
    dec = dec || 0;
    const mul = Math.pow(10, dec)
    return Math.floor(val * mul) / mul;
  }

  function countDecimals(val: string): number {
    if (Math.floor(Number(val)) === Number(val)) return 0;
    return val.toString().split(".")[1].length || 0; 
  }

  const setMax = () => {
    if (collateralToken && collateralToken.vault_amount) {
      //allowed to withdraw
      
      let amt = 0

      if (Number(accountLiability) == 0) {
        setCollateralWithdrawAmountMax(true)
        amt = isMoneyValue ? Number(collateralToken.vault_balance) 
        : Number(collateralToken.vault_amount_str)
      } else {
        const a = Number(borrowingPower) - Number(accountLiability)
        const dec = Math.max(countDecimals(collateralToken.vault_amount_str!), 2)
        if (a > 0) {
          const max = a * 100 / ltv
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
          setInputAmount(amt.toString())
          setDisabled(false)
        } else {
          setInputAmount('0')
        }
      }
    } else {
      setInputAmount('0')
    }
  }

  return (
    <Box>
      <Box textAlign="right" mb={1}>
        <Typography variant="label_semi" color={formatColor(neutral.gray3)}>
          Vault Balance: {round(collateralToken.vault_amount_str || 0, DISPLAY_DECIMALS)}{' '}
          {collateralToken.ticker}
        </Typography>
      </Box>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={trySetInputAmount}
          placeholder={`0 ${isMoneyValue ? 'USD' : collateralToken.ticker}`}
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
                  inputAmount === '0'
                    ? '0'
                    : round(Number(inputAmount) / collateralToken.price, DISPLAY_DECIMALS)
                } ${collateralToken.ticker}`
              : `$${(
                  Number(inputAmount) * collateralToken.price
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </Typography>

          <Button
            onClick={setMax}
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
                  color: isLight
                    ? formatColor(neutral.gray1)
                    : formatColor(neutral.white),
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
          text="Withdraw"
          onClick={() => setType(ModalType.WithdrawCollateralConfirmation)}
          disabled={disabled}
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
        <Box
          component="img"
          src="images/up_arrow_blue.png"
          width={10}
          height={12}
          marginX={1}
          sx={{
            transform: 'rotate(180deg)',
          }}
        />
        <Typography variant="label_semi" color={formatColor(blue.blue1)}>
          ${newBorrowingPower.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  )
}
