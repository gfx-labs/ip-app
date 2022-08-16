import MerkleTree from 'merkletreejs'
import { keccak256, solidityKeccak256 } from 'ethers/lib/utils'
import { BN } from '../../easy/bn'
import { BigNumberish, utils } from 'ethers'

interface LiquidityProvider {
  minter: string
  amount: number
}

const week0 = [
  {
    minter: '0x7Bd82d87F75dC36F47e3508b6F8e77cA63b16e75', //LP1
    amount: 0.147856821456977451,
  },
  {
    minter: '0x060a24A6C7a493D2bc58dB7B03becE9e67d2bD53', //LP2
    amount: 0.00022992170953019970514,
  },
  {
    minter: '0xC16414AC1fedfDAC4F8A09674D994e1BbB9d7113',
    amount: 0.00014130940795407511552,
  },
]

const weeks = {
  0: week0,
} as { [key: number]: LiquidityProvider[] }

const initMerkle = (week: number) => {
  let leafNodes = weeks[week].map((addr: LiquidityProvider) =>
    solidityKeccak256(
      ['address', 'uint256'],
      [addr.minter, utils.parseEther(addr.amount.toFixed(18).toString())]
    )
  )
  let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  let root = merkleTree.getHexRoot()
  return { tree: merkleTree, root: root }
}

const getMinter = (
  currentAccount: string,
  week: number
): LiquidityProvider | undefined => {
  const list = weeks[week]

  return list.find((lp) => lp.minter === currentAccount)
}

export const getMerkleProof = (
  lpAddress: string,
  week: number
): { proof: string[]; minter: LiquidityProvider } | undefined => {
  try {
    const { tree, root } = initMerkle(week)

    const minter = getMinter(lpAddress, week)

    if (!minter) {
      return undefined
    }

    let leaf = solidityKeccak256(
      ['address', 'uint256'],
      [lpAddress, [utils.parseEther(minter.amount.toFixed(18).toString())]]
    )
    let proof = tree.getHexProof(leaf)

    return { proof, minter }
  } catch (err) {
    throw new Error('Could not find Proof')
  }
}
