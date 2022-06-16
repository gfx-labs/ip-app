import { JsonRpcSigner } from '@ethersproject/providers'
import { utils } from 'ethers'
import { ERC20Detailed__factory } from '../../chain/contracts/factories/_external/index'

export const depositCollateral = async (
  amount: string,
  collateral_address: string,
  signer: JsonRpcSigner,
  vaultAddress: string
) => {
  const contract = ERC20Detailed__factory.connect(collateral_address, signer)
  try {
    const formattedERC20Amount = utils.parseUnits(
      amount,
      await contract.decimals()
    )
    const ge = (
      await contract.estimateGas.transfer(vaultAddress!, formattedERC20Amount)
    )
      .mul(100)
      .div(90)
    const transferAttempt = await contract.transfer(
      vaultAddress!,
      formattedERC20Amount,
      { gasLimit: ge }
    )

    return transferAttempt
  } catch (err) {
    console.error(err)
    throw new Error('Could not deposit')
  }
}
