import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { Rolodex } from '../../../chain/rolodex/rolodex'
import { getBalanceOf } from '../../../contracts/ERC20/getBalanceOf'
import getDecimals from '../../../contracts/misc/getDecimals'
import { BN } from '../../../easy/bn'
import { useFormatBNWithDecimals } from '../../../hooks/useFormatBNWithDecimals'
import { Token } from '../../../types/token'

export const getVaultTokenBalanceAndPrice = async (
  vault_address: string | undefined,
  token: Token,
  rolodex: Rolodex,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner
): Promise<{
  balance: string // balance in money units
  livePrice: number
  unformattedBalance: string
  balanceBN: BigNumber
}> => {
  // default values
  let balance = '0'
  let unformattedBalance = '0'
  let balanceBN = BigNumber.from(0)
  let livePrice = 0
  const SOP = signerOrProvider ? signerOrProvider : rolodex.provider

  const token_address = token.capped_address ? token.capped_address : token.address
  try {
    // get vault balance
    if (vault_address !== undefined) {
      const balanceOf = await getBalanceOf(vault_address, token_address, token.decimals, SOP)

      //balance = balanceOf.num
      unformattedBalance = balanceOf.str
      balanceBN = balanceOf.bn
    }
  } catch (e) {
    console.error(e)
  }

  try {
    const price = await rolodex?.Oracle?.getLivePrice(token_address)
    const decimals = await getDecimals(token_address, SOP)
    livePrice = useFormatBNWithDecimals(price!, 18 + (18 - decimals))
    let vaultBalance = balanceBN.mul(price!)
    balance = utils.formatUnits(vaultBalance, decimals + token.decimals)
  } catch (e) {
    console.error(e)
  }

  
  return { balance, livePrice, unformattedBalance, balanceBN }
}

export const getVaultTokenMetadata = async (token_address: string, rolodex: Rolodex): Promise<{ ltv: number; penalty: number }> => {
  const tokenId = await rolodex?.VC?._tokenAddress_tokenId(token_address)
  let ltvBig = await rolodex?.VC!._tokenId_tokenLTV(tokenId!)
  let penaltyBig = await rolodex?.VC!._tokenAddress_liquidationIncentive(token_address)
  let ltv = ltvBig.div(BN('1e16')).toNumber()
  let penalty = penaltyBig.div(BN('1e16')).toNumber()
  return { ltv, penalty }
}
