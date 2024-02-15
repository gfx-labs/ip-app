import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { log, trace } from '../../easy/log'
import { Contract } from 'ethers'
import { MerkleRedeem__factory } from '../../contract_abis/factories/IPTsale/MerkleRedeem'
import { MERKLE_REDEEM_ADDRESS } from '../../constants'

const ZERO_ADDRESS =
  '0x0000000000000000000000000000000000000000000000000000000000000000'

const getLatestWeek = async (merkleContract: Contract) => {
  let i = 7
  let lookingForLatestWeek = true
  do {
    let weekMerkleRoots = await merkleContract.weekMerkleRoots(i)
    lookingForLatestWeek = weekMerkleRoots !== ZERO_ADDRESS
    if (!lookingForLatestWeek) {
      // return previous week that wasnt ZERO_ADDRESS
      return --i
    }
    i++
  } while (lookingForLatestWeek || i < 2520)

  // defaults to returning first week
  return 7
}

const getClaimStatusOf = async (
  account: string,
  providerOrSigner: JsonRpcProvider | JsonRpcSigner
):Promise<number[]> => {
  try {
    const merkleContract = MerkleRedeem__factory.connect(
      MERKLE_REDEEM_ADDRESS,
      providerOrSigner
    )

    log.trace("attempting to get claim status", account)
    const latestWeek = await getLatestWeek(merkleContract)
    const claimStatus = await merkleContract.claimStatus(account, 7, latestWeek)
    let idx = 7
    const weeks = []
    for(let i = 0; i < claimStatus.length; i++) {
      if(claimStatus[i] === false) {
        weeks.push(idx)
      }
      idx = idx + 1
    }
    log.trace("claim status", account, claimStatus, weeks)

    return weeks
  } catch (err) {
    log.warn("getting status", err)
    throw new Error('Error getting claim status')
  }
}

export default getClaimStatusOf
