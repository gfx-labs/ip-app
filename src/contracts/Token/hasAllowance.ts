import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { Rolodex } from '../../chain/rolodex'
import { Token } from '../../chain/tokens'
import { ERC20Detailed__factory } from '../../contract_abis/factories/_external/ERC20Detailed__factory'

export const hasUSDCAllowance = async (
  owner: string,
  spender: string,
  amount: string | BigNumber,
  rolodex: Rolodex
) => {
  const allowance = await rolodex.USDC?.allowance(owner, spender)
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
  amount: BigNumber | string,
  token: Token,
  provider: JsonRpcProvider
) => {
  const contract = ERC20Detailed__factory.connect(
    token.address,
    provider
  )
  const allowance = await contract.allowance(owner, token.capped_address!)
  let formattedAmount: BigNumber
  if (typeof amount === 'string') {
    formattedAmount = utils.parseUnits(amount, token.decimals)
  } else {
    formattedAmount = amount
  }
  if (allowance !== undefined) {
    return allowance.gte(formattedAmount)
  }
  return false
}
