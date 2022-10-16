import { JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { Rolodex } from '../chain/rolodex/rolodex'
import { ERC20Detailed__factory, Vault__factory } from '../chain/contracts'

export const useWithdrawUSDC = async (
  usdc_amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6)
  try {
    const ge = (
      await rolodex.USDI.connect(signer).estimateGas.withdraw(
        Number(formattedUSDCAmount)
      )
    )
      .mul(100)
      .div(90)
    const withdrawAttempt = await rolodex.USDI.connect(signer).withdraw(
      Number(formattedUSDCAmount),
      { gasLimit: ge }
    )
    const receipt = await withdrawAttempt?.wait()
    return receipt
  } catch (err) {
    console.error(err)
    throw new Error('Could not withdraw')
  }
}

export const useWithdrawCollateral = async (
  amount: string | BigNumber,
  collateral_address: string,
  vault_address: string,
  signer: JsonRpcSigner
) => {
  let decimal = 18

  try {
    if(typeof amount === 'string') {
      decimal = await ERC20Detailed__factory.connect(
        collateral_address,
        signer
      ).decimals()

      amount = utils.parseUnits(amount, decimal)
    }

    const ge = (
      await Vault__factory.connect(
        vault_address,
        signer
      ).estimateGas.withdrawErc20(collateral_address, amount)
    )
      .mul(100)
      .div(90)
    const transferAttempt = await Vault__factory.connect(
      vault_address,
      signer
    ).withdrawErc20(collateral_address, amount, { gasLimit: ge })

    return transferAttempt
  } catch (err) {
    console.error(err)
    throw new Error('Could not deposit')
  }
}
