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
  import type { PromiseOrValue } from "../../../common";
  import type {
    VaultNft,
    VaultNftInterface,
  } from "../../../pools/VaultNft";
  
  const _abi = [
    {
      inputs: [
        {
          internalType: "uint96",
          name: "id_",
          type: "uint96",
        },
        {
          internalType: "address",
          name: "minter_",
          type: "address",
        },
        {
          internalType: "address",
          name: "controller_address",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "token_address",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "token_address",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdraw",
      type: "event",
    },
    {
      inputs: [],
      name: "_baseLiability",
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
      name: "_controller",
      outputs: [
        {
          internalType: "contract IVaultController",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_vaultInfo",
      outputs: [
        {
          internalType: "uint96",
          name: "id",
          type: "uint96",
        },
        {
          internalType: "address",
          name: "minter",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "baseLiability",
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
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "controllerTransfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "delegatee",
          type: "address",
        },
        {
          internalType: "address",
          name: "token_address",
          type: "address",
        },
      ],
      name: "delegateCompLikeTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "id",
      outputs: [
        {
          internalType: "uint96",
          name: "",
          type: "uint96",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "minter",
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
          internalType: "bool",
          name: "increase",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "base_amount",
          type: "uint256",
        },
      ],
      name: "modifyLiability",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "addr",
          type: "address",
        },
      ],
      name: "tokenBalance",
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
          internalType: "address",
          name: "token_address",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawErc20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const;
  
  const _bytecode =
    "0x60a060405234801561001057600080fd5b50604051610c06380380610c0683398101604081905261002f91610096565b604080518082019091526001600160601b039093168084526001600160a01b0392831660209094018490526c01000000000000000000000000909302909217600055166080526100e7565b80516001600160a01b038116811461009157600080fd5b919050565b6000806000606084860312156100ab57600080fd5b83516001600160601b03811681146100c257600080fd5b92506100d06020850161007a565b91506100de6040850161007a565b90509250925092565b608051610aef61011760003960008181610198015281816102ae015281816103be01526104c90152610aef6000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063af640d0f11610071578063af640d0f14610165578063bd1f4b5214610180578063dd3f952614610193578063dfabefe7146101ba578063eedc966a146101cd578063fe84d0ae146101e057600080fd5b806307546172146100ae5780632f10b47a146100df57806335369662146100f45780639b50438714610140578063adef15bc14610153575b600080fd5b600054600160601b90046001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b6100f26100ed3660046108dc565b6101e9565b005b600054610119906001600160601b03811690600160601b90046001600160a01b031682565b604080516001600160601b0390931683526001600160a01b039091166020830152016100d6565b6100f261014e36600461090f565b6102ab565b6001545b6040519081526020016100d6565b6000546040516001600160601b0390911681526020016100d6565b6100f261018e36600461094b565b610333565b6100c27f000000000000000000000000000000000000000000000000000000000000000081565b6101576101c8366004610986565b6104c4565b6101576101db3660046109a4565b6105b9565b61015760015481565b600054600160601b90046001600160a01b0316336001600160a01b03161461024c5760405162461bcd60e51b815260206004820152601160248201527039b2b73232b9103737ba1036b4b73a32b960791b60448201526064015b60405180910390fd5b6040516317066a5760e21b81526001600160a01b038381166004830152821690635c19a95c90602401600060405180830381600087803b15801561028f57600080fd5b505af11580156102a3573d6000803e3d6000fd5b505050505050565b337f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316146103235760405162461bcd60e51b815260206004820152601a60248201527f73656e646572206e6f74205661756c74436f6e74726f6c6c65720000000000006044820152606401610243565b61032e838383610639565b505050565b600054600160601b90046001600160a01b0316336001600160a01b0316146103915760405162461bcd60e51b815260206004820152601160248201527039b2b73232b9103737ba1036b4b73a32b960791b6044820152606401610243565b61039c823383610639565b60005460405163997d7b3d60e01b81526001600160601b0390911660048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063997d7b3d9060240160206040518083038186803b15801561040857600080fd5b505afa15801561041c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044091906109bf565b61047e5760405162461bcd60e51b815260206004820152600f60248201526e1bdd995c8b5dda5d1a191c985dd85b608a1b6044820152606401610243565b604080516001600160a01b0384168152602081018390527f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364910160405180910390a15050565b6000337f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03161461053e5760405162461bcd60e51b815260206004820152601a60248201527f73656e646572206e6f74205661756c74436f6e74726f6c6c65720000000000006044820152606401610243565b821561055a578160015461055291906109f2565b6001556105af565b81600154101561059d5760405162461bcd60e51b815260206004820152600e60248201526d0e4cae0c2f240e8dede40daeac6d60931b6044820152606401610243565b816001546105ab9190610a0a565b6001555b5060015492915050565b6040516370a0823160e01b81523060048201526000906001600160a01b038316906370a082319060240160206040518083038186803b1580156105fb57600080fd5b505afa15801561060f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106339190610a21565b92915050565b604080516001600160a01b03848116602483015260448083018590528351808403909101815260649092018352602080830180516001600160e01b031663a9059cbb60e01b17905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65649084015261032e928692916000916106c9918516908490610746565b80519091501561032e57808060200190518101906106e791906109bf565b61032e5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610243565b6060610755848460008561075f565b90505b9392505050565b6060824710156107c05760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610243565b843b61080e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610243565b600080866001600160a01b0316858760405161082a9190610a6a565b60006040518083038185875af1925050503d8060008114610867576040519150601f19603f3d011682016040523d82523d6000602084013e61086c565b606091505b509150915061087c828286610887565b979650505050505050565b60608315610896575081610758565b8251156108a65782518084602001fd5b8160405162461bcd60e51b81526004016102439190610a86565b80356001600160a01b03811681146108d757600080fd5b919050565b600080604083850312156108ef57600080fd5b6108f8836108c0565b9150610906602084016108c0565b90509250929050565b60008060006060848603121561092457600080fd5b61092d846108c0565b925061093b602085016108c0565b9150604084013590509250925092565b6000806040838503121561095e57600080fd5b610967836108c0565b946020939093013593505050565b801515811461098357600080fd5b50565b6000806040838503121561099957600080fd5b823561096781610975565b6000602082840312156109b657600080fd5b610758826108c0565b6000602082840312156109d157600080fd5b815161075881610975565b634e487b7160e01b600052601160045260246000fd5b60008219821115610a0557610a056109dc565b500190565b600082821015610a1c57610a1c6109dc565b500390565b600060208284031215610a3357600080fd5b5051919050565b60005b83811015610a55578181015183820152602001610a3d565b83811115610a64576000848401525b50505050565b60008251610a7c818460208701610a3a565b9190910192915050565b6020815260008251806020840152610aa5816040850160208701610a3a565b601f01601f1916919091016040019291505056fea26469706673582212202eab8b9c55ef318ab36eff1e1743fbee14d4737802b910338ea210eae955148664736f6c63430008090033";
  
  type VaultConstructorParams =
    | [signer?: Signer]
    | ConstructorParameters<typeof ContractFactory>;
  
  const isSuperArgs = (
    xs: VaultConstructorParams
  ): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;
  
  export class VaultNft__factory extends ContractFactory {
    constructor(...args: VaultConstructorParams) {
      if (isSuperArgs(args)) {
        super(...args);
      } else {
        super(_abi, _bytecode, args[0]);
      }
    }
  
    override deploy(
      id_: PromiseOrValue<BigNumberish>,
      minter_: PromiseOrValue<string>,
      controller_address: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<VaultNft> {
      return super.deploy(
        id_,
        minter_,
        controller_address,
        overrides || {}
      ) as Promise<VaultNft>;
    }
    override getDeployTransaction(
      id_: PromiseOrValue<BigNumberish>,
      minter_: PromiseOrValue<string>,
      controller_address: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): TransactionRequest {
      return super.getDeployTransaction(
        id_,
        minter_,
        controller_address,
        overrides || {}
      );
    }
    override attach(address: string): VaultNft {
      return super.attach(address) as VaultNft;
    }
    override connect(signer: Signer): VaultNft__factory {
      return super.connect(signer) as VaultNft__factory;
    }
  
    static readonly bytecode = _bytecode;
    static readonly abi = _abi;
    static createInterface(): VaultNftInterface {
      return new utils.Interface(_abi) as VaultNftInterface;
    }
    static connect(address: string, signerOrProvider: Signer | Provider): VaultNft {
      return new Contract(address, _abi, signerOrProvider) as VaultNft;
    }
  }