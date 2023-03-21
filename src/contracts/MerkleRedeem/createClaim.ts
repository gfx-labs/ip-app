import { BigNumber, utils } from 'ethers'
import { BN } from '../../easy/bn'
import { log } from '../../easy/log'
import { getMerkleProof } from './getMerkleProof'

export interface Claim {
  week: number
  balance: BigNumber
  merkleProof: string[]
}

const createClaimOf = (account: string, claimStatus: number[]):Claim[] => {
  const claims = claimStatus.map((week)=>{
    const proofResult = getMerkleProof(account, week)
    if (!proofResult) {
      return undefined
    }
    return {
      week,
      balance: BN(proofResult.minter.amount),
      merkleProof: proofResult.proof,
    }
  }).filter(x=>x!=undefined)
  log.trace("got claims:", claims)
  return claims as Claim[]
}

export default createClaimOf
