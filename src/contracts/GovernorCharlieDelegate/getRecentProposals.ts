import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import connectToGovernorContract from './connectToGovernorContract'

export const getRecentProposals = async (
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  headBlock?: number
) => {
  try {
    console.log('1', {signerOrProvider, headBlock})
    const contract = connectToGovernorContract(signerOrProvider)
    console.log('2', {contract})
    const filters = contract.filters.ProposalCreated()
    console.log('3', {filters})
    const logs = await contract.queryFilter(filters, undefined, headBlock)
    console.log('4', {logs})
    return logs
  } catch (err) { 
    throw new Error('error getting proposals')
  }
}
