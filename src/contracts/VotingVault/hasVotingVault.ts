import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../chain/contracts/factories/lending/VotingVaultController__factory'
import { ZERO_ADDRESS } from '../../constants'

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

export const hasVotingVaultAddress = (address: string) =>
  address !== ZERO_ADDRESS
