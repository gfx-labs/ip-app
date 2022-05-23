import { utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";
import { BNtoHex } from "../components/util/helpers/BNtoHex";

export const useTotalSupply = async (rolodex: Rolodex): Promise<string> => {
  try {
    const totalSupply = await rolodex?.USDI?.totalSupply();
    
    const formattedTotalsupply = BNtoHex(totalSupply)

    return utils.formatEther(formattedTotalsupply);
  } catch (err) {
    throw new Error("Could not retrieve total supply");
  }
};
