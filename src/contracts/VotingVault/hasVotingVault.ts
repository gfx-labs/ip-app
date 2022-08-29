import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../chain/contracts/factories/lending/VotingVaultController__factory'
import { VOTING_VAULT_CONTROLLER_ADDRESS, ZERO_ADDRESS } from '../../constants'

const getVotingVaultAddress = async (
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const VVCContract = VotingVaultController__factory.connect(
    VOTING_VAULT_CONTROLLER_ADDRESS,
    signerOrProvider
  )

  const votingVaultAddress = await VVCContract.votingVaultAddress(Number(id))

  return votingVaultAddress
}

const hasVotingVault = async (
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const votingVaultAddress = await getVotingVaultAddress(id, signerOrProvider)

  return votingVaultAddress !== ZERO_ADDRESS
}

export default hasVotingVault
