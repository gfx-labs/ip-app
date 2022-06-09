import { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";
import {WavePool__factory} from "../chain/contracts/factories/IPTsale/wavepool.sol";


const WAVEPOOL_ADDRESS = '0x0078f8795Ba94FCc90c6553E6Cb4674F48DD3a5A'

export const useCommitUSDC = async (
  amount: BigNumber,
  signer: JsonRpcSigner,
  wave: number,
  key: BigNumberish,
  proof: string[]
) => {

  return WavePool__factory.connect(
    WAVEPOOL_ADDRESS,
    signer!).getPoints(
    wave,
    amount,
    key,
    proof,
  );
};

export const useClaimIPT = async (signer: JsonRpcSigner, wave: number) => {
  return WavePool__factory.connect(
    WAVEPOOL_ADDRESS,
    signer!).redeem(
    wave
  );
}

export const useDisableTime = async (signer: JsonRpcSigner) => {
  return await WavePool__factory.connect(
    WAVEPOOL_ADDRESS,
    signer!)._claimTime()
}