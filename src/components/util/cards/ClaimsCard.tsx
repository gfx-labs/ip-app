import { Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { ClaimIcon } from '../../icons/misc/ClaimIcon'
import { useMerkleRedeemContext } from '../../providers/MerkleRedeemProvider'
import { utils } from 'ethers'
import { CardContainer } from './CardContainer'
import { ClaimsButton } from '../button'
import { Dots } from '../loading'

export const ClaimsCard = () => {
  const { claimAmount, loading } = useMerkleRedeemContext()

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
            <Typography variant="label_semi" color="text.secondary">
              Total IPT Rewards
            </Typography>
            <Typography
              variant="h7_semi"
              lineHeight={{ xs: 1 }}
              color="text.primary"
            >
              {loading ? <Dots/> : formattedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Box>
        <ClaimsButton />
      </Box>
    </CardContainer>
  )
}
