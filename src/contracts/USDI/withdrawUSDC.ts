import { JsonRpcSigner } from '@ethersproject/providers'
import { utils } from 'ethers'
import { Rolodex } from '../../chain/rolodex/rolodex'

export const withdrawUSDC = async (
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

    return withdrawAttempt
  } catch (err) {
    console.error(err)
    throw new Error('Could not withdraw')
  }
}
