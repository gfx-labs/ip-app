import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { CappedBptToken__factory } from '../../chain/contracts/factories/lending/CappedBptToken__factory'
import { CappedBptToken } from '../../chain/contracts/lending/CappedBptToken'
import { CappedERC4626 } from '../../chain/contracts/lending/CappedERC4626'
import { CappedERC4626__factory } from '../../chain/contracts/factories/lending/CappedERC4626__factory'
import { Token } from '../../chain/tokens'

const depositToBptVault = async (
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  token: Token,
  amount: string | BigNumber,
  stake: boolean,
) => {
  let cappedTokenContract: CappedBptToken | CappedERC4626
  try {
    if (token.can_wrap) {
      cappedTokenContract = CappedERC4626__factory.connect(token.capped_address!, signerOrProvider)
      cappedTokenContract
    } else {
      cappedTokenContract = CappedBptToken__factory.connect(
        token.capped_address!,
        signerOrProvider
      )
    }

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
