import {Provider} from "@ethersproject/providers";
import {getWallet} from "../../components/libs/web3-data-provider/WalletOptions";
import {useWeb3Context} from "../../components/libs/web3-data-provider/Web3Provider";
import {IUSDI, IVaultController, USDI__factory} from "../contracts"


export class Rolodex {
  addressUSDI: string
  USDI?: IUSDI;

  addressVC?: string
  VC?: IVaultController;

  constructor(provider:Provider, usdi:string) {
    this.addressUSDI = usdi
    this.USDI = USDI__factory.connect(this.addressUSDI, provider)
  }

}

export const NewRolodex = async () => {
  const ctx = useWeb3Context()
  ctx.provider
}

