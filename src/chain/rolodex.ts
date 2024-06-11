import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { Chains, ChainIDs } from './chains'
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
} from '../contract_abis'
import { optimism } from '@wagmi/chains'

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

  addressUSDCe?: string
  USDCe?: ERC20Detailed

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

export const NewRolodex = async (provider: JsonRpcProvider, chainId: number) => {
  const chain = Chains[chainId]
  let rolo: Rolodex

  try {
    rolo = new Rolodex(provider, chain.usdi_addr!)
    rolo.addressVC = chain.vaultController_addr
    rolo.VC = VaultController__factory.connect(rolo.addressVC, provider)

    //set secondary reserve for OP only
    if (chainId == ChainIDs.OPTIMISM) {
      if (!rolo.addressUSDCe) {
        rolo.addressUSDCe = await rolo.USDI.SecondaryReserveAddress()
        rolo.USDCe = ERC20Detailed__factory.connect(rolo.addressUSDCe!, provider)
      }
    }

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
