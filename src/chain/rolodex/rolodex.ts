import { JsonRpcSigner } from "@ethersproject/providers";
import { getWallet } from "../../components/libs/web3-data-provider/WalletOptions";
import {
  useWeb3Context,
  Web3Data,
} from "../../components/libs/web3-data-provider/Web3Provider";
import { Chains } from "../chains";
import { IUSDI, IVaultController, USDI__factory } from "../contracts";

export class Rolodex {
  addressUSDI: string;
  USDI?: IUSDI;

  addressVC?: string;
  VC?: IVaultController;

  constructor(signer: JsonRpcSigner, usdi: string) {
    this.addressUSDI = usdi;
    this.USDI = USDI__factory.connect(this.addressUSDI, signer);
  }
}

export const NewRolodex = async (ctx: Web3Data) => {
  if (!ctx.chainId) {
    throw new Error(
      "Must connect to a chain first"
    );
  }

  const token = Chains.getInfo(ctx.chainId);
  const signer = ctx.provider?.getSigner(ctx.currentAccount)
  return new Rolodex(signer!, token.usdiAddress!);
};
