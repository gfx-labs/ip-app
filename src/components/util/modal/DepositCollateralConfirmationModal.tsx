import { Box, Typography, Link as MuiLink, Button } from '@mui/material'
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
import { ContractReceipt, ContractTransaction, utils } from 'ethers'
import { depositCollateral } from '../../../contracts/ERC20'
import hasVotingVault from '../../../contracts/VotingVault/hasVotingVault'
import mintVotingVaultID from '../../../contracts/VotingVault/mintVault'
import depositToVotingVault from '../../../contracts/VotingVault/depositToVotingVault'
import { JsonRpcSigner } from '@ethersproject/providers'
import { ERC20Detailed__factory } from '../../../chain/contracts'
import { Token } from '../../../chain/tokens'

const mintBeforeDeposit = async (
  vaultID: string,
  currentSigner: JsonRpcSigner
) => {
  return await mintVotingVaultID(vaultID, currentSigner!)
}

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
  const { provider, currentAccount, currentSigner, dataBlock } =
    useWeb3Context()
  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const [modalTitle, setModalTitle] = useState('Confirm Deposit')
  const { vaultAddress, vaultID, hasVotingVault, setHasVotingVault } =
    useVaultDataContext()
  const [needAllowance, setNeedAllowance] = useState(true)
  const [decimals, setDecimals] = useState(18)

  const amount = collateralDepositAmountMax
    ? collateralToken.wallet_amount?.toString()
    : collateralDepositAmount

  const contract = ERC20Detailed__factory.connect(
    collateralToken.address,
    currentSigner!
  )

  const needsAllowance = async (amount: string, token: Token) => {
    const initialApproval = await contract.allowance(
      currentAccount,
      token.capped_address!
    )
    const formattedUSDCAmount = utils.parseUnits(amount!, decimals)

    return initialApproval.lt(formattedUSDCAmount)
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
    setLoading(true)
    setLoadmsg(locale('CheckWallet'))

    try {
      let attempt: ContractTransaction

      if (collateralToken.capped_token && collateralToken.capped_address) {
        if (!hasVotingVault) {
          setModalTitle('Enabling Capped Tokens')

          await mintBeforeDeposit(vaultID!, currentSigner!)
          setLoading(false)
          setLoadmsg('')
          setModalTitle('Confirm Deposit')
          setHasVotingVault(true)
          return
        }

        const na = await needsAllowance(amount!, collateralToken)
        console.log(na, 'THIS IS NA')
        setNeedAllowance(na)

        if (na) {
          const txn = await contract.approve(
            collateralToken.capped_address!,
            utils.parseUnits(amount!, decimals)
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
        {modalTitle}
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
        text={
          needAllowance && hasVotingVault ? 'Set Allowance' : 'Confirm Deposit'
        }
        disabled={false}
        onClick={handleDepositConfirmationRequest}
        loading={loading}
        load_text={loadmsg}
      />
    </BaseModal>
  )
}
