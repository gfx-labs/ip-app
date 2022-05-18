import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { getWallet } from "../../components/libs/web3-data-provider/WalletOptions";
import {
  useWeb3Context,
  Web3Data,
} from "../../components/libs/web3-data-provider/Web3Provider";
import { Chains } from "../chains";
import {
  IUSDI,
  IVaultController,
  USDI__factory,
  VaultController__factory,
} from "../contracts";

export const provider = new JsonRpcProvider(
  "https://ropsten.infura.io/v3/c21cd0dd200645f39a51d41368b956d9"
);

export class Rolodex {
  addressUSDI: string;
  USDI: IUSDI;

  addressVC?: string;
  VC?: IVaultController;

  constructor(signerOrProvider: JsonRpcSigner | JsonRpcProvider, usdi: string) {
    this.addressUSDI = usdi;
    this.USDI = USDI__factory.connect(this.addressUSDI, signerOrProvider);

    this.addressVC = "0xF549E922e39Cdbdf9fFef9bA17bD9354532AE4B5";
  }
}

export const NewRolodex = async (ctx: Web3Data) => {
  if (!ctx.chainId) {
    throw new Error("Must connect to a chain first");
  }
  // *remove or use mainnet 1
  const token = Chains.getInfo(ctx.chainId || 4);
  let rolo: Rolodex;
  if (!ctx.connected) {
    rolo = new Rolodex(provider!, token.usdiAddress!);

    rolo.addressVC = await rolo.USDI?.getVaultController();
    rolo.VC = VaultController__factory.connect(rolo.addressVC, provider);

    return rolo;
  } else {
    const signer = ctx.provider?.getSigner(ctx.currentAccount);

    rolo = new Rolodex(signer!, token.usdiAddress!);

    rolo.VC = VaultController__factory.connect(rolo.addressVC!, signer!);
  }

  // rolo.addressVC = await rolo.USDI?.getVaultController()

  return rolo;
};
