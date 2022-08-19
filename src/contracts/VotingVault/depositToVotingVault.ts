import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { utils } from 'ethers'
import { CappedGovToken__factory } from '../../chain/contracts/factories/lending/CappedGovToken__factory'
import { Token } from '../../chain/tokens'

const depositToVotingVault = async (
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  token: Token,
  amount: string
) => {
  try {
    const cappedTokenContract = CappedGovToken__factory.connect(
      token.capped_address!,
      signerOrProvider
    )

    const decimals = await cappedTokenContract.decimals()

    const formattedAmount = utils.parseUnits(amount, decimals)

    // const ge = (
    //   await cappedTokenContract.estimateGas.transfer(
    //     token.capped_address!,
    //     formattedAmount
    //   )
    // )
    //   .mul(100)
    //   .div(80)

    const depositCapped = await cappedTokenContract.deposit(
      formattedAmount,
      Number(id)
      // { gasLimit: ge }
    )

    return depositCapped
  } catch (err) {
    console.log(err)
    throw new Error('Could not deposit')
  }
}

export default depositToVotingVault
