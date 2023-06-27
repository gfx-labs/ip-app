import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../chain/contracts/factories/lending/VotingVaultController__factory'
import { ZERO_ADDRESS } from '../../constants'

export const getBptVaultAddress = async (
  vaultController_addr: string,
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const VVCContract = VotingVaultController__factory.connect(
    vaultController_addr,
    signerOrProvider
  )
  const votingVaultAddress = await VVCContract.BPTvaultAddress(Number(id))
  return votingVaultAddress
}

export const hasBptVaultAddress = (address: string) =>
  address !== ZERO_ADDRESS