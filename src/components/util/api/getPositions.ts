import axios from 'axios'
import { INonfungiblePositionManager__factory } from '../../../chain/contracts/factories/_external/uniswap/INonfungiblePositionManager__factory'
import { JsonRpcSigner } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from '../../../constants'

export interface Position {
    User: string,
    Pool: string,
    Uuid: string,
    Token_id: number,
}

const INONFUNGIBLE_POSITION_MANAGER_ABI = [
  {
    inputs: [{ internalType: "address", name:"owner", type:"address" }],
    name: "balanceOf",
    outputs: [{ internalType:"uint256",name:"",type:"uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address'},
      { internalType: 'uint256', name: 'index', type: 'uint256'}],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'positions',
    outputs: [{ internalType: 'uint95', name: 'nonce', type: 'uint96'},
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'address', name: 'token0', type: 'address'},
      { internalType: 'address', name: 'token1', type: 'address'},
      { internalType: 'uint24', name: 'fee', type: 'uint24'},
      { internalType: 'int24', name: 'tickLower', type: 'int24'},
      { internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      { internalType: 'uint256', name: 'feeGrowthInside0LastX128', type: 'uint256'},
      { internalType: 'uint256', name: 'feeGrowthInside1LastX128', type: 'uint256'},
      { internalType: 'uint128', name: 'tokensOwed0', type: 'uint128'},
      { internalType: 'uint128', name: 'tokensOwed1', type: 'uint128'}
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

interface PositionInfo {
  token0: string,
  token1: string,
  fee: number,
}

export const getPositions = async (
  address: string,
  signer: JsonRpcSigner,
) => {
    const nfpmContract = new Contract(
      NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
      INONFUNGIBLE_POSITION_MANAGER_ABI,
      signer
    )
    const numPositions = await nfpmContract.balanceOf(address)
    const positions = []
    for (let i = 0; i < numPositions; i++) {
        positions.push(nfpmContract.tokenOfOwnerByIndex(address, i))
    }
}
