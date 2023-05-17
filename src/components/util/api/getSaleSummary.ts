import { SALE_SUMMARY } from '../../../constants'
import axios from 'axios'
import { VITE_ANALYTICS_URL } from '../../../config'

export interface SaleSummary {
  IPTSold: number
  USDCRaised: number
  AveragePrice: number
  Buyers: number
}

const getSaleSummary = async () => {
  try {
    const saleSummaryUrl = `${VITE_ANALYTICS_URL()}${SALE_SUMMARY}`

    const response = await axios.get(saleSummaryUrl)
    return response.data as SaleSummary
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export default getSaleSummary
