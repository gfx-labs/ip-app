import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { VotingVaultController__factory } from '../../chain/contracts/factories/lending/VotingVaultController__factory'

export enum SubVault {
  Voting = "VOTING",
  BPT = "BPT",
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
  }
  // if (type == SubVault.Voting) {
    
  // }

  // if (type == SubVault.BPT) {
    
  // }
}

//export default mintSubVault
