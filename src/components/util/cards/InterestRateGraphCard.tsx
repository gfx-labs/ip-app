import { Box } from '@mui/material'
import { CHART_INTEREST_RATE_OVERTIME } from '../../../constants'
//import getAPIBaseUrl from '../helpers/getAPIBaseUrl'
import { CardContainer } from './CardContainer'
import { ChartContainerCard } from './ChartContainerCard'
import { VITE_ANALYTICS_URL } from '../../../config'

export const InterestRateGraphCard = (props: {url: string}) => {
  const {url} = props
  return (
    <CardContainer>
      <ChartContainerCard
        style={{
          position: 'relative',
          padding: 20,
          height: 650,
          width: '100%',
        }}
        src={url ? `${VITE_ANALYTICS_URL(url)}${CHART_INTEREST_RATE_OVERTIME}` : ''}
      />
    </CardContainer>
  )
}
