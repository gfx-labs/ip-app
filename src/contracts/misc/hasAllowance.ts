import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { Rolodex } from '../../chain/rolodex/rolodex'
import { BN } from '../../easy/bn'
import { getERC20Allowance, getUSDCAllowanceWithRolodex } from './getAllowance'

export const hasUSDCAllowance = async (
  owner: string,
  spender: string,
  amount: string,
  rolodex: Rolodex
) => {
  const allowance = await getUSDCAllowanceWithRolodex(owner, spender, rolodex)

  if (allowance !== undefined) {
    const formattedUSDCAmount = BN(amount).mul(BN('1e6'))

    return allowance.gte(formattedUSDCAmount)
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

  if (typeof amount === 'string') {
    amount = BN(amount).mul(BN('1e' + decimals))
  }

  if (allowance !== undefined) {
    return allowance.gte(amount)
  }
  return false
}
