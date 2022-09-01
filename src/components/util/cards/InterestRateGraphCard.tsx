import { Box } from '@mui/material'
import {
  CHART_INTEREST_RATE_OVERTIME,
  DEFAULT_BASE_URL,
} from '../../../constants'
import { ChartContainerCard } from './ChartContainerCard'

const getAPIBaseUrl = () => {
  const envURL: string | undefined = import.meta.env.VITE_ANALYTICS_URL

  if (envURL === '' || envURL === undefined) {
    return DEFAULT_BASE_URL
  }
  return envURL
}

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
