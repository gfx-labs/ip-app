import { BigNumber, utils } from 'ethers'

export const useFormatBNWithDecimals = (amount: BigNumber, decimals: number) =>
  Number(utils.formatUnits(amount._hex, decimals))
