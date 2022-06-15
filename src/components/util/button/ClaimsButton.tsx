import { Button, Typography, Box } from '@mui/material'
import { useState } from 'react'
import { useLight } from '../../../hooks/useLight'
import { blue, formatColor } from '../../../theme'
import { ClaimIcon } from '../../icons/misc/ClaimIcon'
import { ModalType, useModalContext } from '../../libs/modal-content-provider/ModalContentProvider'

export const ClaimsButton = () => {
  const [claimAmount, setClaimAmount] = useState(0)
  const { setType } = useModalContext()

  const isLight = useLight()

  const claimRewardsHandler = () => {
    setType(ModalType.Claim)
  }

  return (
    <Button
      onClick={claimRewardsHandler}
      variant="cta"
      sx={{
        width: '50%',
        backgroundColor: isLight ? formatColor(blue.blue9) : formatColor(blue.blue13),
        color: isLight ? formatColor(blue.blue1) : formatColor(blue.blue3),
        padding: 2,
        '&:hover': {
          backgroundColor: isLight ? formatColor(blue.blue10) : formatColor(blue.blue14),
          backgroundImage: 'none',
        },
      }}
    >
      <ClaimIcon islight={isLight.toString()} sx={{ width: 18, mr: 1 }} />
      <Typography variant="label" whiteSpace="nowrap">
        {claimAmount.toLocaleString()} IPT
      </Typography>
    </Button>
  )
}
