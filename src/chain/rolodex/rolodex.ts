import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
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

  constructor(signerOrProvider: JsonRpcSigner | JsonRpcProvider, usdi: string) {
    this.addressUSDI = usdi;
    this.USDI = USDI__factory.connect(this.addressUSDI, signerOrProvider);
  }
}

export const NewRolodex = async (ctx: Web3Data) => {
  if (!ctx.chainId) {
    throw new Error(
      "Must connect to a chain first"
    );
  }
  // *remove or use mainnet 1
  const token = Chains.getInfo(ctx.chainId || 4);
  
  if(!ctx.connected) {
  
    const provider = new JsonRpcProvider('https://ropsten.infura.io/v3/c21cd0dd200645f39a51d41368b956d9')
  
    return new Rolodex(provider!, token.usdiAddress!);
  }
  
  const signer = ctx.provider?.getSigner(ctx.currentAccount)

  return new Rolodex(signer!, token.usdiAddress!);
};
