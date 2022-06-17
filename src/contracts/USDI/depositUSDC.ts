import { JsonRpcSigner } from '@ethersproject/providers'
import { ContractTransaction } from 'ethers'
import { Rolodex } from '../../chain/rolodex/rolodex'
import { BN } from '../../easy/bn'

export const depositUSDC = (
  depositAmount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
): Promise<ContractTransaction> => {
  let formattedUSDCAmount = BN(depositAmount).mul(1e6)

  return rolodex.USDI.connect(signer!).deposit(formattedUSDCAmount)
}
