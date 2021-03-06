import { Box, Button, Typography, Link as MuiLink } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { useEffect, useState } from 'react'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { ForwardIcon } from '../../icons/misc/ForwardIcon'
import { useRolodexContext } from '../../libs/rolodex-data-provider/RolodexDataProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { BN } from '../../../easy/bn'
import { ContractTransaction } from 'ethers'
import { locale } from '../../../locale'
import { TransactionReceipt } from '@ethersproject/providers'
import { Chains } from '../../../chain/chains'
import { depositUSDC } from '../../../contracts/USDI/depositUSDC'

export const DepositUSDCConfirmationModal = () => {
  const { type, setType, USDC, updateTransactionState } = useModalContext()
  const { currentAccount, dataBlock, currentSigner, chainId } = useWeb3Context()
  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const rolodex = useRolodexContext()

  const [needAllowance, setNeedAllowance] = useState(true)
  const [approvalTxn, setApprovalTxn] = useState<ContractTransaction>()

  const chain = Chains.getInfo(chainId)

  useEffect(() => {
    if (rolodex && USDC.amountToDeposit && rolodex.USDC) {
      rolodex
        .USDC!.allowance(currentAccount, rolodex.addressUSDI)
        .then((initialApproval) => {
          const formattedUSDCAmount = BN(USDC.amountToDeposit).mul(BN('1e6'))
          if (initialApproval.lt(formattedUSDCAmount)) {
            setNeedAllowance(true)
          } else {
            setNeedAllowance(false)
          }
        })
    }
  }, [rolodex, dataBlock, chainId, USDC.amountToDeposit, loadmsg])

  const handleDepositConfirmationRequest = async () => {
    if (rolodex && USDC.amountToDeposit && currentSigner) {
      setLoading(true)
      setLoadmsg(locale('CheckWallet'))
      try {
        const depositTransaction = await depositUSDC(
          USDC.amountToDeposit,
          rolodex,
          currentSigner!
        )

        updateTransactionState(depositTransaction)
        setLoadmsg(locale('TransactionPending'))

        const depositReceipt = await depositTransaction.wait()
        updateTransactionState(depositReceipt)
      } catch (e) {
        const error = e as TransactionReceipt

        updateTransactionState(error)
      }
      setApprovalTxn(undefined)
      setLoading(false)
    }
  }
  const handleApprovalRequest = async () => {
    if (rolodex && USDC.amountToDeposit) {
      let depositAmount = BN(USDC.amountToDeposit)

      const formattedUSDCAmount = depositAmount.mul(BN('1e6'))
      setLoading(true)
      try {
        setLoadmsg(locale('CheckWallet'))
        const txn = await rolodex.USDC?.connect(currentSigner!).approve(
          rolodex.addressUSDI,
          formattedUSDCAmount
        )

        setApprovalTxn(txn)

        setLoadmsg(locale('TransactionPending'))
        await txn?.wait()

        setLoadmsg('')
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
  }

  return (
    <BaseModal
      open={type === ModalType.DepositUSDCConfirmation}
      setOpen={() => {
        setType(null)
      }}
    >
      <Typography variant="body3" color="text.primary">
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
          backgroundColor: 'background.overview',
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            width={36}
            height={36}
            src="images/USDC.svg"
            alt="USDC svg"
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="body3" color="text.primary">
              {'$' +
                Number(USDC.amountToDeposit).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </Typography>
          </Box>
        </Box>

        <ForwardIcon
          sx={{ width: 15, height: 15 }}
          strokecolor={formatColor(neutral.gray3)}
        />

        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="body3" color="text.primary">
              {'$' +
                Number(USDC.amountToDeposit).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </Typography>
          </Box>

          <Box
            component="img"
            width={36}
            height={36}
            src={`images/USDI.svg`}
            alt="USDI"
            marginLeft={3}
          ></Box>
        </Box>
      </Box>

      <Box textAlign="center" mb={5}>
        <Typography
          variant="body3_medium"
          color={formatColor(neutral.gray3)}
          fontStyle="italic"
        >
          1 USDC = 1 USDi ($1)
        </Typography>
      </Box>

      <DisableableModalButton
        text={needAllowance ? 'Set Allowance' : 'Confirm Deposit'}
        disabled={false}
        onClick={
          needAllowance
            ? handleApprovalRequest
            : handleDepositConfirmationRequest
        }
        loading={loading}
        load_text={loadmsg}
      />
      {approvalTxn !== undefined && (
        <MuiLink
          mt={1}
          display="block"
          target="_blank"
          href={`${chain.scanUrl}${approvalTxn.hash}`}
        >
          <Button variant="text">View approval on {chain.scanSite}</Button>
        </MuiLink>
      )}
    </BaseModal>
  )
}
