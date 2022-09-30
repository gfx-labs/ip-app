import { JsonRpcSigner } from '@ethersproject/providers'
import connectIPTDelegateContract from './connectToContract'

export const getPriorVotes = async (
  currentAccount: string,
  startingBlock: number,
  signer: JsonRpcSigner
) => {
  try {
    const IPTDelegateContract = connectIPTDelegateContract(signer)
    return await IPTDelegateContract.getPriorVotes(
      currentAccount,
      startingBlock
    )
  } catch (err) {
    throw new Error('Error getting prior votes')
  }
}