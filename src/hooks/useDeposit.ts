import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useRolodexContext } from "../components/libs/rolodex-data-provider/rolodexDataProvider";

export const useDeposit = async (
  rolodex: Rolodex,
  provider: JsonRpcProvider,
  usdc_amount: number
) => {
  const signer = provider.getSigner();

  try {
    const depositAttempt = await rolodex.USDI?.deposit(
      usdc_amount, { gasLimit: 250000}
    )

    const receipt = await depositAttempt?.wait()

    return receipt
    
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};
