import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { MerkleRedeem__factory } from '../../chain/contracts/factories/IPTsale/MerkleRedeem'
import { MERKLE_REDEEM_ADDRESS } from '../../constants'
import { BN } from '../../easy/bn'
import { getMerkleProof } from './getMerkleProof'


const getSpecificWeekClaim = async (account: string, providerOrSigner: JsonRpcProvider | JsonRpcSigner, week: number) => {
  try {
    const merkleContract = MerkleRedeem__factory.connect(MERKLE_REDEEM_ADDRESS, providerOrSigner)

    const claimStatus = await merkleContract.claimStatus(account, week, week)

    if (claimStatus[0]) {
      return undefined
    }
    const proofResult = getMerkleProof(account, week)
    if (proofResult) {
      return {
        week: week,
        balance: BN(proofResult.minter.amount),
        merkleProof: proofResult.proof,
      }
    }

    return undefined
  } catch (err) {
    console.error(err)
    throw new Error('Error getting claim status')
  }
}

export default getSpecificWeekClaim
