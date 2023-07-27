import { ChainInfo } from '../types/chain'

export enum ChainIDs {
  MAINNET = 1,
  ROPSTEN = 3,
  GOERLI = 5,
  OPTIMISM = 10,
  POLYGON = 137,
  LOCAL = 31337,
}

// to use when switching chains
export const networkParams: {[index: number]: any} = {
  1: {
    chainId: "0x1",
    rpcUrls: ["https://eth.llamarpc.com","https://ethereum.publicnode.com", "https://api.zmok.io/mainnet/oaen6dy8ff6hju9k"],
    chainName: "Ethereum Mainnet",
    nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
    blockExplorerUrls: ["https://etherscan.io"],
    iconUrls: ["https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/81d9f/eth-diamond-black.webp"]
  },
  10: {
    chainId: "0xa",
    rpcUrls: ["https://optimism.publicnode.com", "https://rpc.ankr.com/optimism", "https://optimism.blockpi.network/v1/rpc/public"],
    chainName: "Optimism",
    nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
    iconUrls: [
      "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=025"
    ]
  }
}

export const Chains: {[index: number]: ChainInfo} = {
  1: {
    id: ChainIDs.MAINNET,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'ETH',
    usdi_addr: '0x2A54bA2964C8Cd459Dc568853F79813a60761B58',
    votingVaultController_addr: '0xaE49ddCA05Fe891c6a5492ED52d739eC1328CBE2',
    scan_url: 'https://etherscan.io/tx/',
    scan_site: 'Etherscan',
    delegate_token: 'UNI',
    analytics: 'https://analytics-api.gfx.xyz',
    rpc: 'https://mainnet.rpc.gfx.xyz'
  },
  // {
  //   id: ChainIDs.ROPSTEN,
  //   name: 'Switch to Mainnet',
  //   symbol: 'ROP ETH',
  //   logo: 'ETH',
  //   usdi_addr: '0x12f4e7c4e7993d724eac73ef99f2fca36f1fa921',
  //   scan_url: 'https://ropsten.etherscan.io/tx/',
  //   scan_site: 'Ropsten Etherscan',
  // },
  // {
  //   id: ChainIDs.GOERLI,
  //   name: 'Switch to Mainnet',
  //   symbol: 'ETH',
  //   logo: 'ETH',
  //   scan_url: 'https://goerli.etherscan.io/tx/',
  //   scan_site: 'Goerli Etherscan',
  // },
  10: {
    id: ChainIDs.OPTIMISM,
    name: 'Optimism',
    symbol: 'opUSDi',
    logo: 'opUSDi',
    usdi_addr: '0x889be273BE5F75a177f9a1D00d84D607d75fB4e1',
    votingVaultController_addr: '0x9C3b60A1ad08740fCD842351ff0960C1Ee3FeA52',
    scan_url: 'https://optimistic.etherscan.io/tx/',
    scan_site: 'Optimism Etherscan',
    delegate_token: 'OP',
    analytics: 'https://ip-stats-api-op.staging.gfx.town',
    rpc: 'https://optimism-mainnet.chainnodes.org/938056af-4d36-482a-b8f0-0a1b47a97226'
  },
  // {
  //   id: ChainIDs.POLYGON,
  //   name: 'Polygon TESTDEPLOY',
  //   symbol: 'MATIC',
  //   logo: 'MATIC',
  //   usdi_addr: '0xf61275F2358EEd209cc2C0efcCEcC1E542277aED',
  //   scan_url: 'https://polygonscan.com/tx/',
  //   scan_site: 'PolygonScan',
  // },
  // {
  //   id: ChainIDs.LOCAL,
  //   name: 'Ethereum Local',
  //   symbol: 'ETH Local',
  //   logo: 'ETH',
  //   usdi_addr: '0x2A54bA2964C8Cd459Dc568853F79813a60761B58',
  //   scan_url: 'https://etherscan.io/tx/',
  //   scan_site: 'Etherscan',
  // },
}

// class chainHolder {
//   m: Map<number, ChainInfo>
//   constructor() {
//     this.m = new Map()
//   }
//   addChain(v: ChainInfo) {
//     this.m.set(v.id, v)
//   }
//   getInfo(id: number | string): ChainInfo | undefined {
//     if (this.m.has(Number(id))) {
//       return this.m.get(Number(id))!
//     }
//     return undefined
//   }
// }
// const chains = new chainHolder()
// for (let e of configs) {
//   chains.addChain(e)
// }
// export const Chains = chains
