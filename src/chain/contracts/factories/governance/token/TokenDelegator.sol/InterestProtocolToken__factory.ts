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
  InterestProtocolToken,
  InterestProtocolTokenInterface,
} from "../../../../governance/token/TokenDelegator.sol/InterestProtocolToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "address",
        name: "implementation_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "initialSupply_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "oldName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newName",
        type: "string",
      },
    ],
    name: "ChangedName",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "oldSybmol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newSybmol",
        type: "string",
      },
    ],
    name: "ChangedSymbol",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldMinter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newMinter",
        type: "address",
      },
    ],
    name: "MinterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldImplementation",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "NewImplementation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation_",
        type: "address",
      },
    ],
    name: "_setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode = "";

type InterestProtocolTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InterestProtocolTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InterestProtocolToken__factory extends ContractFactory {
  constructor(...args: InterestProtocolTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    account_: string,
    owner_: string,
    implementation_: string,
    initialSupply_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<InterestProtocolToken> {
    return super.deploy(
      account_,
      owner_,
      implementation_,
      initialSupply_,
      overrides || {}
    ) as Promise<InterestProtocolToken>;
  }
  override getDeployTransaction(
    account_: string,
    owner_: string,
    implementation_: string,
    initialSupply_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      account_,
      owner_,
      implementation_,
      initialSupply_,
      overrides || {}
    );
  }
  override attach(address: string): InterestProtocolToken {
    return super.attach(address) as InterestProtocolToken;
  }
  override connect(signer: Signer): InterestProtocolToken__factory {
    return super.connect(signer) as InterestProtocolToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InterestProtocolTokenInterface {
    return new utils.Interface(_abi) as InterestProtocolTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InterestProtocolToken {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as InterestProtocolToken;
  }
}
