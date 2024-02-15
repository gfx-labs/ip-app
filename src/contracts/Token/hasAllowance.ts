import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { Rolodex } from '../../chain/rolodex'
import { getERC20Allowance, getUSDCAllowanceWithRolodex } from './getAllowance'

export const hasUSDCAllowance = async (
  owner: string,
  spender: string,
  amount: string | BigNumber,
  rolodex: Rolodex
) => {
  const allowance = await getUSDCAllowanceWithRolodex(owner, spender, rolodex)
  if (allowance !== undefined) {
    let usdcBN: BigNumber
    if (typeof amount === 'string') {
      usdcBN = utils.parseUnits(amount, 6)
    } else {
      usdcBN = amount
    }

    return allowance.gte(usdcBN)
  }
  return false
}

export const hasTokenAllowance = async (
  owner: string,
  spender: string,
  amount: BigNumber | string,
  token_address: string,
  decimals: number,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
) => {
  const allowance = await getERC20Allowance(
    owner,
    spender,
    token_address,
    signerOrProvider
  )
  let formattedAmount: BigNumber
  if (typeof amount === 'string') {
    formattedAmount = utils.parseUnits(amount, decimals)
  } else {
    formattedAmount = amount
  }
  if (allowance !== undefined) {
    return allowance.gte(formattedAmount)
  }
  return false
}
