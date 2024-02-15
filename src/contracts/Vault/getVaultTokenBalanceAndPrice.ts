import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'
import { Rolodex } from '../../chain/rolodex'
import { getBalanceOf } from '../Token/getBalanceOf'
import getDecimals from '../Token/getDecimals'
import { BN } from '../../easy/bn'
import { Token } from '../../chain/tokens'

// export const getVaultBalance = async (
//   vault_address: string,
//   token_address: Token,
//   rolodex: Rolodex,
//   provider: JsonRpcProvider,
// ): Promise<{

// }> => {

// }

// export const getLivePrice = async (
//   token_address: string,
//   rolodex: Rolodex,
//   provider: JsonRpcProvider,
// ): Promise<BigNumber> => {
//   let livePrice = BigNumber.from(0)

//   try {
//     const price = await rolodex?.Oracle?.getLivePrice(token_address)
//     const decimals = await getDecimals(token_address, provider)
//     livePrice = Number(utils.formatUnits(price!._hex, 18 + (18 - decimals)))
//   } catch (e) {
//     if(!(e as any).toString().includes("OLD")) {
//       console.error(e)
//     }
//   }
//   return livePrice
// }

export const getVaultTokenBalanceAndPrice = async (
  vault_address: string | undefined,
  token: Token,
  rolodex: Rolodex,
  signerOrProvider: JsonRpcProvider | JsonRpcSigner,
): Promise<{
  livePrice: number
  balance: string // balance in money units
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
      const balanceOf = await getBalanceOf(vault_address, token_address, SOP)
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
    livePrice = Number(utils.formatUnits(price!._hex, 18 + (18 - decimals)))
    let vaultBalance = balanceBN.mul(price!)
    balance = utils.formatUnits(vaultBalance, decimals + decimals)
  } catch (e) {
    if(!(e as any).toString().includes("OLD")) {
      console.error(e)
    }
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