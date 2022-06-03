import { JsonRpcSigner } from "@ethersproject/providers";
import { utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";
import { Vault__factory } from "../chain/contracts";

export const useWithdrawUSDC = async (
  usdc_amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6);

  try {
    const withdrawAttempt = await rolodex.USDI.connect(signer).withdraw(
      Number(formattedUSDCAmount)
    );
    const receipt = await withdrawAttempt?.wait();
    return receipt;
  } catch (err) {
    console.error(err);
    throw new Error("Could not withdraw");
  }
};

export const useWithdrawCollateral = async (
  amount: string,
  collateral_address: string,
  vault_address: string,
  signer: JsonRpcSigner
) => {
  const formattedERC20Amount = utils.parseUnits(amount, 18);

  try {
    const transferAttempt = await Vault__factory.connect(
      vault_address,
      signer
    ).withdrawErc20(collateral_address, formattedERC20Amount);

    return transferAttempt;
  } catch (err) {
    console.error(err);
    throw new Error("Could not deposit");
  }
};
