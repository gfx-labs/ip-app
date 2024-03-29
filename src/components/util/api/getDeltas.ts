import { LIVE_DELTAS } from '../../../constants'
import axios from 'axios'
import { VITE_ANALYTICS_URL } from '../../../config'

interface AmountPercent {
  Amount: number
  Percent: string
}

export interface CurrentWithTemporal {
  Current: string
  Day: AmountPercent
  Week: AmountPercent
  Month: AmountPercent
}

export interface Deltas {
  Origin: number
  Liability: CurrentWithTemporal
  TVL: CurrentWithTemporal
  USDi: CurrentWithTemporal
  USDC: CurrentWithTemporal
  Collaterals: {
    [name: string]: CurrentWithTemporal
  }
  TotalCollateral: CurrentWithTemporal
  ReserveRatio: CurrentWithTemporal
  BorrowRate: CurrentWithTemporal
  DepositRate: CurrentWithTemporal
}

const getDeltas = async (url: string) => {
  try {
    const deltaURL = `${VITE_ANALYTICS_URL(url)}${LIVE_DELTAS}`
    const response = await axios.get(deltaURL)
    return response.data as Deltas
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export default getDeltas
