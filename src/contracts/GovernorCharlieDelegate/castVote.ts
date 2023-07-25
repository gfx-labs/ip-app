import { JsonRpcSigner } from '@ethersproject/providers'
import connectToGovernorContract from './connectToGovernorContract'

export const castVote = async (
  id: string,
  vote: number,
  signer: JsonRpcSigner
) => {
  try {
    const contract = connectToGovernorContract(signer)
    const eg = (await contract.estimateGas.castVote(id, vote)).mul(5).div(4)
    return contract.castVote(id, vote, {gasLimit: eg})
  } catch (err) {
    console.error(err)
    throw new Error('Could not cast vote')
  }
}
