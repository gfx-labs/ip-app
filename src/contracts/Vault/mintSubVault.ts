import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../contract_abis/factories/lending/VotingVaultController__factory'
import { MKRVotingVaultController__factory } from '../../contract_abis/factories/lending/MKRVotingVaultController__factory'
import { MKR_VOTING_VAULT_ADDRESS, NFT_VAULT_CONTROLLER_ADDRESS } from '../../constants'
import { NftVaultController__factory } from '../../contract_abis/factories/pools/NftVaultController__factory'

export enum SubVault {
  Voting = 'VOTING',
  BPT = 'BPT',
  MKR = 'MKR',
  NFT = 'NFT',
}

export const mintSubVault = async (
  vaultController_addr: string,
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  type: SubVault,
) => {
  const VVCContract = VotingVaultController__factory.connect(
    vaultController_addr,
    signerOrProvider
  )
  let mintVaultTransaction
  let mintVaultRecipt

  switch (type) {
    case SubVault.Voting:
      mintVaultTransaction = await VVCContract.mintVault(Number(id))
      mintVaultRecipt = await mintVaultTransaction.wait()
      return mintVaultRecipt
    case SubVault.BPT:
      mintVaultTransaction = await VVCContract.mintBptVault(Number(id))
      mintVaultRecipt = await mintVaultTransaction.wait()
      return mintVaultRecipt
    case SubVault.MKR:
      const MKRVVContract = MKRVotingVaultController__factory.connect(
        MKR_VOTING_VAULT_ADDRESS,
        signerOrProvider
      )
      mintVaultTransaction = await MKRVVContract.mintVault(Number(id))
      mintVaultRecipt = await mintVaultTransaction.wait()
      return mintVaultRecipt
  }
}

export const mintNftVault = async (
  vault_id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const contract = NftVaultController__factory.connect(NFT_VAULT_CONTROLLER_ADDRESS, signerOrProvider)
  const tx = await contract.mintVault(vault_id)
  const receipt = await tx.wait()
  return receipt
}
