import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { Vault__factory } from "../../../chain/contracts";
import { Rolodex } from "../../../chain/rolodex/rolodex";
import { useBalanceOf } from "../../../hooks/useBalanceOf";
import { BNtoHex } from "../../util/helpers/BNtoHex";

export const connectVaultContract = (address: string, signer: JsonRpcSigner) =>
  Vault__factory.connect(address, signer);

export const getVaultTokenData = async (
  vault_address: string,
  token_address: string,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider,
  rolodex: Rolodex
): Promise<{ balance: string; livePrice: string }> => {
  // get user balance
  console.log(token_address, "token addresses");
  const balance = await useBalanceOf(
    vault_address,
    token_address,
  );

  console.log("getting live price of: 0xc778417E063141139Fce010982780140Aa0cD5Ab");

  const price = await rolodex?.Oracle?.getLivePrice(
    "0xc778417E063141139Fce010982780140Aa0cD5Ab"
  );

  const livePrice = BNtoHex(price!);
  console.log(price, "0xc778417E063141139Fce010982780140Aa0cD5Ab");
  let bout = balance.toString()
  return { balance: bout, livePrice: livePrice };
};
