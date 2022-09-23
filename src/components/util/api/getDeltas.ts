import { DEFAULT_BASE_URL, LIVE_DELTAS } from '../../../constants'
import getAPIBaseUrl from '../helpers/getAPIBaseUrl'
import axios from 'axios'

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

const getDeltas = async () => {
  try {
    const deltaURL = `${DEFAULT_BASE_URL}${LIVE_DELTAS}`

    const response = await axios.get(deltaURL)

    return response.data as Deltas
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export default getDeltas
