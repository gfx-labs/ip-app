import { utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";
import { BNtoHexString } from "../components/util/helpers/BNtoHex";

export const useTotalSupply = async (rolodex: Rolodex): Promise<string> => {
  try {
    const totalSupply = await rolodex?.USDI?.totalSupply();

    const formattedTotalsupply = BNtoHexString(totalSupply)

    return totalSupply.div(1e9).div(1e9).toString()
  } catch (err) {
    throw new Error("Could not retrieve total supply");
  }
};
