/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  NftVaultController,
  NftVaultControllerInterface,
} from "../../pools/NftVaultController";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nft_vault_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vaultId",
        type: "uint256",
      },
    ],
    name: "NewNftVault",
    type: "event",
  },
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
    inputs: [
      {
        internalType: "uint96",
        name: "vault_id",
        type: "uint96",
      },
    ],
    name: "NftVaultAddress",
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
        name: "nft_vault_address",
        type: "address",
      },
    ],
    name: "NftVaultId",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_CollateralToken_underlying",
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
    name: "_nfpManager",
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
    name: "_nftVaultAddress_vaultId",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_underlying_CollateralToken",
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
    name: "_vaultAddress_vaultId",
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
    name: "_vaultController",
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
    inputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    name: "_vaultId_nftVaultAddress",
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
        name: "vaultController_",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint96",
        name: "id",
        type: "uint96",
      },
    ],
    name: "mintVault",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
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
        name: "capped_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "underlying_address",
        type: "address",
      },
    ],
    name: "registerUnderlying",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nft_vault",
        type: "address",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "retrieveUnderlying",
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
        internalType: "address",
        name: "vault_address",
        type: "address",
      },
    ],
    name: "vaultId",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506112b2806100206000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80637810f1eb116100a2578063b6a5578d11610071578063b6a5578d146102d3578063c2109851146102fc578063c4d66de81461030f578063f2fde38b14610322578063f98c53541461033557600080fd5b80637810f1eb146102735780638da5cb5b14610286578063ace22d0e14610297578063b1290dad146102c057600080fd5b80635eebb1f5116100de5780635eebb1f5146101f25780636a42914e14610224578063715018a6146102375780637726a73c1461024157600080fd5b8063021950cf146101105780630b2ee3bd14610156578063265ecb37146101a057806328e5392b146101c9575b600080fd5b61013961011e3660046109fa565b6069602052600090815260409020546001600160601b031681565b6040516001600160601b0390911681526020015b60405180910390f35b610188610164366004610a1e565b6001600160601b03166000908152606860205260409020546001600160a01b031690565b6040516001600160a01b03909116815260200161014d565b6101886101ae3660046109fa565b606a602052600090815260409020546001600160a01b031681565b6101396101d73660046109fa565b6067602052600090815260409020546001600160601b031681565b6101396102003660046109fa565b6001600160a01b03166000908152606960205260409020546001600160601b031690565b606654610188906001600160a01b031681565b61023f610348565b005b61013961024f3660046109fa565b6001600160a01b03166000908152606760205260409020546001600160601b031690565b61023f610281366004610a47565b610387565b6033546001600160a01b0316610188565b6101886102a53660046109fa565b606b602052600090815260409020546001600160a01b031681565b606554610188906001600160a01b031681565b6101886102e1366004610a1e565b6068602052600090815260409020546001600160a01b031681565b61023f61030a366004610a89565b61049b565b61023f61031d3660046109fa565b610519565b61023f6103303660046109fa565b6105a9565b610188610343366004610a1e565b610644565b6033546001600160a01b0316331461037b5760405162461bcd60e51b815260040161037290610ac2565b60405180910390fd5b6103856000610841565b565b6001600160a01b0382166103cd5760405162461bcd60e51b815260206004820152600d60248201526c1a5b9d985b1a59081d985d5b1d609a1b6044820152606401610372565b336000908152606b60205260409020546001600160a01b0316806104275760405162461bcd60e51b815260206004820152601160248201527037b7363c9031b0b83832b2103a37b5b2b760791b6044820152606401610372565b6040516302354d7760e51b81526001600160a01b0382811660048301528381166024830152604482018690528491908216906346a9aee090606401600060405180830381600087803b15801561047c57600080fd5b505af1158015610490573d6000803e3d6000fd5b505050505050505050565b6033546001600160a01b031633146104c55760405162461bcd60e51b815260040161037290610ac2565b6001600160a01b039081166000818152606a602090815260408083208054959096166001600160a01b03199586168117909655948252606b9052929092208054821683179055606680549091169091179055565b600054610100900460ff1680610532575060005460ff16155b61054e5760405162461bcd60e51b815260040161037290610af7565b600054610100900460ff16158015610570576000805461ffff19166101011790555b610578610893565b606580546001600160a01b0319166001600160a01b03841617905580156105a5576000805461ff00191690555b5050565b6033546001600160a01b031633146105d35760405162461bcd60e51b815260040161037290610ac2565b6001600160a01b0381166106385760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610372565b61064181610841565b50565b6001600160601b0381166000908152606860205260408120546001600160a01b031661081c5760655460405163d912c42760e01b81526001600160601b03841660048201526000916001600160a01b03169063d912c4279060240160206040518083038186803b1580156106b757600080fd5b505afa1580156106cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ef9190610b45565b90506001600160a01b0381161561081a57606554604051600091859184916001600160a01b0316903090610722906109d8565b6001600160601b0390941684526001600160a01b0392831660208501529082166040840152166060820152608001604051809103906000f08015801561076c573d6000803e3d6000fd5b506001600160601b038516600081815260686020908152604080832080546001600160a01b0319166001600160a01b0387811691821790925590881684526067835281842080546bffffffffffffffffffffffff1990811687179091558185526069845293829020805490941685179093558051928352908201929092529192507fc93faf2aec45c4d1f2b6e0f251cf687ac62c2cb325b93d286a3d185926cae345910160405180910390a1505b505b506001600160601b03166000908152606860205260409020546001600160a01b031690565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16806108ac575060005460ff16155b6108c85760405162461bcd60e51b815260040161037290610af7565b600054610100900460ff161580156108ea576000805461ffff19166101011790555b6108f261090e565b6108fa610978565b8015610641576000805461ff001916905550565b600054610100900460ff1680610927575060005460ff16155b6109435760405162461bcd60e51b815260040161037290610af7565b600054610100900460ff161580156108fa576000805461ffff19166101011790558015610641576000805461ff001916905550565b600054610100900460ff1680610991575060005460ff16155b6109ad5760405162461bcd60e51b815260040161037290610af7565b600054610100900460ff161580156109cf576000805461ffff19166101011790555b6108fa33610841565b61071a80610b6383390190565b6001600160a01b038116811461064157600080fd5b600060208284031215610a0c57600080fd5b8135610a17816109e5565b9392505050565b600060208284031215610a3057600080fd5b81356001600160601b0381168114610a1757600080fd5b600080600060608486031215610a5c57600080fd5b833592506020840135610a6e816109e5565b91506040840135610a7e816109e5565b809150509250925092565b60008060408385031215610a9c57600080fd5b8235610aa7816109e5565b91506020830135610ab7816109e5565b809150509250929050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b600060208284031215610b5757600080fd5b8151610a17816109e556fe608060405234801561001057600080fd5b5060405161071a38038061071a83398101604081905261002f916100b8565b604080518082019091526001600160601b039094168085526001600160a01b0393841660209095018590526c01000000000000000000000000909402909317600055600280549183166001600160a01b03199283161790556001805493909216921691909117905561011a565b80516001600160a01b03811681146100b357600080fd5b919050565b600080600080608085870312156100ce57600080fd5b84516001600160601b03811681146100e557600080fd5b93506100f36020860161009c565b92506101016040860161009c565b915061010f6060860161009c565b905092959194509250565b6105f1806101296000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639b5043871161005b5780639b50438714610132578063a10ecfb314610145578063af640d0f14610158578063dd3f95261461017357600080fd5b80630fe365361461008d57806335369662146100be57806346a9aee01461010a5780638d3c100a1461011f575b600080fd5b600054600160601b90046001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b6000546100e3906001600160601b03811690600160601b90046001600160a01b031682565b604080516001600160601b0390931683526001600160a01b039091166020830152016100b5565b61011d610118366004610502565b610186565b005b61011d61012d366004610543565b61025b565b61011d610140366004610502565b610487565b6001546100a1906001600160a01b031681565b6000546040516001600160601b0390911681526020016100b5565b6002546100a1906001600160a01b031681565b6001546001600160a01b0316336001600160a01b0316146101ee5760405162461bcd60e51b815260206004820152601d60248201527f73656e646572206e6f74204e66745661756c74436f6e74726f6c6c657200000060448201526064015b60405180910390fd5b6040516323b872dd60e01b81523060048201526001600160a01b038381166024830152604482018390528416906323b872dd90606401600060405180830381600087803b15801561023e57600080fd5b505af1158015610252573d6000803e3d6000fd5b50505050505050565b60008001600c9054906101000a90046001600160a01b03166001600160a01b031663075461726040518163ffffffff1660e01b815260040160206040518083038186803b1580156102ab57600080fd5b505afa1580156102bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e39190610573565b6001600160a01b0316336001600160a01b0316146103375760405162461bcd60e51b815260206004820152601160248201527039b2b73232b9103737ba1036b4b73a32b960791b60448201526064016101e5565b6001546040805163352148a760e11b815290516000926001600160a01b031691636a42914e916004808301926020929190829003018186803b15801561037c57600080fd5b505afa158015610390573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b49190610573565b604080516080810182528581526001600160a01b03858116602083019081526fffffffffffffffffffffffffffffffff83850181815260608501828152955163fc6f786560e01b8152945160048601529151831660248501529051811660448401529251909216606482015291925082169063fc6f7865906084016040805180830381600087803b15801561044857600080fd5b505af115801561045c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104809190610597565b5050505050565b6002546001600160a01b0316336001600160a01b0316146101ee5760405162461bcd60e51b815260206004820152601a60248201527f73656e646572206e6f74205661756c74436f6e74726f6c6c657200000000000060448201526064016101e5565b6001600160a01b03811681146104ff57600080fd5b50565b60008060006060848603121561051757600080fd5b8335610522816104ea565b92506020840135610532816104ea565b929592945050506040919091013590565b6000806040838503121561055657600080fd5b823591506020830135610568816104ea565b809150509250929050565b60006020828403121561058557600080fd5b8151610590816104ea565b9392505050565b600080604083850312156105aa57600080fd5b50508051602090910151909290915056fea26469706673582212209fc950255033e9a8274c3844b8f2273eed56f9f8f59edcfd371f117b0f57d05c64736f6c63430008090033a264697066735822122011df825e54ec20be1ae0376122b5c99f886faac880e00056a48fab777e30685f64736f6c63430008090033";

type NftVaultControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NftVaultControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NftVaultController__factory extends ContractFactory {
  constructor(...args: NftVaultControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NftVaultController> {
    return super.deploy(overrides || {}) as Promise<NftVaultController>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NftVaultController {
    return super.attach(address) as NftVaultController;
  }
  override connect(signer: Signer): NftVaultController__factory {
    return super.connect(signer) as NftVaultController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NftVaultControllerInterface {
    return new utils.Interface(_abi) as NftVaultControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NftVaultController {
    return new Contract(address, _abi, signerOrProvider) as NftVaultController;
  }
}
