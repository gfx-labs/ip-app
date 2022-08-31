import { JsonRpcSigner } from '@ethersproject/providers'
import { InterestProtocolTokenDelegate__factory } from '../../chain/contracts'
import { IPT_DELEGATE_ADDRESS } from '../../constants'

const connectIPTDelegateContract = (signer: JsonRpcSigner) => {
  try {
    return InterestProtocolTokenDelegate__factory.connect(
      IPT_DELEGATE_ADDRESS,
      signer
    )
  } catch (err) {
    throw new Error('Error getting voting power')
  }
}

export default connectIPTDelegateContract
