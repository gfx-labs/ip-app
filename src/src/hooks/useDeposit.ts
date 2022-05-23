import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, utils } from "ethers";
import { IERC20__factory } from "../chain/contracts/factories/genesis/wave.sol";
import { Rolodex } from "../chain/rolodex/rolodex";

export const useDeposit = async (
  usdc_amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6);
  const fee = await signer.getFeeData()
  console.log(formattedUSDCAmount, fee, "forms");


  // const maxFeePerGas = BNtoHex(fee.maxFeePerGas)
  // const maxPriorityFeePerGas = BNtoHex(fee.maxPriorityFeePerGas)
  try {
    await IERC20__factory.connect(rolodex.addressUSDC!, signer).approve(
      rolodex.addressUSDI,
      Number(formattedUSDCAmount)
    );

    const depositAttempt = await rolodex.USDI?.connect(signer).deposit(
      Number(formattedUSDCAmount)
    );

    console.log(depositAttempt);
    const receipt = await depositAttempt?.wait();
    console.log(receipt);
    return receipt;
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};
