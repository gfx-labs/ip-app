import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { MerkleRedeem__factory } from '../../chain/contracts/factories/IPTsale/MerkleRedeem'
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
  } while (lookingForLatestWeek || i < 520)

  // defaults to returning first week
  return 7
}

const getClaimStatusOf = async (
  account: string,
  providerOrSigner: JsonRpcProvider | JsonRpcSigner
) => {
  try {
    const merkleContract = MerkleRedeem__factory.connect(
      MERKLE_REDEEM_ADDRESS,
      providerOrSigner
    )

    const latestWeek = await getLatestWeek(merkleContract)

    const claimStatus = await merkleContract.claimStatus(account, 7, latestWeek)

    return claimStatus
  } catch (err) {
    throw new Error('Error getting claim status')
  }
}

export default getClaimStatusOf