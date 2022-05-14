const configs:Array<ChainInfo> = [{
    id:'1',
    name: "Ethereum",
    ticker:"ETH",
    usdiAddress: "0xb27E2484Eead6Cbdf7DFb18a22ae2F358e41F1BE" // *remove. Using ropsten address for testing
},
{
    id: '3',
    name: "Ropsten TESTNET",
    ticker: "ETH",
    usdiAddress: "0xb27E2484Eead6Cbdf7DFb18a22ae2F358e41F1BE"
},
{
    id: '5',
    name: "Goerli TESTNET",
    ticker: "ETH"
},
{
    id: '137',
    name: "Mumbai TESTNET",
    ticker: "MATIC"
}

]

export interface ChainInfo {
    id: string
    name: string
    ticker: string

    usdiAddress?: string
}

class chainHolder  {
    m:Map<string,ChainInfo>
    constructor(){
        this.m = new Map()
    }
    addChain(v:ChainInfo){
        this.m.set(v.id,v)
    }
    getInfo(id:number|string):ChainInfo {
        if(this.m.has(id.toString())){
            return this.m.get(id.toString())!
        }
        return {id:'0', name: "NOT SUPPORTED",ticker: "N/A"}
    }
}
const chains = new chainHolder();
for(let e of configs) {
    chains.addChain(e)
}
export const Chains = chains
