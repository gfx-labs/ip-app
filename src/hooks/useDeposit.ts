import { JsonRpcSigner } from '@ethersproject/providers'
import { utils } from 'ethers'
import { Rolodex } from '../chain/rolodex/rolodex'

export const useDepositUSDC = async (
  usdc_amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
) => {
  const formattedUSDCAmount = utils.parseUnits(usdc_amount, 6)

  try {
    // first check approval
    const initialApproval = await rolodex.USDC?.allowance(
      await signer.getAddress(),
      rolodex.addressUSDI
    )
    if (initialApproval && initialApproval.lt(formattedUSDCAmount)) {
      const getApproval = await rolodex.USDC?.approve(
        rolodex.addressUSDI,
        Number(formattedUSDCAmount)
      )
      await getApproval?.wait()
    }

    const ge = (
      await rolodex.USDI?.connect(signer).estimateGas.deposit(
        Number(formattedUSDCAmount)
      )
    )
      .mul(100)
      .div(90)
    const depositAttempt = await rolodex.USDI?.connect(signer).deposit(
      Number(formattedUSDCAmount),
      { gasLimit: ge }
    )

    const receipt = await depositAttempt?.wait()
    return receipt
  } catch (err) {
    console.error(err)
    throw new Error('Could not deposit')
  }
}
