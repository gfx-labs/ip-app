import { JsonRpcSigner } from '@ethersproject/providers'
import { Vault__factory } from '../../chain/contracts'
import { MKRVotingVault__factory } from '../../chain/contracts/factories/lending/vault/MKRVotingVault__factory'
import { Token } from '../../chain/tokens'

export const delegateVaultVotingPower = async (
  vault_address: string,
  token: Token,
  target: string,
  signer: JsonRpcSigner,
) => {
  if (token.ticker === 'MKR') {
    const MKRVVContract = MKRVotingVault__factory.connect(vault_address, signer)
    const txn = await MKRVVContract.delegateMKRLikeTo(
      target,
      token.address
    )
    return txn
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
