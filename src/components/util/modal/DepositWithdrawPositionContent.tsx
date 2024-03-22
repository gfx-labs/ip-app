import { Box, Typography } from '@mui/material'
import { ModalType, useModalContext } from '../../providers/ModalContentProvider'
import { useState } from 'react'
import { formatColor, neutral } from '../../../theme'
import { DISPLAY_DECIMALS } from '../../../constants'
import { round } from '../../../easy/bn'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { NumeralInput } from '../textFields'
import { ModalInputContainer } from './ModalContent/ModalInputContainer'
import { UniPosition } from '../../../chain/tokens'
import { isValidPosition } from './PositionHelpers'
import { useWeb3Context } from '../../providers/Web3Provider'
import red from '@mui/material/colors/red'
import SVGBox from '../../icons/misc/SVGBox'

export const DepositWithdrawPositionContent = () => {
  const {
    type,
    setType,
    collateralToken: token,
    collateralDepositAmount: depositTokenId,
    collateralWithdrawAmount: withdrawTokenId,
    setCollateralDepositAmount: setDepositTokenId,
    setCollateralWithdrawAmount: setWithdrawTokenId,
  } = useModalContext()
  const { provider } = useWeb3Context()
  const isDepositType = type === ModalType.DepositPosition
  const [focus, setFocus] = useState(false)
  const [text, setText] = useState('')
  const toggle = () => setFocus(!focus)
  const position = token as UniPosition

  const validateInput = async () => {
    //setText('Checking if the token ID is valid...')
    const tokenId = isDepositType ? depositTokenId : withdrawTokenId
    const isValid = await isValidPosition(tokenId, provider!)
    if (isValid) {
      setType(isDepositType ? ModalType.DepositPositionConfirmation : ModalType.WithdrawPositionConfirmation)
    } else {
      setText('Invalid token ID. Please try again.')
    }
  }

  const isDisabled = isDepositType
    ? !depositTokenId || depositTokenId == '0'
    : !withdrawTokenId || withdrawTokenId == '0'

  const balanceInfo: string = isDepositType
    ? `Wallet Balance: ${round(position.wallet_balance || 0, DISPLAY_DECIMALS)} position(s)`
    : `Vault balance: $${Number(position.vault_balance).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <Box display="flex" flexDirection={'row'} maxWidth={{ xs: 42, lg: 70 }}>
          <SVGBox
            width={{ xs: 24, lg: 40 }}
            height={{ xs: 24, lg: 40 }}
            svg_name={position.token0}
            alt={position.token0}
            sx={{
              position: 'relative',
              zIndex: 10,
              border: '0.02em solid',
              borderRadius: { xs: 12, lg: 20 },
              borderColor: 'text.secondary',
            }}
          />
          <SVGBox
            width={{ xs: 24, lg: 40 }}
            height={{ xs: 24, lg: 40 }}
            svg_name={position.token1}
            alt={position.token1}
            sx={{
              position: 'relative',
              left: { xs: -6, lg: -10 },
              border: '0.02em solid',
              borderRadius: { xs: 12, lg: 20 },
              borderColor: 'text.secondary',
            }}
          />
        </Box>
        <Box>
          <Typography variant="h7" display="block" color="text.primary" mb={1}>
            {position.name}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box textAlign="right" mb={1}>
          <Typography variant="label_semi" color={formatColor(neutral.gray3)}>
            {balanceInfo}
          </Typography>
        </Box>
        <ModalInputContainer focus={focus}>
          <NumeralInput
            onBlur={toggle}
            onFocus={toggle}
            onChange={isDepositType ? setDepositTokenId : setWithdrawTokenId}
            value={isDepositType ? depositTokenId : withdrawTokenId}
          />
        </ModalInputContainer>
        <Box marginTop={2}>
          <DisableableModalButton
            text={isDepositType ? 'Deposit' : 'Withdraw'}
            onClick={validateInput}
            disabled={isDisabled}
          />
        </Box>
        <Box marginTop={2} textAlign={'center'}>
          <Typography variant="label_semi" color={red.A200}>
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
