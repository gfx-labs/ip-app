import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, BigNumberish } from 'ethers'
import { WavePool__factory } from '../chain/contracts/factories/IPTsale/wavepool.sol'
import { SlowRoll__factory } from '../chain/contracts/factories/IPTsale/slowroll.sol'

export const SLOWROLL_ADDRESS = '0xFbD3060Fe1Ed10c34E236Cee837d82F019cF1D1d'

const getSlowRollContract = (signer: JsonRpcSigner) => {
  return SlowRoll__factory.connect(SLOWROLL_ADDRESS, signer)
}

export const useCommitUSDC = async (
  amount: BigNumber,
  signer: JsonRpcSigner
) => {
  return getSlowRollContract(signer).getPoints(amount)
}


export const getWaveDuration = async (signer: JsonRpcSigner) => {
  return await getSlowRollContract(signer)._waveDuration()
}

export const getAmountIPTForSale = async (signer: JsonRpcSigner) => {
  const soldQuantity = await getSlowRollContract(signer)._soldQuantity()

  const maxQuantity = await getSlowRollContract(signer)._maxQuantity()

  return { maxQuantity, soldQuantity }
}

export const getCurrentPrice = async (signer: JsonRpcSigner) => {
  const currentPrice = await getSlowRollContract(signer).getCurrentPrice()

  return currentPrice
}
