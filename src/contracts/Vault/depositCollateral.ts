import { JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { ERC20Detailed__factory } from '../../contract_abis/factories/_external/index'
import { CappedRebaseToken__factory } from '../../contract_abis/factories/lending/CappedRebase__factory'

export const depositCollateral = async (
  amount: string | BigNumber,
  collateral_address: string,
  signer: JsonRpcSigner,
  vaultAddress: string
) => {
  const contract = ERC20Detailed__factory.connect(collateral_address, signer)
  try {
    const formattedERC20Amount =
      typeof amount === 'string'
        ? utils.parseUnits(amount, await contract.decimals())
        : amount
    // const ge = (
    //   await contract.estimateGas.transfer(vaultAddress!, formattedERC20Amount)
    // )
    //   .mul(100)
    //   .div(85)
    const transferAttempt = await contract.transfer(
      vaultAddress!,
      formattedERC20Amount
      // { gasLimit: ge }
    )

    return transferAttempt
  } catch (err) {
    console.error(err)
    throw new Error('Could not deposit')
  }
}

export const depositRebase = async (
  amount: string | BigNumber,
  address: string,
  vaultId: string,
  signer: JsonRpcSigner,
) => {
  const contract = CappedRebaseToken__factory.connect(address, signer)
  try {
    const formattedAmt =
    typeof amount === 'string'
      ? utils.parseUnits(amount, await contract.decimals())
      : amount
    const transferAttempt = await contract.deposit(formattedAmt, vaultId)
    return transferAttempt
  } catch (err) {
    console.error(err)
    throw new Error('Could not deposit')
  }
}
