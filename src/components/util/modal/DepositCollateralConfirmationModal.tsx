import { Box, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { useState, useEffect } from 'react'
import { ModalType, useModalContext } from '../../providers/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useLight } from '../../../hooks/useLight'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { useWeb3Context } from '../../providers/Web3Provider'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { locale } from '../../../locale'
import { ContractReceipt, ContractTransaction, utils } from 'ethers'
import depositToVotingVault from '../../../contracts/Vault/depositToVotingVault'
import depositToBptVault from '../../../contracts/Vault/depositToBptVault'
import { ERC20Detailed__factory } from '../../../contract_abis'
import { hasTokenAllowance } from '../../../contracts/Token/hasAllowance'
import { DEFAULT_APPROVE_AMOUNT } from '../../../constants'
import { Token } from '../../../chain/tokens'
import { depositCollateral, depositRebase } from '../../../contracts/Vault/depositCollateral'

export const DepositCollateralConfirmationModal = () => {
  const {
    type,
    setType,
    collateralToken: token,
    collateralDepositAmount,
    updateTransactionState,
    setCollateralDepositAmount,
    collateralDepositAmountMax,
    setCollateralDepositAmountMax,
    stake,
    wrap,
  } = useModalContext()
  const { provider, currentAccount, currentSigner } = useWeb3Context()
  const { tokens, vaultAddress, vaultId, hasVotingVault, hasBptVault, hasMKRVotingVault } = useVaultDataContext()
  const isLight = useLight()
  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const [hasAllowance, setHasAllowance] = useState(false)
  const collateralToken = token as Token
  const amount = collateralDepositAmountMax ? collateralToken.wallet_amount : collateralDepositAmount
  const contract = ERC20Detailed__factory.connect(collateralToken.address, currentSigner!)

  useEffect(() => {
    if (collateralToken.capped_address && amount) {
      hasTokenAllowance(currentAccount, amount, collateralToken, provider!).then(
        setHasAllowance
      )
    }
  }, [amount])

  const handleDepositConfirmationRequest = async () => {
    try {
      let attempt: ContractTransaction
      if (collateralToken.capped_token && collateralToken.capped_address) {
        if ((!hasVotingVault && !collateralToken.bpt && collateralToken.ticker !== 'MKR') || 
        (!hasBptVault && collateralToken.bpt) ||
        (!hasMKRVotingVault && collateralToken.ticker == 'MKR')) {
          setLoading(false)
          setType(ModalType.MintSubVault)
          return
        }
        setLoading(true)
        setLoadmsg(locale('CheckWallet'))
        const ha = await hasTokenAllowance(
          currentAccount,
          amount!,
          collateralToken,
          provider!
        )
        setHasAllowance(ha)
        if (!ha) {
          let approveAmount = utils.parseUnits(DEFAULT_APPROVE_AMOUNT, collateralToken.decimals)
          const txn = await contract.approve(collateralToken.capped_address!, approveAmount)
          setLoadmsg(locale('TransactionPending'))
          await txn?.wait()
          setLoading(false)
          setLoadmsg('')
          setHasAllowance(true)
          return
        }
        if (collateralToken.bpt) {
          attempt = await depositToBptVault(vaultId!, currentSigner!, collateralToken, amount!, stake)
        } else if (collateralToken.can_wrap) {
          attempt = await depositToBptVault(vaultId!, currentSigner!, collateralToken, amount!, wrap)
        } else if (collateralToken.ticker === 'AUSDC') {
          attempt = await depositRebase(amount!, collateralToken.capped_address, vaultId!, currentSigner!)
        } else {
          attempt = await depositToVotingVault(vaultId!, currentSigner!, collateralToken, amount!)
        }
      } else {
        if (wrap) {
          const tok = tokens![collateralToken.unwrapped!]
          attempt = await depositToBptVault(vaultId!, currentSigner!, tok, amount!, wrap)
        } else {
          attempt = await depositCollateral(amount!, collateralToken.address, provider?.getSigner(currentAccount)!, vaultAddress!)
        }
      }
      updateTransactionState(attempt!)

      setLoadmsg(locale('TransactionPending'))
      const receipt = await attempt!.wait()

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

  return (
    <BaseModal
      open={type === ModalType.DepositCollateralConfirmation}
      onClose={() => {
        setType(ModalType.DepositCollateral)
      }}
    >
      <Typography variant="body1" color={isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)}>
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
          backgroundColor: isLight ? formatColor(neutral.gray5) : formatColor(neutral.gray7),
        }}
      >
        <Box display="flex" alignItems="center">
          <Box component="img" width={36} height={36} src={`images/${collateralToken.ticker}.svg`} alt={collateralToken.ticker} marginRight={3}></Box>
          <Box>
            <Typography variant="body3" color="text.primary">
              ${(collateralToken.price * Number(collateralDepositAmount)).toFixed(2)} ({collateralDepositAmount} {collateralToken.ticker})
            </Typography>
          </Box>
        </Box>
      </Box>
      <DisableableModalButton
        text={
          !collateralToken.capped_token || hasAllowance
            ? 'Confirm Deposit'
            : 'Set Allowance'
        }
        disabled={false}
        onClick={handleDepositConfirmationRequest}
        loading={loading}
        load_text={loadmsg}
      />
    </BaseModal>
  )
}
