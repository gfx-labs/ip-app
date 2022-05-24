import { Rolodex } from "../../../chain/rolodex/rolodex";
import { useBalanceOf } from "../../../hooks/useBalanceOf";
import {
  useDecimals,
  useFormatWithDecimals,
} from "../../../hooks/useTokenInfo";

export const getVaultTokenBalanceAndPrice = async (
  vault_address: string,
  token_address: string,
  rolodex: Rolodex
): Promise<{ balance: number; livePrice: number }> => {
    // get user balance
    try{
    const balance = await useBalanceOf(vault_address, token_address);
    const price = await rolodex?.Oracle?.getLivePrice(token_address);
    const decimals = await useDecimals(token_address);
    const livePrice = useFormatWithDecimals(price!, decimals);
    return { balance, livePrice };
    } catch(e:any) {
      console.log(`error getVaultTokenBalanceAndPrice for ${token_address}, ${e}`)
      return { balance: 0, livePrice : 0 };
    }
};
export const getVaultTokenMetadata = async (
  vault_address: string,
  token_address: string,
  rolodex: Rolodex
): Promise<{ ltv: number; penalty: number }> => {
    // get user balance
    try{
      const tokenId = await rolodex?.VC?._tokenAddress_tokenId(token_address)
      let ltvBig = await rolodex?.VC!._tokenId_tokenLTV(tokenId!)
      let penaltyBig = await rolodex?.VC!._tokenAddress_liquidationIncentive(token_address)
      let ltv = ltvBig.div(1e8).div(1e8).toNumber()
      let penalty = penaltyBig.div(1e8).div(1e8).toNumber()
    return { ltv, penalty};
    } catch(e:any) {
      console.log(`error getVaultTokenBalanceAndPrice for ${token_address}, ${e}`)
      return { ltv: 0, penalty: 0 };
    }
};

