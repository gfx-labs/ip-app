import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { MerkleRedeem__factory } from '../../chain/contracts/factories/IPTsale/MerkleRedeem'
import { MERKLE_REDEEM_ADDRESS } from '../../constants'

const ZERO_ADDRESS =
  '0x0000000000000000000000000000000000000000000000000000000000000000'

const getLatestWeek = async (merkleContract: Contract) => {
  let i = 0
  let lookingForLatestWeek = true

  do {
    const weekMerkleRoots = await merkleContract.weekMerkleRoots(i)

    lookingForLatestWeek = weekMerkleRoots === ZERO_ADDRESS

    return --i
  } while (lookingForLatestWeek)
}

const getClaimStatusOf = async (
  account: string,
  providerOrSigner: JsonRpcProvider | JsonRpcSigner
) => {
  const merkleContract = MerkleRedeem__factory.connect(
    MERKLE_REDEEM_ADDRESS,
    providerOrSigner
  )

  const latestWeek = await getLatestWeek(merkleContract)

  const claimStatus = await merkleContract.claimStatus(account, 0, latestWeek)

  return claimStatus
}

export default getClaimStatusOf
