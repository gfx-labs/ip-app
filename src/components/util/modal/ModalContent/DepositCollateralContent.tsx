import { useState, useEffect } from 'react'

import { Box, Typography, Button } from '@mui/material'
import { formatColor, neutral, blue } from '../../../../theme'
import { DecimalInput } from '../../textFields'
import { DisableableModalButton } from '../../button/DisableableModalButton'
import { ModalInputContainer } from './ModalInputContainer'
import { SwapIcon } from '../../../icons/misc/SwapIcon'
import {
  ModalType,
  useModalContext,
} from '../../../libs/modal-content-provider/ModalContentProvider'
import { useLight } from '../../../../hooks/useLight'
import { useVaultDataContext } from '../../../libs/vault-data-provider/VaultDataProvider'

export const DepositCollateralContent = () => {
  const {
    setType,
    setCollateralDepositAmount,
    collateralToken,
    collateralDepositAmount,
  } = useModalContext()

  const { borrowingPower, tokens } = useVaultDataContext()

  const [disabled, setDisabled] = useState(true)
  const [focus, setFocus] = useState(false)
  const [isMoneyValue, setIsMoneyValue] = useState(false)
  const toggle = () => setFocus(!focus)
  const isLight = useLight()
  const ltv = tokens![collateralToken.ticker].token_LTV || 0
  const [newBorrowingPower, setNewBorrowingPower] = useState(0)
  const [inputAmount, setInputAmount] = useState('')

  const trySetInputAmount = (amount: string) => {
    setInputAmount(amount)
  }

  const setMax = () => {
    console.log(
      collateralToken.value,
      collateralToken.wallet_amount,
      collateralToken.wallet_amount! * collateralToken.value
    )
    if (isMoneyValue) {
      console.log(
        collateralToken.value,
        collateralToken.wallet_amount,
        collateralToken.wallet_amount! * collateralToken.value
      )
      setInputAmount(
        (collateralToken.wallet_amount! * collateralToken.value).toString()
      )
    } else {
      setInputAmount(collateralToken.wallet_amount!.toString())
    }
  }

  useEffect(() => {
    setDisabled(Number(inputAmount) <= 0)

    if (isMoneyValue) {
      setCollateralDepositAmount(
        (Number(inputAmount) / collateralToken.value).toString()
      )
      setNewBorrowingPower(borrowingPower + Number(inputAmount) * (ltv / 100))
    } else {
      setCollateralDepositAmount(inputAmount)
      setNewBorrowingPower(
        borrowingPower +
          Number(inputAmount) * collateralToken.value * (ltv / 100)
      )
    }
  }, [inputAmount])

  const swapHandler = () => {
    console.log(
      collateralDepositAmount,
      collateralToken.value,
      collateralToken.ticker
    )
    if (!isMoneyValue) {
      setInputAmount((Number(inputAmount) * collateralToken.value).toString())
    } else {
      setInputAmount((Number(inputAmount) / collateralToken.value).toString())
    }
    setIsMoneyValue(!isMoneyValue)
  }

  return (
    <Box>
      <Box textAlign="right" mb={1}>
        <Typography variant="label2" color={formatColor(neutral.gray3)}>
          {' '}
          Wallet Balance: {collateralToken?.wallet_amount!.toFixed(2)}{' '}
          {collateralToken?.ticker}
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
                  inputAmount === '0'
                    ? '0'
                    : (Number(inputAmount) / collateralToken?.value).toFixed(8)
                } ${collateralToken?.ticker}`
              : `$${(
                  Number(inputAmount) * collateralToken?.value
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
          text="Deposit"
          disabled={disabled}
          onClick={() => setType(ModalType.DepositCollateralConfirmation)}
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
        <Typography variant="label2" color={formatColor(blue.blue1)}>
          Borrowing Power
        </Typography>
        <Box
          component="img"
          src="images/up_arrow_blue.png"
          width={10}
          height={12}
          marginX={1}
        />
        <Typography variant="label2" color={formatColor(blue.blue1)}>
          ${newBorrowingPower.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  )
}
