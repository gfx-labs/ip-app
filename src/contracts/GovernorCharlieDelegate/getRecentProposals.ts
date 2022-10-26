import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import connectToGovernorContract from './connectToGovernorContract'

export const getRecentProposals = async (
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  headBlock?: number
) => {
  try {
    const contract = connectToGovernorContract(signerOrProvider)
    const filters = contract.filters.ProposalCreated()

    const logs = await contract.queryFilter(filters, undefined, headBlock)

    return logs
  } catch (err) {
    throw new Error('error getting proposals')
  }
}
