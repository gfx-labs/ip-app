import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Web3Data } from '../../components/libs/web3-data-provider/Web3Provider'
import { Chains } from '../chains'
import {
  IUSDI,
  USDI__factory,
  VaultController__factory,
  OracleMaster__factory,
  IOracleMaster,
  VaultController,
  ICurveMaster,
  CurveMaster__factory,
  ERC20Detailed,
  ERC20Detailed__factory,
  GovernorCharlieDelegate,
} from '../contracts'

export class Rolodex {
  provider: JsonRpcProvider

  charlie?: GovernorCharlieDelegate

  addressUSDI: string
  USDI: IUSDI

  addressVC?: string
  VC?: VaultController

  addressOracle?: string
  Oracle?: IOracleMaster

  addressCurve?: string
  Curve?: ICurveMaster

  addressUSDC?: string
  USDC?: ERC20Detailed

  constructor(signerOrProvider: JsonRpcSigner | JsonRpcProvider, usdi: string) {
    if (signerOrProvider instanceof JsonRpcSigner) {
      this.provider = signerOrProvider.provider
    } else {
      this.provider = signerOrProvider
    }
    this.addressUSDI = usdi
    this.USDI = USDI__factory.connect(this.addressUSDI, signerOrProvider)
  }
}

export const NewRolodex = async (ctx: Web3Data) => {
  const chain = Chains[ctx.chainId]
  let rolo: Rolodex
  let provider = ctx.signerOrProvider

  try {
    // if (ctx.currentSigner) {
    //   const signer = ctx.currentSigner//ctx.provider.getSigner(ctx.currentAccount)
    //   rolo = new Rolodex(signer, chain.usdi_addr!)
    //   rolo.addressVC = await rolo.USDI?.getVaultController()
    //   rolo.VC = VaultController__factory.connect(rolo.addressVC!, signer)
    // } else {
    //   rolo = new Rolodex(provider, chain.usdi_addr!)
    //   rolo.addressVC = await rolo.USDI?.getVaultController()
    //   rolo.VC = VaultController__factory.connect(rolo.addressVC, provider)
    // }
    rolo = new Rolodex(provider, chain.usdi_addr!)
    rolo.addressVC = await rolo.USDI?.getVaultController()
    rolo.VC = VaultController__factory.connect(rolo.addressVC, provider)
    
    // connect
    if (!rolo.addressUSDC) {
      rolo.addressUSDC = await rolo.USDI.reserveAddress()
      rolo.USDC = ERC20Detailed__factory.connect(rolo.addressUSDC!, provider)
    }

    if (!rolo.addressOracle) {
      rolo.addressOracle = await rolo.VC?.getOracleMaster()
      rolo.Oracle = OracleMaster__factory.connect(rolo.addressOracle!, provider)
    }

    if (!rolo.addressCurve) {
      rolo.addressCurve = await rolo.VC?.getCurveMaster()
      rolo.Curve = CurveMaster__factory.connect(rolo.addressCurve!, provider)
    }
  } catch (e) {
    throw new Error(`Error creating rolodex: ${e}`)
  }
  return rolo
}
