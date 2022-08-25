import { Box, Typography, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { formatColor, neutral } from '../../../theme'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { DecimalInput } from '../textFields'
import { useLight } from '../../../hooks/useLight'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { useMerkleRedeemContext } from '../../libs/merkle-redeem-provider/MerkleRedeemProvider'
import { BNtoHexNumber } from '../helpers/BNtoHex'
import claimWeeks from '../../../contracts/MerkleRedeem/claimWeeks'
import { TransactionReceipt } from '@ethersproject/providers'
import { utils } from 'ethers'

export const ClaimModal = () => {
  const { type, setType, updateTransactionState } = useModalContext()
  const { currentAccount, currentSigner } = useWeb3Context()
  const { claimAmount, claims } = useMerkleRedeemContext()
  const isLight = useLight()

  const [formattedAmount, setFormattedAmount] = useState(0)

  useEffect(() => {
    setFormattedAmount(Number(utils.formatEther(claimAmount)))
  }, [claimAmount])

  const handleClaimRequest = async () => {
    try {
      const claimTransaction = await claimWeeks(
        currentAccount,
        claims,
        currentSigner!
      )

      updateTransactionState(claimTransaction)

      const claimRecipt = await claimTransaction.wait()

      updateTransactionState(claimRecipt)
    } catch (e) {
      const error = e as TransactionReceipt

      updateTransactionState(error)
    }
  }

  return (
    <BaseModal
      open={type === ModalType.Claim}
      setOpen={() => {
        setType(null)
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <Box
          component="img"
          width={80}
          height={80}
          src={`images/ipt_${isLight ? 'blue' : 'white'}.svg`}
          alt="IPT"
        ></Box>
        <Box>
          <Typography variant="body2" color={formatColor(neutral.gray3)}>
            Unclaimed Rewards
          </Typography>
          <Typography variant="h5" color="text.primary" mb={1}>
            {formattedAmount.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{' '}
            IPT
          </Typography>
        </Box>
      </Box>

      <Box>
        <Button
          variant="contained"
          sx={{ color: formatColor(neutral.white), marginY: 2 }}
          onClick={handleClaimRequest}
          disabled={formattedAmount <= 0}
        >
          Claim
        </Button>
      </Box>
    </BaseModal>
  )
}
