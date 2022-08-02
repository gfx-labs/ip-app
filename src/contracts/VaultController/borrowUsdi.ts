import { JsonRpcSigner } from '@ethersproject/providers'
import { ContractTransaction, utils } from 'ethers'
import { Rolodex } from '../../chain/rolodex/rolodex'
import { USDI_DECIMALS } from '../../constants'

export const borrowUsdi = (
  vaultID: number,
  amount: string,
  rolodex: Rolodex,
  signer: JsonRpcSigner
): Promise<ContractTransaction> => {
  const formattedUSDIAmount = utils.parseUnits(amount, USDI_DECIMALS)
  try {
    return rolodex
      .VC!.connect(signer)
      .borrowUsdi(vaultID, formattedUSDIAmount, { gasLimit: 700000 })
  } catch (err) {
    throw new Error('Could not borrow')
  }
}
