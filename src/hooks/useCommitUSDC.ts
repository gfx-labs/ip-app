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
  return Wave__factory.connect("0x786cb85de17ad952B9b4b888A0e5187a05EF1FD2", signer!).getPoints(
    wave,
    amount,
    proof
  );
};
