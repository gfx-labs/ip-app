import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { SlowRoll__factory } from '../chain/contracts/factories/IPTsale/slowroll.sol'
import { SLOWROLL_ADDRESS } from '../constants'

export type sop = JsonRpcSigner | JsonRpcProvider

const getSlowRollContract = (signer: sop) => {
  return SlowRoll__factory.connect(SLOWROLL_ADDRESS, signer)
}

export const commitUSDC = async (amount: BigNumber, signer: JsonRpcSigner) => {
  return getSlowRollContract(signer).getPoints(amount)
}

export const getBasePrice = async (signer: sop): Promise<number> => {
  return (await getSlowRollContract(signer)._startPrice()).toNumber() / 1000000
}
export const getEndTime = async (signer: sop) => {
  return await getSlowRollContract(signer)._endTime()
}

export const getAmountIPTForSale = async (signer: sop) => {
  const slowRollContract = getSlowRollContract(signer)

  const soldQuantity = await slowRollContract._soldQuantity()

  const maxQuantity = await slowRollContract._maxQuantity()

  return { maxQuantity, soldQuantity }
}

export const getCurrentPrice = async (signer: sop) => {
  const currentPrice = await getSlowRollContract(signer).getCurrentPrice()

  return currentPrice
}
