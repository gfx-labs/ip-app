import { Box, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { useState } from 'react'
import { ModalType, useModalContext } from '../../providers/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useLight } from '../../../hooks/useLight'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { useWeb3Context } from '../../providers/Web3Provider'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { locale } from '../../../locale'
import { BigNumber, ContractReceipt } from 'ethers'
import { approvePosition, depositPosition, getIdxFromId } from './PositionHelpers'
import { UniPosition } from '../../../chain/tokens'
import withdrawCollateral from '../../../contracts/Vault/withdrawCollateral'
import { TransactionReceipt } from '@ethersproject/providers'
import SVGBox from '../../icons/misc/SVGBox'

export const DepositWithdrawPositionConfirmationModal = () => {
  const {
    type,
    setType,
    collateralToken: token,
    updateTransactionState,
    collateralDepositAmount: depositTokenId,    // this is the token id
    collateralWithdrawAmount: withdrawTokenId,
    setCollateralDepositAmount: setDepositTokenId,
    setCollateralWithdrawAmount: setWithdrawTokenId,
  } = useModalContext()
  const { currentAccount, currentSigner } = useWeb3Context()
  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const { vaultAddress, vaultId, hasVotingVault, hasNftVault } = useVaultDataContext()
  const [isApproved, setIsApproved] = useState(false)
  const isLight = useLight()
  const isDepositType = type === ModalType.DepositPositionConfirmation
  const position = token as UniPosition

  const handleDepositConfirmation = async () => {
    try {
      if (!hasNftVault) {
        setLoading(false)
        setType(ModalType.MintSubVault)
        return
      }
      setLoading(true)
      setLoadmsg(locale('CheckWallet'))
      if (!isApproved) {
        const approve = await approvePosition(position.address, depositTokenId, currentSigner!)
        setLoadmsg(locale('TransactionPending'))
        await approve.wait()
        setIsApproved(true)
      }
      setLoadmsg(locale('CheckWallet'))
      const deposit = await depositPosition(position.address, vaultId!, depositTokenId, currentSigner!)
      updateTransactionState(deposit)
      setLoadmsg(locale('TransactionPending'))
      const receipt = await deposit.wait()
      setDepositTokenId('')
      updateTransactionState(receipt)
    } catch (err) {
      const error = err as ContractReceipt
      updateTransactionState(error)
    }
    setLoadmsg('')
    setLoading(false)
  }

  const handleWithdrawConfirmation = async () => {
    setLoading(true)
    setLoadmsg(locale('CheckWallet'))
    try {
      const idx = await getIdxFromId(position.address, currentAccount, withdrawTokenId, currentSigner!)
      const attempt = await withdrawCollateral(
        BigNumber.from(idx),
        position.address,
        vaultAddress!,
        currentSigner!,
      )
      updateTransactionState(attempt)
      setLoadmsg(locale('TransactionPending'))
      const receipt = await attempt.wait()
      setWithdrawTokenId('')
      updateTransactionState(receipt)
    } catch (err) {
      const error = err as TransactionReceipt
      updateTransactionState(error)
    }
    setLoadmsg('')
    setLoading(false)
  }

  return (
    <BaseModal
      open={type === ModalType.DepositPositionConfirmation ||
      type === ModalType.WithdrawPositionConfirmation}
      onClose={() => {
        setIsApproved(false)
        isDepositType ? 
        setType(ModalType.DepositPosition) :
        setType(ModalType.WithdrawPosition)
      }}
    >
      <Typography variant="body1" color={isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)}>
        { isDepositType ? 'Confirm deposit' : 'Confirm withdraw' }
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
          backgroundColor: isLight ? formatColor(neutral.gray5) : formatColor(neutral.gray7),
        }}
      >
        <Box display="flex" alignItems="center" columnGap={2}>
        <Box display="flex" flexDirection={"row"} maxWidth={{ xs: 42, lg: 63}}>
            <SVGBox
              width={{ xs: 24, lg: 36 }}
              height={{ xs: 24, lg: 36 }}
              svg_name={position.token0}
              alt={position.token0}
              sx={{
                position: 'relative',
                zIndex: 10,
                border: '0.02em solid',
                borderRadius: {xs: 12, lg: 18},
                borderColor: 'text.secondary',
              }}
            />
            <SVGBox
              width={{ xs: 24, lg: 36 }} 
              height={{ xs: 24, lg: 36 }} 
              svg_name={position.token1}
              alt = {position.token1}
              sx={{
                position: 'relative',
                left: { xs: -6, lg: -9 },
                border: '0.02em solid',
                borderRadius: {xs: 12, lg: 18},
                borderColor: 'text.secondary',
              }}
            />
          </Box>
          <Box>
            <Typography variant="body3" color="text.primary">
              {isDepositType? depositTokenId : withdrawTokenId}
            </Typography>
          </Box>
        </Box>
      </Box>
      <DisableableModalButton
        text={
          isDepositType ? (
            isApproved
            ? 'Confirm deposit'
            : 'Approve position'
          ) : 'Withdraw position'
        }
        disabled={false}
        onClick={ isDepositType ? handleDepositConfirmation : handleWithdrawConfirmation }
        loading={loading}
        load_text={loadmsg}
      />
    </BaseModal>
  )
}
