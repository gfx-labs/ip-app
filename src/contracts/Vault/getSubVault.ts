import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../contract_abis/factories/lending/VotingVaultController__factory'
import { MKRVotingVaultController__factory } from '../../contract_abis/factories/lending/MKRVotingVaultController__factory'
import { MKR_VOTING_VAULT_ADDRESS, NFT_VAULT_CONTROLLER_ADDRESS } from '../../constants'
import { NftVaultController__factory } from '../../contract_abis/factories/pools/NftVaultController__factory'

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
    MKR_VOTING_VAULT_ADDRESS,
    signerOrProvider
  )
  const addr = await VVCContract.votingVaultAddress(Number(id))
  return addr
}

export const getNftVaultAddr = async (
  vault_id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const contract = NftVaultController__factory.connect(NFT_VAULT_CONTROLLER_ADDRESS, signerOrProvider)
  const addr = await contract.NftVaultAddress(vault_id)
  return addr
}