import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import connectToGovernorContract from './connectToGovernorContract'


export const getProposalIsOptimisitc = async (
    userAddress: string,
    signerOrProvider: JsonRpcProvider | JsonRpcSigner
  ): Promise<any
  > => {
    return await connectToGovernorContract(signerOrProvider).isWhitelisted(userAddress)
  }
  