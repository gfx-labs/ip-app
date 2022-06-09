import { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { Wave__factory } from "../chain/contracts";
import { BN } from "../easy/bn";

export const useCommitUSDC = async (
  amount: BigNumber,
  signer: JsonRpcSigner,
  wave: number,
  proof: string[]
) => {
  return Wave__factory.connect("0xWaveAddressHERE", signer!).getPoints(
    wave,
    amount,
    proof
  );
};
