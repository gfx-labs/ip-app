import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ethers, utils } from "ethers";
import {Vault__factory} from "../chain/contracts";
import { ERC20Detailed__factory } from "../chain/contracts/factories/_external/index";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useDecimals } from "./useTokenInfo";

export const useDelegate = async (
  vault_address: string,
  token: string,
  target: string,
  signer: JsonRpcSigner
) => {
  return Vault__factory.connect(vault_address, signer).delegateCompLikeTo(target, token)
};
