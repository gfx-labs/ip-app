import { Box, Typography } from '@mui/material'
import { SwapContainer } from '../swap'
import { CardContainer } from './CardContainer'

export const ProtocolStatsCard = () => {
  return (
    <CardContainer>
      <Box
        sx={{
          padding: { xs: 3 },
        }}
      >
        <Box lineHeight={0} mb={3}>
          <Typography variant="body1" color="text.primary">
            Mint or Redeem USDi
          </Typography>
        </Box>
        <SwapContainer />
      </Box>
    </CardContainer>
  )
}
