import { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";
import { WavePool__factory } from "../chain/contracts/factories/IPTsale/wavepool.sol";

export const WAVEPOOL_ADDRESS = "0x0078f8795Ba94FCc90c6553E6Cb4674F48DD3a5A";

const getWavePoolContract = (signer: JsonRpcSigner) => {
  return WavePool__factory.connect(WAVEPOOL_ADDRESS, signer);
};

export const useCommitUSDC = async (
  amount: BigNumber,
  signer: JsonRpcSigner,
  wave: number,
  key: BigNumberish,
  proof: string[]
) => {
  return getWavePoolContract(signer).getPoints(wave, amount, key, proof);
};

export const useClaimIPT = async (signer: JsonRpcSigner, wave: number) => {
  return getWavePoolContract(signer).redeem(wave);
};

export const useDisableTime = async (signer: JsonRpcSigner) => {
  return await getWavePoolContract(signer)._claimTime();
};

export const getAccountRedeemedCurrentWave = async (signer: JsonRpcSigner, currentAccount: string, wave: number ) => {
  const claimInfo = await getWavePoolContract(signer)._data(wave, currentAccount)

  return claimInfo[1]
}

export const getTotalClaimed = async (signer: JsonRpcSigner) => {
  return await getWavePoolContract(signer)._totalClaimed();
};
