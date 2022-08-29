export enum ChainIDs {
  MAINNET = 1,
  ROPSTEN = 3,
  GOERLI = 5,
  POLYGON = 137,
  LOCAL = 31337,
}

const configs: Array<ChainInfo> = [
  {
    id: ChainIDs.MAINNET,
    name: 'Ethereum',
    ticker: 'ETH',
    usdiAddress: '0x2A54bA2964C8Cd459Dc568853F79813a60761B58',
    scanUrl: 'https://etherscan.io/tx/',
    scanSite: 'Etherscan',
  },
  {
    id: ChainIDs.ROPSTEN,
    name: 'Switch to Mainnet',
    ticker: 'ROP ETH',
    usdiAddress: '0x12f4e7c4e7993d724eac73ef99f2fca36f1fa921',
    scanUrl: 'https://ropsten.etherscan.io/tx/',
    scanSite: 'Ropsten Etherscan',
  },
  {
    id: ChainIDs.GOERLI,
    name: 'Switch to Mainnet',
    ticker: 'ETH',
    scanUrl: 'https://goerli.etherscan.io/tx/',
    scanSite: 'Goerli Etherscan',
  },
  {
    id: ChainIDs.POLYGON,
    name: 'Polygon TESTDEPLOY',
    ticker: 'MATIC',
    usdiAddress: '0xf61275F2358EEd209cc2C0efcCEcC1E542277aED',
    scanUrl: 'https://polygonscan.com/tx/',
    scanSite: 'PolygonScan',
  },
  {
    id: ChainIDs.LOCAL,
    name: 'Ethereum Local',
    ticker: 'ETH Local',
    usdiAddress: '0x2A54bA2964C8Cd459Dc568853F79813a60761B58',
    scanUrl: 'https://etherscan.io/tx/',
    scanSite: 'Etherscan',
  },
]

export interface ChainInfo {
  id: number
  name: string
  ticker: string
  usdiAddress?: string
  scanUrl: string
  scanSite: string
}

class chainHolder {
  m: Map<number, ChainInfo>
  constructor() {
    this.m = new Map()
  }
  addChain(v: ChainInfo) {
    this.m.set(v.id, v)
  }
  getInfo(id: number | string): ChainInfo {
    if (this.m.has(Number(id))) {
      return this.m.get(Number(id))!
    }
    return {
      id: 0,
      name: 'NOT SUPPORTED',
      ticker: 'N/A',
      scanUrl: 'N/A',
      scanSite: 'N/A',
    }
  }
}
const chains = new chainHolder()
for (let e of configs) {
  chains.addChain(e)
}
export const Chains = chains
