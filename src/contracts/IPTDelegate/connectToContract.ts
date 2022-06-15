import { JsonRpcSigner } from '@ethersproject/providers'
import { InterestProtocolTokenDelegate__factory } from '../../chain/contracts'

const IPT_DELEGATE_ADDRESS = '0xe8504e3b854940818c8f3d61dc155fa9919dd10f'

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
