export interface ChainInfo {
  id: number
  name: string
  symbol: string
  logo: string
  usdi_addr?: string
  votingVaultController_addr?: string
  vaultController_addr: string
  scan_url: string
  scan_site: string
  delegate_token: string
  analytics: string
  rpc: string // backup rpc when not connected
}

export enum ChainIDs {
  MAINNET = 1,
  OPTIMISM = 10,
}

export const Chains: { [index: number]: ChainInfo } = {
  1: {
    id: ChainIDs.MAINNET,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'ETH',
    usdi_addr: '0x2A54bA2964C8Cd459Dc568853F79813a60761B58',
    votingVaultController_addr: '0xaE49ddCA05Fe891c6a5492ED52d739eC1328CBE2',
    vaultController_addr: '0x4aaE9823Fb4C70490F1d802fC697F3ffF8D5CbE3',
    scan_url: 'https://etherscan.io/tx/',
    scan_site: 'Etherscan',
    delegate_token: 'UNI',
    analytics: 'https://analytics-api.apiary.software',
    rpc: 'https://mainnet-rpc.apiary.software',
  },
  10: {
    id: ChainIDs.OPTIMISM,
    name: 'Optimism',
    symbol: 'opUSDi',
    logo: 'opUSDi',
    usdi_addr: '0x889be273BE5F75a177f9a1D00d84D607d75fB4e1',
    votingVaultController_addr: '0x9C3b60A1ad08740fCD842351ff0960C1Ee3FeA52',
    vaultController_addr: '0x05498574BD0Fa99eeCB01e1241661E7eE58F8a85',
    scan_url: 'https://optimistic.etherscan.io/tx/',
    scan_site: 'Optimism Etherscan',
    delegate_token: 'OP',
    analytics: 'https://analytics-api-op.gfx.xyz', //need to change to prod
    rpc: 'https://mainnet.optimism.io',
  },
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
