export enum ChainIDs {
    MAINNET = 1,
    ROPSTEN = 3,
    GOERLI = 5,
    MUMBAI = 137
}

const configs: Array<ChainInfo> = [
  {
    id: ChainIDs.MAINNET,
    name: "Ethereum",
    ticker: "ETH",
    usdiAddress: "0x12f4e7c4e7993d724eac73ef99f2fca36f1fa921", // *remove. Using ropsten address for testing
  },
  {
    id: ChainIDs.ROPSTEN,
    name: "Ropsten TESTNET",
    ticker: "ROP ETH",
    usdiAddress: "0x12f4e7c4e7993d724eac73ef99f2fca36f1fa921",
  },
  {
    id: ChainIDs.GOERLI,
    name: "Goerli TESTNET",
    ticker: "ETH",
  },
  {
    id: ChainIDs.MUMBAI,
    name: "Mumbai TESTNET",
    ticker: "MATIC",
  },
];

export interface ChainInfo {
  id: number;
  name: string;
  ticker: string;
  usdiAddress?: string;
}

class chainHolder {
  m: Map<number, ChainInfo>;
  constructor() {
    this.m = new Map();
  }
  addChain(v: ChainInfo) {
    this.m.set(v.id, v);
  }
  getInfo(id: number | string): ChainInfo {
    if (this.m.has(Number(id))) {
      return this.m.get(Number(id))!;
    }
    return { id: 0, name: "NOT SUPPORTED", ticker: "N/A" };
  }
}
const chains = new chainHolder();
for (let e of configs) {
  chains.addChain(e);
}
export const Chains = chains;
