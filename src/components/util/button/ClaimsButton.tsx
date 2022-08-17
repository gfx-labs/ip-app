import { Button, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useLight } from '../../../hooks/useLight'
import { blue, formatColor } from '../../../theme'
import { ClaimIcon } from '../../icons/misc/ClaimIcon'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BN } from '../../../easy/bn'
import { useMerkleRedeemContext } from '../../libs/merkle-redeem-provider/MerkleRedeemProvider'
import { BNtoHexNumber } from '../helpers/BNtoHex'
import { utils } from 'ethers'

export const ClaimsButton = () => {
  const { setType } = useModalContext()

  const { claimAmount } = useMerkleRedeemContext()
  const isLight = useLight()

  const claimRewardsHandler = () => {
    setType(ModalType.Claim)
  }

  const [formattedAmount, setFormattedAmount] = useState(0)

  useEffect(() => {
    setFormattedAmount(Number(utils.formatEther(claimAmount)))
  }, [claimAmount])

  return (
    <Button
      onClick={claimRewardsHandler}
      variant="cta"
      sx={{
        width: '50%',
        maxWidth: 150,
        backgroundColor: isLight
          ? formatColor(blue.blue9)
          : formatColor(blue.blue13),
        color: isLight ? formatColor(blue.blue1) : formatColor(blue.blue3),
        padding: 2,
        '&:hover': {
          backgroundColor: isLight
            ? formatColor(blue.blue10)
            : formatColor(blue.blue14),
          backgroundImage: 'none',
        },
      }}
    >
      <ClaimIcon islight={isLight.toString()} sx={{ width: 18, mr: 1 }} />
      <Typography variant="label2" whiteSpace="nowrap">
        {formattedAmount.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}{' '}
        IPT
      </Typography>
    </Button>
  )
}
