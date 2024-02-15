import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Contract } from 'ethers'

const abi = [
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'delegates',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  }
]

const getDelegate = async (
  contractAddr: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  subVaultAddr: string,
) => {
  const tokenContract = new Contract(
    contractAddr,
    abi,
    signerOrProvider
  )

  const delegate = await tokenContract.delegates(subVaultAddr)
  return delegate
}

export default getDelegate