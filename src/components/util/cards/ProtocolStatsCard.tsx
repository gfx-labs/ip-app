import { Box, Typography } from '@mui/material'

import { useLight } from '../../../hooks/useLight'
import { formatGradient, gradient, formatColor, neutral } from '../../../theme'
import { SwapContainer } from '../swap'

export const ProtocolStatsCard = () => {
  const isLight = useLight()

  return (
    <Box
      sx={{
        padding: { xs: 3 },
        backgroundColor: 'smallCard.background',
        borderRadius: 2.5,
      }}
    >
      <Box lineHeight={0} mb={3}>
        <Typography variant="label" color={formatColor(neutral.gray3)}>
          Mint or Redeem USDi
        </Typography>
      </Box>
      <SwapContainer />
    </Box>
  )
}
