import { LIVE_AVERAGE_RATES } from '../../../constants'
import axios from 'axios'
import { VITE_ANALYTICS_URL } from '../../../config'

export interface Averages {
  Borrow: number
  Supply: number
}

const getAverages = async (url: string) => {
  try {
    const averageRateURL = `${VITE_ANALYTICS_URL(url)}${LIVE_AVERAGE_RATES}`
    const response = await axios.get(averageRateURL)
    return response.data as Averages
  } catch (err) {
    const error = err as Error
    //throw new Error(error.message)
  }
}

export default getAverages
