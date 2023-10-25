import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { CappedBptToken__factory } from '../../chain/contracts/factories/lending/CappedBptToken__factory'
import { Token } from '../../types/token'

const depositToBptVault = async (
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  token: Token,
  amount: string | BigNumber,
  stake: boolean,
) => {
  try {
    const cappedTokenContract = CappedBptToken__factory.connect(
      token.capped_address!,
      signerOrProvider
    )

    let formattedAmount: BigNumber
    if (typeof amount === 'string') {
      const decimals = await cappedTokenContract.decimals()
      formattedAmount = utils.parseUnits(amount, decimals)
    } else {
      formattedAmount = amount
    }

    // const ge = (
    //   await cappedTokenContract.estimateGas.deposit(formattedAmount, Number(id))
    // )
    //   .mul(100)
    //   .div(80)

    const depositCapped = await cappedTokenContract.deposit(
      formattedAmount,
      Number(id),
      stake
      //{ gasLimit: ge }
    )

    return depositCapped
  } catch (err) {
    console.log(err)
    throw new Error('Could not deposit')
  }
}

export default depositToBptVault
