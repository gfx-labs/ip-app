import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { InterestProtocolTokenDelegate__factory } from '../../contract_abis'
import { IPT_DELEGATE_ADDRESS } from '../../constants'

const connectIPTDelegateContract = (signerOrProvider: JsonRpcSigner | JsonRpcProvider) => {
  try {
    return InterestProtocolTokenDelegate__factory.connect(IPT_DELEGATE_ADDRESS, signerOrProvider)
  } catch (err) {
    throw new Error('Error getting voting power')
  }
}

export default connectIPTDelegateContract
