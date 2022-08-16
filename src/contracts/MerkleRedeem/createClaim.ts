import { BigNumber, utils } from 'ethers'
import { getMerkleProof } from './getMerkleProof'

export interface Claim {
  week: number
  balance: BigNumber
  merkleProof: string[]
}

const createClaimOf = (account: string, claimStatus: boolean[]) => {
  // @ts-ignore
  const claims: Claim[] = claimStatus.reduce((acc, claim, week) => {
    if (claim) {
      return acc
    }

    const proofResult = getMerkleProof(account, week)

    if (!proofResult) {
      return acc
    }

    return {
      week,
      balance: utils.parseEther(
        proofResult.minter.amount.toFixed(18).toString()
      ),
      proof: proofResult.proof,
    }
  }, [] as Claim[])

  return claims
}

export default createClaimOf
