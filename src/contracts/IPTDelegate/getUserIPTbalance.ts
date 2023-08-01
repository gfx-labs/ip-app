import {JsonRpcProvider, JsonRpcSigner} from '@ethersproject/providers'
import connectIPTDelegateContract from './connectToContract'

export const getUserIPTBalance = async (
  currentAccount: string,
  signer: JsonRpcSigner | JsonRpcProvider
) => {
  try {
    const IPTDelegateContract = connectIPTDelegateContract(signer)
    return await IPTDelegateContract.balanceOf(currentAccount)
  } catch (err) {
    throw new Error('Error getting voting power')
  }
}
