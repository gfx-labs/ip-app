import { Rolodex } from "../../../chain/rolodex/rolodex";
import { BNtoHexNumber } from "../../util/helpers/BNtoHex";

export const getVaultBorrowingPower = async (
  vaultID: string,
  rolodex: Rolodex
): Promise<number> => {
  try {
    // get user balance
    const BP = await rolodex.VC?.accountBorrowingPower(vaultID);
    if(BP?._isBigNumber) {
      return BP.div(1e8).div(1e8).toNumber()/100
    }

    return 0
  } catch (err) {
    console.log(err);
    throw new Error("Error getting Borrowing Power");
  }
};

