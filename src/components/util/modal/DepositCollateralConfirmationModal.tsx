import { Box, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { useState } from 'react'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useLight } from '../../../hooks/useLight'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { locale } from '../../../locale'
import { ContractReceipt } from 'ethers'
import { depositCollateral } from '../../../contracts/ERC20'

export const DepositCollateralConfirmationModal = () => {
  const {
    type,
    setType,
    collateralToken,
    collateralDepositAmount,
    updateTransactionState,
    setCollateralDepositAmount,
    collateralDepositAmountMax,
    setCollateralDepositAmountMax,
  } = useModalContext()
  const { provider, currentAccount } = useWeb3Context()
  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const { vaultAddress } = useVaultDataContext()
  const handleDepositConfirmationRequest = async () => {
    const amount = collateralDepositAmountMax
      ? collateralToken.wallet_amount?.toString()
      : collateralDepositAmount

    setLoading(true)
    setLoadmsg(locale('CheckWallet'))
    try {
      const attempt = await depositCollateral(
        amount!,
        collateralToken.address,
        provider?.getSigner(currentAccount)!,
        vaultAddress!
      )

      updateTransactionState(attempt)

      setLoadmsg(locale('TransactionPending'))
      const receipt = await attempt.wait()

      setCollateralDepositAmount('')
      setCollateralDepositAmountMax(false)

      updateTransactionState(receipt)
    } catch (err) {
      const error = err as ContractReceipt

      updateTransactionState(error)
    }

    setLoadmsg('')
    setLoading(false)
  }

  const isLight = useLight()

  return (
    <BaseModal
      open={type === ModalType.DepositCollateralConfirmation}
      setOpen={() => {
        setType(ModalType.DepositCollateral)
      }}
    >
      <Typography
        variant="body1"
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        Confirm Deposit
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          mt: 3,
          py: 2,
          borderRadius: '10px',
          columnGap: 4,
          backgroundColor: isLight
            ? formatColor(neutral.gray5)
            : formatColor(neutral.gray7),
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            width={36}
            height={36}
            src={`images/${collateralToken.ticker}.svg`}
            alt={collateralToken.ticker}
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="body3" color="text.primary">
              $
              {(
                collateralToken.value * Number(collateralDepositAmount)
              ).toFixed(2)}{' '}
              ({collateralDepositAmount} {collateralToken.ticker})
            </Typography>
          </Box>
        </Box>
      </Box>

      <DisableableModalButton
        text="Confirm Deposit"
        disabled={false}
        onClick={handleDepositConfirmationRequest}
        loading={loading}
        load_text={loadmsg}
      />
    </BaseModal>
  )
}
