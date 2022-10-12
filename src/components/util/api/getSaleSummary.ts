import { DEFAULT_BASE_URL, SALE_SUMMARY } from '../../../constants'
import getAPIBaseUrl from '../helpers/getAPIBaseUrl'
import axios from 'axios'

export interface SaleSummary {
  IPTSold: number
  USDCRaised: number
  AveragePrice: number
  Buyers: number
}

const getSaleSummary = async () => {
  try {
    const saleSummaryUrl = `${DEFAULT_BASE_URL}${SALE_SUMMARY}`

    const response = await axios.get(saleSummaryUrl)
    return response.data as SaleSummary
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export default getSaleSummary
