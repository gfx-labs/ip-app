import { JsonRpcSigner } from '@ethersproject/providers'
import connectIPTDelegateContract from './connectToContract'

export const getUserVotingPower = async (
  currentAccount: string,
  signer: JsonRpcSigner
) => {
  try {
    console.log('1.1')
    const IPTDelegateContract = connectIPTDelegateContract(signer)
console.log('1.2', {IPTDelegateContract})
    return await IPTDelegateContract.getCurrentVotes(currentAccount)
  } catch (err) {
    throw new Error('Error getting voting power')
  }
}
