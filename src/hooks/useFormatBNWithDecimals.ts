import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'

export const useFormatBNWithDecimals = (amount: BigNumber, decimals: number) =>
  useMemo(
    () => Number(utils.formatUnits(amount._hex, decimals)),
    [amount, decimals]
  )

export const useFormatBNtoPreciseStringAndNumber = (
  amount: BigNumber,
  decimals: number
) => {
  const formatted = utils.formatUnits(amount, decimals)

  return {
    str: formatted,
    num: Number(formatted),
    bn: amount,
  }
}
