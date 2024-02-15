import { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../../theme'
import { DecimalInput } from '../../textFields'
import { DisableableModalButton } from '../../button/DisableableModalButton'
import { ModalInputContainer } from './ModalInputContainer'
import { useRolodexContext } from '../../../providers/RolodexDataProvider'
import { useWeb3Context } from '../../../providers/Web3Provider'
import { locale } from '../../../../locale'
import { useModalContext } from '../../../providers/ModalContentProvider'
import { TransactionReceipt } from '@ethersproject/providers'
import { useStableCoinsContext } from '../../../providers/StableCoinsProvider'
import { useLight } from '../../../../hooks/useLight'
import { ContractTransaction } from 'ethers'
import { repayAllUsdi, repayUsdi } from '../../../../contracts/USDI/repayUsdi'

interface RepayContent {
  tokenName: string
  vaultBorrowPower: string
  repayAmount: string
  setRepayAmount: (e: string) => void
  accountLiability: number
  vaultID: number
}

export const RepayContent = (props: RepayContent) => {
  const {
    tokenName,
    vaultBorrowPower,
    setRepayAmount,
    repayAmount,
    accountLiability,
    vaultID,
  } = props
  const rolodex = useRolodexContext()
  const { currentSigner } = useWeb3Context()
  const { updateTransactionState } = useModalContext()
  const { USDI } = useStableCoinsContext()
  const [newHealth, setNewHealth] = useState(
    100 * (accountLiability / Number(vaultBorrowPower))
  )
  const [repayMax, setRepayMax] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus(!focus)
  const isLight = useLight()

  useEffect(() => {
    setDisabled(Number(repayAmount) <= 0 || accountLiability === 0 || 
    (Number(repayAmount) > Number(USDI.wallet_balance)))
  }, [repayAmount])

  const onInputChange = (e: string) => {
    const newLib = accountLiability - Number(e)
    if (newLib < 0) {
      setRepayAmount(accountLiability.toString())
    } else {
      setRepayAmount(e)
    }
  }

  useEffect(() => {
    const newHealth =
      (100 * (accountLiability - Number(repayAmount))) /
      Number(vaultBorrowPower)

    if (isNaN(newHealth)) {
      setNewHealth(0)
    } else {
      setNewHealth(newHealth)
    }
  }, [repayAmount])

  const setMax = () => {
    if (Number(USDI.wallet_balance) < accountLiability) {
      setRepayAmount(USDI.wallet_balance ?? '0')
    } else {
      setRepayAmount(accountLiability.toString())
      setRepayMax(true)
    }
  }

  const handleRepayRequest = async (repayAmount: string) => {
    setLoading(true)
    setLoadmsg(locale('CheckWallet'))
    try {
      let repayTransaction: ContractTransaction
      if (repayMax) {
        repayTransaction = await repayAllUsdi(
          vaultID,
          rolodex!,
          currentSigner!
        )
      } else {
        repayTransaction = await repayUsdi(
          vaultID,
          repayAmount,
          rolodex!,
          currentSigner!
        )
      }
      updateTransactionState(repayTransaction)
      const repayReceipt = await repayTransaction.wait()

      updateTransactionState(repayReceipt)
      setRepayAmount('')
      setLoadmsg('')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
      updateTransactionState(err as TransactionReceipt)
    }
  }

  return (
    <Box>
      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={onInputChange}
          placeholder={`0 ${tokenName}`}
          value={repayAmount}
        />
        <Box sx={{ display: 'flex', paddingBottom: 0.5, alignItems: 'center' }}>
          <Typography
            variant="body3"
            sx={{
              color: formatColor(neutral.gray3),
              marginLeft: 1,
            }}
          >
            {`${Number(newHealth).toFixed(2)}%`}
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
        </Box>
      </ModalInputContainer>
      <Box
        marginTop={2}
      >
        <DisableableModalButton
          text="Repay"
          onClick={() => handleRepayRequest(repayAmount)}
          disabled={disabled}
          loading={loading}
          load_text={loadmsg}
          shaking={shaking}
        />
      </Box>
    </Box>
  )
}
