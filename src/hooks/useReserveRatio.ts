import { Rolodex } from "../chain/rolodex/rolodex";
import { BNtoHex } from "../components/util/helpers/BNtoHex";

export const useReserveRatio = async (rolodex: Rolodex): Promise<string> => {
  try {
    const reserveRatio = await rolodex?.USDI.reserveRatio()
    
    const formattedReserveRatio = BNtoHex(reserveRatio)

    return formattedReserveRatio;
  } catch (err) {
    throw new Error("Could not retrieve reserve ratio");
  }
};
