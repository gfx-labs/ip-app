/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UniswapV3OracleRelay,
  UniswapV3OracleRelayInterface,
} from "../../../oracle/External/UniswapV3OracleRelay";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "lookback",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "pool_address",
        type: "address",
      },
      {
        internalType: "bool",
        name: "quote_token_is_token0",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "mul",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "div",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "_div",
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
    inputs: [],
    name: "_lookback",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_mul",
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
    inputs: [],
    name: "_pool",
    outputs: [
      {
        internalType: "contract IUniswapV3PoolDerivedState",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_poolAddress",
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
    name: "_quoteTokenIsToken0",
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
    name: "currentValue",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610ddc380380610ddc83398101604081905261002f9161009d565b6001805460029390935560039190915560008054931515600160a01b9081026001600160a81b03199095166001600160a01b039687161794909417908190556001600160a01b031963ffffffff909616909302949094166001600160c01b0319909116179116179055610115565b600080600080600060a086880312156100b557600080fd5b855163ffffffff811681146100c957600080fd5b60208701519095506001600160a01b03811681146100e657600080fd5b604087015190945080151581146100fc57600080fd5b6060870151608090970151959894975095949392505050565b610cb8806101246000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80637186c7aa1161005b5780637186c7aa146100ec578063aa8ca7b6146100f5578063bcabc258146100fe578063e55ee40b1461011157600080fd5b80635541214314610082578063636fc28b146100ab578063698996f8146100d6575b600080fd5b60005461009690600160a01b900460ff1681565b60405190151581526020015b60405180910390f35b6001546100be906001600160a01b031681565b6040516001600160a01b0390911681526020016100a2565b6100de61013d565b6040519081526020016100a2565b6100de60025481565b6100de60035481565b6000546100be906001600160a01b031681565b60015461012890600160a01b900463ffffffff1681565b60405163ffffffff90911681526020016100a2565b60015460009061015990600160a01b900463ffffffff1661015e565b905090565b6040805160028082526060828101909352600092918391816020016020820280368337019050509050838160008151811061019b5761019b610825565b602002602001019063ffffffff16908163ffffffff16815250506000816001815181106101ca576101ca610825565b63ffffffff9092166020928302919091019091015260015460405163883bdbfd60e01b81526001600160a01b039091169063883bdbfd9061020f90849060040161083b565b60006040518083038186803b15801561022757600080fd5b505afa15801561023b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610263919081019061095b565b5080925050600084905060008360018151811061028257610282610825565b60200260200101518460008151811061029d5761029d610825565b60200260200101516102af9190610a3d565b90506000808260060b129050600081156102d3576102cc83610a8d565b90506102d6565b50815b60006102e863ffffffff861683610aca565b9050620d89e88166ffffffffffffff16106103405760405162461bcd60e51b8152602060048201526013602482015272151a58dac81d1a5b5948191a59998819985a5b606a1b60448201526064015b60405180910390fd5b600083156103585761035182610af0565b905061035b565b50805b600160c01b600261036b836103f2565b6001600160a01b031661037e9190610bf0565b61039090670de0b6b3a7640000610c06565b61039a9190610c25565b600054909950600160a01b900460ff166103ca576103c7896ec097ce7bc90715b34b9f1000000000610c25565b98505b6003546002546103da908b610c06565b6103e49190610c25565b9a9950505050505050505050565b60008060008360020b12610409578260020b610416565b8260020b61041690610c39565b9050610425620d89e719610af0565b60020b81111561045b5760405162461bcd60e51b81526020600482015260016024820152601560fa1b6044820152606401610337565b60006001821661046f57600160801b610481565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff16905060028216156104c05760806104bb826ffff97272373d413259a46990580e213a610c06565b901c90505b60048216156104ea5760806104e5826ffff2e50f5f656932ef12357cf3c7fdcc610c06565b901c90505b600882161561051457608061050f826fffe5caca7e10e4e61c3624eaa0941cd0610c06565b901c90505b601082161561053e576080610539826fffcb9843d60f6159c9db58835c926644610c06565b901c90505b6020821615610568576080610563826fff973b41fa98c081472e6896dfb254c0610c06565b901c90505b604082161561059257608061058d826fff2ea16466c96a3843ec78b326b52861610c06565b901c90505b60808216156105bc5760806105b7826ffe5dee046a99a2a811c461f1969c3053610c06565b901c90505b6101008216156105e75760806105e2826ffcbe86c7900a88aedcffc83b479aa3a4610c06565b901c90505b61020082161561061257608061060d826ff987a7253ac413176f2b074cf7815e54610c06565b901c90505b61040082161561063d576080610638826ff3392b0822b70005940c7a398e4b70f3610c06565b901c90505b610800821615610668576080610663826fe7159475a2c29b7443b29c7fa6e889d9610c06565b901c90505b61100082161561069357608061068e826fd097f3bdfd2022b8845ad8f792aa5825610c06565b901c90505b6120008216156106be5760806106b9826fa9f746462d870fdf8a65dc1f90e061e5610c06565b901c90505b6140008216156106e95760806106e4826f70d869a156d2a1b890bb3df62baf32f7610c06565b901c90505b61800082161561071457608061070f826f31be135f97d08fd981231505542fcfa6610c06565b901c90505b6201000082161561074057608061073b826f09aa508b5b7a84e1c677de54f3e99bc9610c06565b901c90505b6202000082161561076b576080610766826e5d6af8dedb81196699c329225ee604610c06565b901c90505b62040000821615610795576080610790826d2216e584f5fa1ea926041bedfe98610c06565b901c90505b620800008216156107bd5760806107b8826b048a170391f7dc42444e8fa2610c06565b901c90505b60008460020b13156107d8576107d581600019610c25565b90505b6107e764010000000082610c56565b156107f35760016107f6565b60005b6108079060ff16602083901c610c6a565b949350505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6020808252825182820181905260009190848201906040850190845b8181101561087957835163ffffffff1683529284019291840191600101610857565b50909695505050505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156108ae576108ae61080f565b604052919050565b600067ffffffffffffffff8211156108d0576108d061080f565b5060051b60200190565b600082601f8301126108eb57600080fd5b815160206109006108fb836108b6565b610885565b82815260059290921b8401810191818101908684111561091f57600080fd5b8286015b848110156109505780516001600160a01b03811681146109435760008081fd5b8352918301918301610923565b509695505050505050565b6000806040838503121561096e57600080fd5b825167ffffffffffffffff8082111561098657600080fd5b818501915085601f83011261099a57600080fd5b815160206109aa6108fb836108b6565b82815260059290921b840181019181810190898411156109c957600080fd5b948201945b838610156109f75785518060060b81146109e85760008081fd5b825294820194908201906109ce565b91880151919650909350505080821115610a1057600080fd5b50610a1d858286016108da565b9150509250929050565b634e487b7160e01b600052601160045260246000fd5b60008160060b8360060b6000811281667fffffffffffff1901831281151615610a6857610a68610a27565b81667fffffffffffff018313811615610a8357610a83610a27565b5090039392505050565b60008160060b667fffffffffffff19811415610aab57610aab610a27565b60000392915050565b634e487b7160e01b600052601260045260246000fd5b600066ffffffffffffff80841680610ae457610ae4610ab4565b92169190910492915050565b60008160020b627fffff19811415610aab57610aab610a27565b600181815b80851115610b45578160001904821115610b2b57610b2b610a27565b80851615610b3857918102915b93841c9390800290610b0f565b509250929050565b600082610b5c57506001610bea565b81610b6957506000610bea565b8160018114610b7f5760028114610b8957610ba5565b6001915050610bea565b60ff841115610b9a57610b9a610a27565b50506001821b610bea565b5060208310610133831016604e8410600b8410161715610bc8575081810a610bea565b610bd28383610b0a565b8060001904821115610be657610be6610a27565b0290505b92915050565b6000610bff60ff841683610b4d565b9392505050565b6000816000190483118215151615610c2057610c20610a27565b500290565b600082610c3457610c34610ab4565b500490565b6000600160ff1b821415610c4f57610c4f610a27565b5060000390565b600082610c6557610c65610ab4565b500690565b60008219821115610c7d57610c7d610a27565b50019056fea2646970667358221220012f38a07af710a43e2f3f959b4bfbabf3e4effce40e0b3c96d9c8bb1984382c64736f6c63430008090033";

type UniswapV3OracleRelayConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniswapV3OracleRelayConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniswapV3OracleRelay__factory extends ContractFactory {
  constructor(...args: UniswapV3OracleRelayConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    lookback: BigNumberish,
    pool_address: string,
    quote_token_is_token0: boolean,
    mul: BigNumberish,
    div: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UniswapV3OracleRelay> {
    return super.deploy(
      lookback,
      pool_address,
      quote_token_is_token0,
      mul,
      div,
      overrides || {}
    ) as Promise<UniswapV3OracleRelay>;
  }
  override getDeployTransaction(
    lookback: BigNumberish,
    pool_address: string,
    quote_token_is_token0: boolean,
    mul: BigNumberish,
    div: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      lookback,
      pool_address,
      quote_token_is_token0,
      mul,
      div,
      overrides || {}
    );
  }
  override attach(address: string): UniswapV3OracleRelay {
    return super.attach(address) as UniswapV3OracleRelay;
  }
  override connect(signer: Signer): UniswapV3OracleRelay__factory {
    return super.connect(signer) as UniswapV3OracleRelay__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV3OracleRelayInterface {
    return new utils.Interface(_abi) as UniswapV3OracleRelayInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV3OracleRelay {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as UniswapV3OracleRelay;
  }
}