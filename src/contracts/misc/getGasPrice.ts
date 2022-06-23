import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { BNtoHexNumber } from '../../components/util/helpers/BNtoHex'
import { BN } from '../../easy/bn'

const CHAIN_DATA_ABI = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const getGasPrice = async (
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const gasContract = new Contract(
    '0x169e633a2d1e6c10dd91238ba11c4a708dfef37c',
    CHAIN_DATA_ABI,
    signerOrProvider
  )

  const gasPrice = await gasContract.latestAnswer()
  const formattedGasPrice = BNtoHexNumber(gasPrice) / 1000000000

  return formattedGasPrice.toFixed(2)
}

export default getGasPrice
