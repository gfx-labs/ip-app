import { Rolodex } from "../../../chain/rolodex/rolodex";
import {BN} from "../../../easy/bn";
import { BNtoHexNumber } from "../../util/helpers/BNtoHex";

export const getVaultBorrowingPower = async (
  vaultID: string,
  rolodex: Rolodex
): Promise<number> => {
  try {
    // get user balance
    console.log("asking for bp of vault", vaultID, rolodex.VC!.address)
    const BP = await rolodex.VC?.vaultBorrowingPower(vaultID);
    if(BP?._isBigNumber) {
      return BP.div(BN("1e16")).toNumber()/100
    }
    return 0
  } catch (err) {
    console.log(err);
    throw new Error("Error getting Borrowing Power");
  }
};

