/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  V3PositionValuator,
  V3PositionValuatorInterface,
} from "../../pools/V3PositionValuator";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "FACTORY_V3",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract INonfungiblePositionManager",
        name: "_nfpManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_factoryV3",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nfpManager",
    outputs: [
      {
        internalType: "contract INonfungiblePositionManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "poolDatas",
    outputs: [
      {
        internalType: "contract IOracleRelay",
        name: "token0Oracle",
        type: "address",
      },
      {
        internalType: "contract IOracleRelay",
        name: "token1Oracle",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "UNIT_0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "UNIT_1",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniV3Pool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IOracleRelay",
        name: "_token0Oracle",
        type: "address",
      },
      {
        internalType: "contract IOracleRelay",
        name: "_token1Oracle",
        type: "address",
      },
    ],
    name: "registerPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "registeredPools",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "verifyPool",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "int24",
            name: "tickLower",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "tickUpper",
            type: "int24",
          },
          {
            internalType: "uint128",
            name: "liquidity",
            type: "uint128",
          },
        ],
        internalType: "struct V3PositionValuator.VerifyData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611a82806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063698996f811610071578063698996f8146101d2578063715018a6146101e05780638da5cb5b146101e857806398bbc3c7146101f9578063e15a87971461020c578063f2fde38b1461026e57600080fd5b80630ff4c916146100b95780632c23003d146100df5780634578d290146100f4578063485cc9551461012757806359f4b9961461013a578063618bdcda146101a7575b600080fd5b6100cc6100c73660046115bb565b610281565b6040519081526020015b60405180910390f35b6100f26100ed3660046115e9565b610368565b005b610117610102366004611634565b60676020526000908152604090205460ff1681565b60405190151581526020016100d6565b6100f2610135366004611651565b61061b565b61017c610148366004611634565b60686020526000908152604090208054600182015460028301546003909301546001600160a01b0392831693919092169184565b604080516001600160a01b0395861681529490931660208501529183015260608201526080016100d6565b6065546101ba906001600160a01b031681565b6040516001600160a01b0390911681526020016100d6565b670de0b6b3a76400006100cc565b6100f26106c1565b6033546001600160a01b03166101ba565b6066546101ba906001600160a01b031681565b61021f61021a3660046115bb565b6106f7565b6040516100d69190600060808201905060018060a01b038351168252602083015160020b6020830152604083015160020b60408301526001600160801b03606084015116606083015292915050565b6100f261027c366004611634565b6108aa565b60008061028d836106f7565b80516001600160a01b03908116600090815260686020908152604080832081516080810183528154861681526001820154909516928501929092526002820154908401526003015460608301529192509080806102e984610945565b92509250925060008061031a856103038960200151610aeb565b6103108a60400151610aeb565b8a60600151610f08565b6060880151919350915061032e84836116a0565b61033891906116d5565b604087015161034786856116a0565b61035191906116d5565b61035b91906116e9565b9998505050505050505050565b6033546001600160a01b0316331461039b5760405162461bcd60e51b815260040161039290611701565b60405180910390fd5b6001600160a01b03808416600081815260676020908152604091829020805460ff19811660ff9091161517905581516080810183528685168152938516848201528151630dfe168160e01b815282519285019392630dfe168192600480840193919291829003018186803b15801561041257600080fd5b505afa158015610426573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044a9190611741565b6001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561048257600080fd5b505afa158015610496573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ba919061175e565b6104c590600a611865565b8152602001846001600160a01b031663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b15801561050357600080fd5b505afa158015610517573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053b9190611741565b6001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561057357600080fd5b505afa158015610587573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ab919061175e565b6105b690600a611865565b90526001600160a01b03938416600090815260686020908152604091829020835181549088166001600160a01b031991821617825591840151600182018054919098169216919091179095558101516002850155606001516003909301929092555050565b600054610100900460ff1680610634575060005460ff16155b6106505760405162461bcd60e51b815260040161039290611874565b600054610100900460ff16158015610672576000805461ffff19166101011790555b61067a610fa4565b606680546001600160a01b038086166001600160a01b031992831617909255606580549285169290911691909117905580156106bc576000805461ff00191690555b505050565b6033546001600160a01b031633146106eb5760405162461bcd60e51b815260040161039290611701565b6106f5600061101f565b565b6040805160808101825260008082526020820181905281830181905260608201819052606654925163133f757160e31b81526004810185905291929091829182918291829182916001600160a01b0316906399fbab88906024016101806040518083038186803b15801561076a57600080fd5b505afa15801561077e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a291906118fe565b5050505097509750975097509750975050506000610806606560009054906101000a90046001600160a01b031660405180606001604052808a6001600160a01b03168152602001896001600160a01b031681526020018862ffffff16815250611071565b6001600160a01b03811660009081526067602052604090205490915060ff166108675760405162461bcd60e51b8152602060048201526013602482015272141bdbdb081b9bdd081c9959da5cdd195c9959606a1b6044820152606401610392565b604080516080810182526001600160a01b039092168252600294850b60208301529290930b918301919091526001600160801b0316606082015295945050505050565b6033546001600160a01b031633146108d45760405162461bcd60e51b815260040161039290611701565b6001600160a01b0381166109395760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610392565b6109428161101f565b50565b60008060008360400151670de0b6b3a764000061096291906116d5565b84600001516001600160a01b031663698996f86040518163ffffffff1660e01b815260040160206040518083038186803b15801561099f57600080fd5b505afa1580156109b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d791906119df565b6109e191906116d5565b91508360600151670de0b6b3a76400006109fb91906116d5565b84602001516001600160a01b031663698996f86040518163ffffffff1660e01b815260040160206040518083038186803b158015610a3857600080fd5b505afa158015610a4c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7091906119df565b610a7a91906116d5565b90506000610a99610a8f84876060015161115a565b600160601b61115a565b90506000610aab83876040015161115a565b90506000610ab982846116d5565b90506000610ac6826111bf565b6001600160801b03169050610ade603082901b611342565b9650505050509193909250565b60008060008360020b12610b02578260020b610b0f565b8260020b610b0f906119f8565b9050610b1e620d89e719611a15565b60020b811115610b545760405162461bcd60e51b81526020600482015260016024820152601560fa1b6044820152606401610392565b600060018216610b6857600160801b610b7a565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff1690506002821615610bb9576080610bb4826ffff97272373d413259a46990580e213a6116a0565b901c90505b6004821615610be3576080610bde826ffff2e50f5f656932ef12357cf3c7fdcc6116a0565b901c90505b6008821615610c0d576080610c08826fffe5caca7e10e4e61c3624eaa0941cd06116a0565b901c90505b6010821615610c37576080610c32826fffcb9843d60f6159c9db58835c9266446116a0565b901c90505b6020821615610c61576080610c5c826fff973b41fa98c081472e6896dfb254c06116a0565b901c90505b6040821615610c8b576080610c86826fff2ea16466c96a3843ec78b326b528616116a0565b901c90505b6080821615610cb5576080610cb0826ffe5dee046a99a2a811c461f1969c30536116a0565b901c90505b610100821615610ce0576080610cdb826ffcbe86c7900a88aedcffc83b479aa3a46116a0565b901c90505b610200821615610d0b576080610d06826ff987a7253ac413176f2b074cf7815e546116a0565b901c90505b610400821615610d36576080610d31826ff3392b0822b70005940c7a398e4b70f36116a0565b901c90505b610800821615610d61576080610d5c826fe7159475a2c29b7443b29c7fa6e889d96116a0565b901c90505b611000821615610d8c576080610d87826fd097f3bdfd2022b8845ad8f792aa58256116a0565b901c90505b612000821615610db7576080610db2826fa9f746462d870fdf8a65dc1f90e061e56116a0565b901c90505b614000821615610de2576080610ddd826f70d869a156d2a1b890bb3df62baf32f76116a0565b901c90505b618000821615610e0d576080610e08826f31be135f97d08fd981231505542fcfa66116a0565b901c90505b62010000821615610e39576080610e34826f09aa508b5b7a84e1c677de54f3e99bc96116a0565b901c90505b62020000821615610e64576080610e5f826e5d6af8dedb81196699c329225ee6046116a0565b901c90505b62040000821615610e8e576080610e89826d2216e584f5fa1ea926041bedfe986116a0565b901c90505b62080000821615610eb6576080610eb1826b048a170391f7dc42444e8fa26116a0565b901c90505b60008460020b1315610ed157610ece816000196116d5565b90505b610ee064010000000082611a38565b15610eec576001610eef565b60005b610f009060ff16602083901c6116e9565b949350505050565b600080836001600160a01b0316856001600160a01b03161115610f29579293925b846001600160a01b0316866001600160a01b031611610f5457610f4d85858561138e565b9150610f9b565b836001600160a01b0316866001600160a01b03161015610f8d57610f7986858561138e565b9150610f868587856113ff565b9050610f9b565b610f988585856113ff565b90505b94509492505050565b600054610100900460ff1680610fbd575060005460ff16155b610fd95760405162461bcd60e51b815260040161039290611874565b600054610100900460ff16158015610ffb576000805461ffff19166101011790555b611003611442565b61100b6114ac565b8015610942576000805461ff001916905550565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600081602001516001600160a01b031682600001516001600160a01b03161061109957600080fd5b815160208084015160408086015181516001600160a01b0395861681860152949092168482015262ffffff90911660608085019190915281518085038201815260808501909252815191909201206001600160f81b031960a08401529085901b6bffffffffffffffffffffffff191660a183015260b58201527fe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b5460d582015260f50160408051601f1981840301815291905280516020909101209392505050565b600081158061117e5750828261117081836116a0565b925061117c90836116d5565b145b6111b95760405162461bcd60e51b815260206004820152600c60248201526b6d756c2d6f766572666c6f7760a01b6044820152606401610392565b92915050565b6000816111ce57506000919050565b816001600160801b82106111e75760809190911c9060401b5b6801000000000000000082106112025760409190911c9060201b5b64010000000082106112195760209190911c9060101b5b62010000821061122e5760109190911c9060081b5b61010082106112425760089190911c9060041b5b601082106112555760049190911c9060021b5b600882106112615760011b5b600161126d82866116d5565b61127790836116e9565b901c9050600161128782866116d5565b61129190836116e9565b901c905060016112a182866116d5565b6112ab90836116e9565b901c905060016112bb82866116d5565b6112c590836116e9565b901c905060016112d582866116d5565b6112df90836116e9565b901c905060016112ef82866116d5565b6112f990836116e9565b901c9050600161130982866116d5565b61131390836116e9565b901c9050600061132382866116d5565b90508082106113325780611334565b815b95945050505050565b919050565b806001600160a01b038116811461133d5760405162461bcd60e51b815260206004820152601060248201526f75696e743136302d6f766572666c6f7760801b6044820152606401610392565b6000826001600160a01b0316846001600160a01b031611156113ae579192915b836001600160a01b03166113e7606060ff16846001600160801b0316901b8686036001600160a01b0316866001600160a01b031661150c565b816113f4576113f46116bf565b0490505b9392505050565b6000826001600160a01b0316846001600160a01b0316111561141f579192915b610f00826001600160801b03168585036001600160a01b0316600160601b61150c565b600054610100900460ff168061145b575060005460ff16155b6114775760405162461bcd60e51b815260040161039290611874565b600054610100900460ff1615801561100b576000805461ffff19166101011790558015610942576000805461ff001916905550565b600054610100900460ff16806114c5575060005460ff16155b6114e15760405162461bcd60e51b815260040161039290611874565b600054610100900460ff16158015611503576000805461ffff19166101011790555b61100b3361101f565b600080806000198587098587029250828110838203039150508060001415611546576000841161153b57600080fd5b5082900490506113f8565b80841161155257600080fd5b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b6000602082840312156115cd57600080fd5b5035919050565b6001600160a01b038116811461094257600080fd5b6000806000606084860312156115fe57600080fd5b8335611609816115d4565b92506020840135611619816115d4565b91506040840135611629816115d4565b809150509250925092565b60006020828403121561164657600080fd5b81356113f8816115d4565b6000806040838503121561166457600080fd5b823561166f816115d4565b9150602083013561167f816115d4565b809150509250929050565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156116ba576116ba61168a565b500290565b634e487b7160e01b600052601260045260246000fd5b6000826116e4576116e46116bf565b500490565b600082198211156116fc576116fc61168a565b500190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b805161133d816115d4565b60006020828403121561175357600080fd5b81516113f8816115d4565b60006020828403121561177057600080fd5b815160ff811681146113f857600080fd5b600181815b808511156117bc5781600019048211156117a2576117a261168a565b808516156117af57918102915b93841c9390800290611786565b509250929050565b6000826117d3575060016111b9565b816117e0575060006111b9565b81600181146117f657600281146118005761181c565b60019150506111b9565b60ff8411156118115761181161168a565b50506001821b6111b9565b5060208310610133831016604e8410600b841016171561183f575081810a6111b9565b6118498383611781565b806000190482111561185d5761185d61168a565b029392505050565b60006113f860ff8416836117c4565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b805162ffffff8116811461133d57600080fd5b8051600281900b811461133d57600080fd5b80516001600160801b038116811461133d57600080fd5b6000806000806000806000806000806000806101808d8f03121561192157600080fd5b8c516bffffffffffffffffffffffff8116811461193d57600080fd5b9b5061194b60208e01611736565b9a5061195960408e01611736565b995061196760608e01611736565b985061197560808e016118c2565b975061198360a08e016118d5565b965061199160c08e016118d5565b955061199f60e08e016118e7565b94506101008d015193506101208d015192506119be6101408e016118e7565b91506119cd6101608e016118e7565b90509295989b509295989b509295989b565b6000602082840312156119f157600080fd5b5051919050565b6000600160ff1b821415611a0e57611a0e61168a565b5060000390565b60008160020b627fffff19811415611a2f57611a2f61168a565b60000392915050565b600082611a4757611a476116bf565b50069056fea2646970667358221220e689b6b08bcdae64b455bad291fa1a5de69494b15becf4a15eaf801dd5cea7ee64736f6c63430008090033";

type V3PositionValuatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: V3PositionValuatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class V3PositionValuator__factory extends ContractFactory {
  constructor(...args: V3PositionValuatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<V3PositionValuator> {
    return super.deploy(overrides || {}) as Promise<V3PositionValuator>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): V3PositionValuator {
    return super.attach(address) as V3PositionValuator;
  }
  override connect(signer: Signer): V3PositionValuator__factory {
    return super.connect(signer) as V3PositionValuator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): V3PositionValuatorInterface {
    return new utils.Interface(_abi) as V3PositionValuatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): V3PositionValuator {
    return new Contract(address, _abi, signerOrProvider) as V3PositionValuator;
  }
}