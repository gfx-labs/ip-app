import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";

export const useWithdrawUSDC = async (
  usdc_amount: string,
  rolodex: Rolodex,
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6);

  try {
    const withdrawAttempt = await rolodex.USDI.withdraw(
      Number(formattedUSDCAmount)
    );

    const receipt = await withdrawAttempt?.wait();
    
    console.log(receipt);
    return receipt;
  } catch (err) {
    console.log(err);
    throw new Error("Could not withdraw");
  }
};
