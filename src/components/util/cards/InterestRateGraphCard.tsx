import { Box } from '@mui/material'
import { CHART_INTEREST_RATE_OVERTIME } from '../../../constants'
import getAPIBaseUrl from '../helpers/getAPIBaseUrl'
import { ChartContainerCard } from './ChartContainerCard'

export const InterestRateGraphCard = () => {
  return (
    <Box sx={{ backgroundColor: 'smallCard.background', borderRadius: 2.5 }}>
      <ChartContainerCard
        style={{
          position: 'relative',
          padding: 20,
          height: 650,
          width: '100%',
        }}
        src={`${getAPIBaseUrl()}${CHART_INTEREST_RATE_OVERTIME}`}
      />
    </Box>
  )
}
