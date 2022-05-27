import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ethers, utils } from "ethers";
import { ERC20Detailed__factory } from "../chain/contracts/factories/_external/index";
import { Rolodex } from "../chain/rolodex/rolodex";
import {BN} from "../easy/bn";
import { useDecimals } from "./useTokenInfo";

export const useDepositUSDC = async (
  usdc_amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6);
  console.log(formattedUSDCAmount, "forms");
  const contract = ERC20Detailed__factory.connect(
    rolodex.addressUSDC!,
    signer
  )
  try {
    // first check approval
    const initialApproval = await contract.allowance(await signer.getAddress(), rolodex.addressUSDI)
    if(initialApproval.lt(formattedUSDCAmount)) {
      const getApproval = await contract.approve(rolodex.addressUSDI, Number(formattedUSDCAmount));
      console.log('24', getApproval)
      await getApproval.wait();
    }
    const depositAttempt = await rolodex.USDI?.connect(signer).deposit(
      Number(formattedUSDCAmount)    );

    console.log('depositAttempte',depositAttempt);
    const receipt = await depositAttempt?.wait();
    console.log('RECIPT', receipt);
    return receipt;
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};

export const useDepositCollateral = async (
  amount: string,
  collateral_address: string,
  signer: JsonRpcSigner,
  vaultAddress: string
) => {
const contract = ERC20Detailed__factory.connect(
      collateral_address,
      signer
    )
  try {
    const formattedERC20Amount = utils.parseUnits(amount, await contract.decimals());

    const transferAttempt = await contract.transfer(vaultAddress!, formattedERC20Amount);

    return transferAttempt
  } catch (err) {
    console.log(err);
    throw new Error("Could not deposit");
  }
};
