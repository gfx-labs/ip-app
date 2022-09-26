import { Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { ClaimIcon } from '../../icons/misc/ClaimIcon'
import { useModalContext } from '../../libs/modal-content-provider/ModalContentProvider'
import { useMerkleRedeemContext } from '../../libs/merkle-redeem-provider/MerkleRedeemProvider'
import { utils } from 'ethers'
import { CardContainer } from './CardContainer'
import { ClaimsButton } from '../button'

export const ClaimsCard = () => {
  const { claimAmount } = useMerkleRedeemContext()

  const [formattedAmount, setFormattedAmount] = useState(0)

  useEffect(() => {
    setFormattedAmount(Number(utils.formatEther(claimAmount)))
  }, [claimAmount])

  return (
    <CardContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        py={{ xs: 2, lg: 3 }}
        px={{ xs: 2, lg: 4 }}
        flexDirection={{ xs: 'column', lg: 'row' }}
      >
        <Box display="flex" alignItems="center" mb={{ xs: 3, lg: 0 }}>
          <ClaimIcon
            sx={{
              width: 36,
              height: 36,
            }}
          />
          <Box
            sx={{ display: 'flex', flexDirection: 'column', ml: 2, rowGap: 0 }}
          >
            <Typography
              variant="body2_semi"
              color="text.secondary"
              lineHeight={{ xs: 1 }}
            >
              Total IPT Rewards
            </Typography>
            <Typography
              variant="h7_semi"
              lineHeight={{ xs: 1 }}
              color="text.primary"
            >
              {formattedAmount}
            </Typography>
          </Box>
        </Box>
        <ClaimsButton />
      </Box>
    </CardContainer>
  )
}
