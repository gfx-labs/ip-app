import { BigNumber, utils } from 'ethers'
import { getMerkleProof } from './getMerkleProof'

export interface Claim {
  week: number
  balance: string
  merkleProof: string[]
}

const createClaimOf = (account: string, claimStatus: boolean[]) => {
  // @ts-ignore
  const claims: Claim[] = claimStatus.reduce((acc, claim, index) => {
    const week = index + 7
    if (claim) {
      return acc
    }
    console.log(acc, claim, week, account, '17')
    const proofResult = getMerkleProof(account, week)
    console.log(proofResult)
    if (!proofResult) {
      return acc
    }
    acc.push({
      week,
      balance: proofResult.minter.amount,
      merkleProof: proofResult.proof,
    })

    return acc
  }, [] as Claim[])

  return claims
}

export default createClaimOf
