import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Rolodex } from '../../../chain/rolodex/rolodex'
import { getBalanceOf } from '../../../contracts/ERC20/getBalanceOf'
import getDecimals from '../../../contracts/misc/getDecimals'
import { BN } from '../../../easy/bn'
import { useFormatBNWithDecimals } from '../../../hooks/useFormatBNWithDecimals'

export const getVaultTokenBalanceAndPrice = async (
  vault_address: string | undefined,
  token_address: string,
  rolodex: Rolodex,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
): Promise<{ balance: number; livePrice: number }> => {
  // get vault balance
  let balance = 0

  const SOP = signerOrProvider ? signerOrProvider : rolodex.provider

  if (vault_address !== undefined) {
    balance = await getBalanceOf(vault_address, token_address, SOP)
  }
  const price = await rolodex?.Oracle?.getLivePrice(token_address)
  const decimals = await getDecimals(token_address, SOP)
  const livePrice = useFormatBNWithDecimals(price!, 18 + (18 - decimals))
  return { balance, livePrice }
}

export const getVaultTokenMetadata = async (
  token_address: string,
  rolodex: Rolodex
): Promise<{ ltv: number; penalty: number }> => {
  const tokenId = await rolodex?.VC?._tokenAddress_tokenId(token_address)
  let ltvBig = await rolodex?.VC!._tokenId_tokenLTV(tokenId!)
  let penaltyBig = await rolodex?.VC!._tokenAddress_liquidationIncentive(
    token_address
  )
  let ltv = ltvBig.div(BN('1e16')).toNumber()
  let penalty = penaltyBig.div(BN('1e16')).toNumber()
  return { ltv, penalty }
}
