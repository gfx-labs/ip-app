import { BigNumber, utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useRolodexContext } from "../components/libs/rolodex-data-provider/rolodexDataProvider";

export const useTotalSupply = async (rolodex: Rolodex) => {
  try {
    const totalSupply = await rolodex?.USDI?.totalSupply();

    const totalsupply = BigNumber.from(totalSupply?._hex).toString();

    return utils.formatEther(totalsupply);
  } catch (err) {
    throw new Error("Could not retrieve total supply");
  }
};
