import { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";
import { Wave__factory } from "../chain/contracts";
import {WavePool__factory} from "../chain/contracts/factories/IPTsale/wavepool.sol";
import { BN } from "../easy/bn";

export const useCommitUSDC = async (
  amount: BigNumber,
  signer: JsonRpcSigner,
  wave: number,
  key: BigNumberish,
  proof: string[]
) => {

  return WavePool__factory.connect(
    "0x0078f8795Ba94FCc90c6553E6Cb4674F48DD3a5A",
    signer!).getPoints(
    wave,
    amount,
    key,
    proof,
  );
};
