import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { MerkleRedeem__factory } from '../../chain/contracts/factories/IPTsale/MerkleRedeem'
import { MERKLE_REDEEM_ADDRESS } from '../../constants'
import createClaimOf from './createClaim'
import { getMerkleProof } from './getMerkleProof'

const getClaimOf155 = async (
  account: string,
  providerOrSigner: JsonRpcProvider | JsonRpcSigner
) => {
  try {
    const merkleContract = MerkleRedeem__factory.connect(
      MERKLE_REDEEM_ADDRESS,
      providerOrSigner
    )

    const claimStatus = await merkleContract.claimStatus(account, 155, 155)

    if (!claimStatus[0]) {
      return undefined
    }
    const proofResult = getMerkleProof(account, 155)

    if (proofResult) {
      return {
        week: 155,
        balance: proofResult.minter.amount,
        merkleProof: proofResult.proof,
      }
    }

    return undefined
  } catch (err) {
    console.error(err)
    throw new Error('Error getting claim status')
  }
}

export default getClaimOf155
