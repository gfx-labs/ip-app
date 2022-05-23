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
  try {
    // get user balance
    const balance = await useBalanceOf(vault_address, token_address);

    const price = await rolodex?.Oracle?.getLivePrice(token_address);

    const decimals = await useDecimals(token_address);

    const livePrice = useFormatWithDecimals(price!, decimals);

    return { balance, livePrice };
  } catch (err) {
    console.log(err);
    throw new Error("Error getting vault token data");
  }
};

