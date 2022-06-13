import { JsonRpcSigner } from "@ethersproject/providers";
import { utils } from "ethers";
import { ERC20Detailed__factory } from "../chain/contracts/factories/_external/index";
import { Rolodex } from "../chain/rolodex/rolodex";

export const useDepositUSDC = async (
  usdc_amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6);
  const contract = ERC20Detailed__factory.connect(rolodex.addressUSDC!, signer);
  try {
    // first check approval
    const initialApproval = await contract.allowance(
      await signer.getAddress(),
      rolodex.addressUSDI
    );
    if (initialApproval.lt(formattedUSDCAmount)) {
      const getApproval = await contract.approve(
        rolodex.addressUSDI,
        Number(formattedUSDCAmount)
      );
      await getApproval.wait();
    }

    const ge = (await rolodex.USDI?.
                connect(signer).
                estimateGas.
                deposit(Number(formattedUSDCAmount))
               ).mul(100).div(90)
    const depositAttempt = await rolodex.USDI?.connect(signer).deposit(
      Number(formattedUSDCAmount),
      {gasLimit: ge}
    );

    const receipt = await depositAttempt?.wait();
    return receipt;
  } catch (err) {
    console.error(err);
    throw new Error("Could not deposit");
  }
};

export const useDepositCollateral = async (
  amount: string,
  collateral_address: string,
  signer: JsonRpcSigner,
  vaultAddress: string
) => {
  const contract = ERC20Detailed__factory.connect(collateral_address, signer);
  try {
    const formattedERC20Amount = utils.parseUnits(
      amount,
      await contract.decimals()
    );
    const ge = (await contract.estimateGas.transfer(
      vaultAddress!,
      formattedERC20Amount
    )).mul(100).div(90)
    const transferAttempt = await contract.transfer(
      vaultAddress!,
      formattedERC20Amount,
      {gasLimit: ge}
    );

    return transferAttempt;
  } catch (err) {
    console.error(err);
    throw new Error("Could not deposit");
  }
};
