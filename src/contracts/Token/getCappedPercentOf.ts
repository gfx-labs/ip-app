import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { CappedGovToken__factory } from '../../contract_abis/factories/lending/CappedGovToken__factory'

const getCappedPercentOf = async (capped_token_address: string, signerOrProvider: JsonRpcSigner | JsonRpcProvider) => {
  try {
    const cappedTokenContract = CappedGovToken__factory.connect(capped_token_address, signerOrProvider)
    const maximumCap = await cappedTokenContract.getCap()
    const totalSupply = await cappedTokenContract.totalSupply()

    // not mul by 100 first returns 0x00
    return totalSupply.mul(100).div(maximumCap).toNumber()
  } catch (err) {
    console.log(err)
    throw new Error('Could not get capped percent')
  }
}

export default getCappedPercentOf
