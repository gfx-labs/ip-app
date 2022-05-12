import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useRolodexContext } from "../components/libs/rolodex-data-provider/rolodexDataProvider";

export const useSigner = async (
  provider: JsonRpcProvider,
  address: string
): Promise<JsonRpcSigner> => {
  const signer = provider.getSigner();

  try {
    // const depositAttempt = await rolodex.USDI?.connect(signer).deposit(
    //   usdc_amount, { gasLimit: 250000}
    // )

    // console.log(depositAttempt);
    // return depositAttempt;
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};
