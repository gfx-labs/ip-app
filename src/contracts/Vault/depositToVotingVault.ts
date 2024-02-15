import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { CappedGovToken__factory } from '../../contract_abis/factories/lending/CappedGovToken__factory'
import { CappedMkrToken__factory } from '../../contract_abis/factories/lending/CappedMKRToken__factory'
import { CappedMkrToken } from '../../contract_abis/lending/CappedMkrToken'
import { CappedGovToken } from '../../contract_abis/lending/CappedGovToken'
import { Token } from '../../chain/tokens'

const depositToVotingVault = async (
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  token: Token,
  amount: string | BigNumber
) => {
  try {
    let cappedTokenContract: CappedMkrToken | CappedGovToken
    if (token.ticker == 'MKR') {
      cappedTokenContract = CappedMkrToken__factory.connect(
        token.capped_address!,
        signerOrProvider
      )
    } else {
      cappedTokenContract = CappedGovToken__factory.connect(
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
      //{ gasLimit: ge }
    )

    return depositCapped
  } catch (err) {
    console.log(err)
    throw new Error('Could not deposit')
  }
}

export default depositToVotingVault
