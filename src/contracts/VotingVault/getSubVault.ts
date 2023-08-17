import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../chain/contracts/factories/lending/VotingVaultController__factory'
import { MKRVotingVaultController__factory } from '../../chain/contracts/factories/lending/MKRVotingVaultController__factory'

export const getVotingVaultAddress = async (
  vaultController_addr: string,
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const VVCContract = VotingVaultController__factory.connect(
    vaultController_addr,
    signerOrProvider
  )
  const votingVaultAddress = await VVCContract.votingVaultAddress(Number(id))
  return votingVaultAddress
}

export const getBptVaultAddress = async (
  vaultController_addr: string,
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const VVCContract = VotingVaultController__factory.connect(
    vaultController_addr,
    signerOrProvider
  )
  const bptVaultAddress = await VVCContract.BPTvaultAddress(Number(id))
  return bptVaultAddress
}

export const getMKRVotingVaultAddr = async (
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const VVCContract = MKRVotingVaultController__factory.connect(
    '0x491397f7eb6f5d9B82B15cEcaBFf835bA31f217F',
    signerOrProvider
  )
  const addr = await VVCContract.votingVaultAddress(Number(id))
  return addr
}