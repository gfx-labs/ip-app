import { Rolodex } from "../chain/rolodex/rolodex";
import { BNtoHexString } from "../components/util/helpers/BNtoHex";

export const useReserveRatio = async (rolodex: Rolodex): Promise<string> => {
  try {
    const reserveRatio = await rolodex?.USDI.reserveRatio()

    const formattedReserveRatio = BNtoHexString(reserveRatio)
    
    const toPercentage = Number(formattedReserveRatio) / 10000000000000000

    return toPercentage.toLocaleString()

  } catch (err) {
    throw new Error("Could not retrieve reserve ratio");
  }
};
