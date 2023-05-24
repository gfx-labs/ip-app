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
    let newBorrowingPower
    // if (isMoneyValue) {
    //   newBorrowingPower = borrowingPower - Number(inputAmount) * (ltv / 100)
    //   setCollateralWithdrawAmount(
    //     (Number(inputAmount) / collateralToken.price).toString()
    //   )
    // } else {
      newBorrowingPower =
        borrowingPower -
        Number(inputAmount) * collateralToken.price * (ltv / 100)
      setCollateralWithdrawAmount(inputAmount)
    //}

    if (newBorrowingPower <= 0) {
      setNewBorrowingPower(0)
    } else {
      setNewBorrowingPower(newBorrowingPower)
    }

    if (
      !collateralWithdrawAmountMax &&
      (newBorrowingPower < accountLiability || Number(inputAmount) <= 0)
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [inputAmount])

  const swapHandler = () => {
    // if (!isMoneyValue) {
    //   setInputAmount((Number(inputAmount) * collateralToken.price).toString())
    // } else {
    //   setInputAmount((Number(inputAmount) / collateralToken.price).toString())
    // }
    setIsMoneyValue(!isMoneyValue)
  }

  const trySetInputAmount = (amount: string) => {
    setCollateralWithdrawAmountMax(false)
    setInputAmount(amount)
  }

  function roundDown(val: number, decimals: number) {
    decimals = decimals || 0;
    return (Math.floor(val * Math.pow(10, decimals)) / Math.pow(10, decimals));
  }

  const setMax = () => {
    if (collateralToken && collateralToken.vault_amount) {
      //allowed to withdraw
      let a2s = roundDown(borrowingPower - accountLiability, 2)

      if (a2s > 0) {
        const max = roundDown(a2s*100/ltv, 2)
        let amt = roundDown((max*100)/(collateralToken.price*100), 2)
        const va =  roundDown(Number(collateralToken.vault_amount_str), 2)
        //amt = Math.min(amt, va)
        
        if (va < amt) {
          setCollateralWithdrawAmountMax(true)
          amt = va
        } else {
          setCollateralWithdrawAmountMax(false)
        }
        setInputAmount(amt.toString())
        setDisabled(false)
      } else {
        setInputAmount('0')
      }
    } else {
      setInputAmount('0')
    }
  }

  return (
    <Box>
      <Box textAlign="right" mb={1}>
        <Typography variant="label_semi" color={formatColor(neutral.gray3)}>
          Vault Balance: {round(collateralToken.vault_amount_str || 0, 4)}{' '}
          {collateralToken.ticker}
        </Typography>
      </Box>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={trySetInputAmount}
          placeholder={`0 ${isMoneyValue ? 'USD' : collateralToken.ticker}`}
          value={ isMoneyValue ? (Number(inputAmount)*collateralToken.price).toFixed(4) : inputAmount }
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
                    : inputAmount
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
