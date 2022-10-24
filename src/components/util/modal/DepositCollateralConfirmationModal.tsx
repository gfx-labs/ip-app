import { Box, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { useState, useEffect } from 'react'
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
import { BigNumber, ContractReceipt, ContractTransaction, utils } from 'ethers'
import { depositCollateral } from '../../../contracts/ERC20'
import depositToVotingVault from '../../../contracts/VotingVault/depositToVotingVault'
import { ERC20Detailed__factory } from '../../../chain/contracts'
import { Token } from '../../../types/token'
import SVGBox from '../../icons/misc/SVGBox'

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
  const { provider, currentAccount, currentSigner } = useWeb3Context()
  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const { vaultAddress, vaultID, hasVotingVault } = useVaultDataContext()
  const [needAllowance, setNeedAllowance] = useState(true)
  const [decimals, setDecimals] = useState(18)

  const amount = collateralDepositAmountMax
    ? collateralToken.wallet_amount
    : collateralDepositAmount

  const contract = ERC20Detailed__factory.connect(
    collateralToken.address,
    currentSigner!
  )

  const needsAllowance = async (amount: string | BigNumber, token: Token) => {
    const initialApproval = await contract.allowance(
      currentAccount,
      token.capped_address!
    )

    if (collateralDepositAmountMax) {
      return initialApproval.lt(amount)
    }

    if (typeof amount === 'string') {
      const formattedUSDCAmount = utils.parseUnits(amount!, decimals)

      return initialApproval.lt(formattedUSDCAmount)
    }

    return true
  }

  useEffect(() => {
    contract.decimals().then((decimals) => setDecimals(decimals))
  }, [])

  useEffect(() => {
    if (collateralToken.capped_address && amount) {
      needsAllowance(amount!, collateralToken).then(setNeedAllowance)
    }
  }, [amount])

  const handleDepositConfirmationRequest = async () => {
    try {
      let attempt: ContractTransaction
      if (collateralToken.capped_address) {
        if (!hasVotingVault) {
          setLoading(false)
          setType(ModalType.EnableCappedToken)
          return
        }
        setLoading(true)
        setLoadmsg(locale('CheckWallet'))

        const na = await needsAllowance(amount!, collateralToken)
        console.log(na)
        setNeedAllowance(na)

        if (na) {
          let approveAmount
          if (typeof amount === 'string') {
            approveAmount = utils.parseUnits(amount!, decimals)
          } else {
            approveAmount = collateralToken.wallet_amount
          }

          const txn = await contract.approve(
            collateralToken.capped_address!,
            approveAmount!
          )
          setLoadmsg(locale('TransactionPending'))

          await txn?.wait()

          setLoading(false)
          setLoadmsg('')
          setNeedAllowance(false)

          return
        }

        attempt = await depositToVotingVault(
          vaultID!,
          currentSigner!,
          collateralToken,
          amount!
        )
      } else {
        attempt = await depositCollateral(
          amount!,
          collateralToken.address,
          provider?.getSigner(currentAccount)!,
          vaultAddress!
        )
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
          <SVGBox
            width={36}
            height={36}
            svg_name={collateralToken.ticker}
            alt={collateralToken.ticker}
            sx={{ mr: 3 }}
          />
          <Box>
            <Typography variant="body3" color="text.primary">
              $
              {(
                collateralToken.price * Number(collateralDepositAmount)
              ).toFixed(2)}{' '}
              ({collateralDepositAmount} {collateralToken.ticker})
            </Typography>
          </Box>
        </Box>
      </Box>

      <DisableableModalButton
        text={
          !collateralToken.capped_address ||
          (collateralToken.capped_address && !hasVotingVault) ||
          !needAllowance
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
