import { JsonRpcSigner } from "@ethersproject/providers";
import {
  InterestProtocolTokenDelegate__factory,
  Vault__factory,
} from "../chain/contracts";
export const useDelegate = async (
  vault_address: string,
  token: string,
  target: string,
  signer: JsonRpcSigner
) => {
  return Vault__factory.connect(vault_address, signer).delegateCompLikeTo(
    target,
    token
  );
};

const iptaddress = "0xe8504e3b854940818c8f3d61dc155fa9919dd10f";

export const useIPTDelegate = async (
  delegatee: string,
  signer: JsonRpcSigner
) => {
  try {
    return InterestProtocolTokenDelegate__factory.connect(
      iptaddress,
      signer
    ).delegate(delegatee);

  } catch (err) {
    throw new Error("Error delegating IPT");
  }
};

export const getCurrentVotes = async (
  currentAccount: string,
  signer: JsonRpcSigner
) => {
  try {
    return InterestProtocolTokenDelegate__factory.connect(
      iptaddress,
      signer
    ).getCurrentVotes(currentAccount)

  } catch (err) {
    throw new Error("Error getting voting power");
  }
};

