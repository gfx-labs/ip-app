import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ContractReceipt, utils } from "ethers";
import { IERC20__factory } from "../chain/contracts/factories/genesis/wave.sol";
import { Rolodex } from "../chain/rolodex/rolodex";

export const useBorrow = async (
  vaultID: number,
  amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDIAmount = utils.parseUnits(amount, 18);
  try {
    const borrowTransaction = await rolodex.VC?.connect(signer).borrowUsdi(
      Number(vaultID),
      formattedUSDIAmount,
      { gasLimit: 800000 }
    );

    return borrowTransaction;
  } catch (err) {
    console.log(err);
    throw new Error("Could not borrow");
  }
};

export const useRepay = async (
  vaultID: number,
  amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDIAmount = utils.parseUnits(amount, 18);
  const contract = rolodex.VC?.connect(signer)!;
  return await contract
    .repayUSDi(Number(vaultID), formattedUSDIAmount)
    .catch((e) => {
      throw new Error("Could not repay:" + e);
    });
};
