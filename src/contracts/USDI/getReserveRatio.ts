import { Rolodex } from '../../chain/rolodex/rolodex'
import { BNtoHexNumber } from '../../components/util/helpers/BNtoHex'

export const getReserveRatio = async (rolodex: Rolodex): Promise<string> => {
  try {
    const reserveRatio = await rolodex?.USDI.reserveRatio()

    const formattedReserveRatio = BNtoHexNumber(reserveRatio)

    const toPercentage = formattedReserveRatio / 1e16

    return toPercentage.toLocaleString()
  } catch (err) {
    throw new Error('Could not retrieve reserve ratio')
  }
}
