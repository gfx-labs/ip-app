import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../chain/contracts/factories/lending/VotingVaultController__factory'

const mintBptVault = async (
  vaultController_addr: string,
  id: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const VVCContract = VotingVaultController__factory.connect(
    vaultController_addr,
    signerOrProvider
  )
  const mintVaultTransaction = await VVCContract.mintBptVault(Number(id))
  const mintVaultRecipt = await mintVaultTransaction.wait()

  return mintVaultRecipt
}

export default mintBptVault