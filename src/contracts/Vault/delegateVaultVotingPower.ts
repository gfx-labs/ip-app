import { JsonRpcSigner } from '@ethersproject/providers'
import { Vault__factory } from '../../chain/contracts'
import { Token } from '../../types/token'
import { MKRVotingVault__factory } from '../../chain/contracts/factories/lending/MKRVotingVault__factory'

export const delegateVaultVotingPower = async (
  vault_address: string,
  token: Token,
  target: string,
  signer: JsonRpcSigner,
) => {
  if (token.ticker === 'MKR') {
    return MKRVotingVault__factory.connect(vault_address, signer).delegateMKRLikeTo(
      target,
      token.address
    )
  } else {
    return Vault__factory.connect(vault_address, signer).delegateCompLikeTo(
      target,
      token.address
    )
  }
}

export const undelegateVaultVotingPower = async (
  vault_address: string,
  delegatee: string,
  signer: JsonRpcSigner,
) => {
  const MKRVVContract = MKRVotingVault__factory.connect(vault_address, signer)
  const txn = await MKRVVContract.undelegateMKRLike(delegatee)
  return txn
}
