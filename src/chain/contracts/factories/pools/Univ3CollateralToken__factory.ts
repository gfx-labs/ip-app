/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Univ3CollateralToken,
  Univ3CollateralTokenInterface,
} from "../../pools/Univ3CollateralToken";

const _abi = [
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
        name: "value",
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_nftVaultController",
    outputs: [
      {
        internalType: "contract NftVaultController",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_positionValuator",
    outputs: [
      {
        internalType: "contract V3PositionValuator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_underlying",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_underlyingOwners",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        internalType: "uint96",
        name: "vaultId",
        type: "uint96",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "depositedPositions",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "underlying_",
        type: "address",
      },
      {
        internalType: "address",
        name: "vaultController_",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftVaultController_",
        type: "address",
      },
      {
        internalType: "address",
        name: "positionValuator_",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "positionIndex",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611f25806100206000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c806395d89b41116100b8578063b1290dad1161007c578063b1290dad146102a0578063b66c72ac146102b3578063c67f702a146102c6578063dd62ed3e146102d9578063e56f2fe414610312578063f2fde38b1461032557600080fd5b806395d89b411461024c5780639e57366514610254578063a457c2d714610267578063a9059cbb1461027a578063aa3d45811461028d57600080fd5b806331add0221161010a57806331add022146101c057806339509351146101e05780634925776a146101f357806370a082311461021e578063715018a6146102315780638da5cb5b1461023b57600080fd5b806306fdde0314610147578063095ea7b31461016557806318160ddd1461018857806323b872dd1461019a578063313ce567146101b1575b600080fd5b61014f610338565b60405161015c91906119ec565b60405180910390f35b610178610173366004611a56565b6103ca565b604051901515815260200161015c565b6067545b60405190815260200161015c565b6101786101a8366004611a82565b60009392505050565b6040516012815260200161015c565b6101d36101ce366004611ac3565b6103e1565b60405161015c9190611ae7565b6101786101ee366004611a56565b61044d565b609954610206906001600160a01b031681565b6040516001600160a01b03909116815260200161015c565b61018c61022c366004611ac3565b610489565b61023961065c565b005b6033546001600160a01b0316610206565b61014f6106c2565b609754610206906001600160a01b031681565b610178610275366004611a56565b6106d1565b610178610288366004611a56565b61076a565b609a54610206906001600160a01b031681565b609854610206906001600160a01b031681565b6102396102c1366004611b40565b610bc9565b61018c6102d4366004611a56565b610eef565b61018c6102e7366004611b70565b6001600160a01b03918216600090815260666020908152604080832093909416825291909152205490565b610239610320366004611c41565b610f20565b610239610333366004611ac3565b610ff8565b60606068805461034790611cf0565b80601f016020809104026020016040519081016040528092919081815260200182805461037390611cf0565b80156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b5050505050905090565b60006103d73384846110c3565b5060015b92915050565b6001600160a01b0381166000908152609b602090815260409182902080548351818402810184019094528084526060939283018282801561044157602002820191906000526020600020905b81548152602001906001019080831161042d575b50505050509050919050565b3360008181526066602090815260408083206001600160a01b038716845290915281205490916103d7918590610484908690611d41565b6110c3565b6000808290506000816001600160a01b031663af640d0f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104ca57600080fd5b505afa1580156104de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105029190611d59565b6001600160601b03161161055d5760405162461bcd60e51b815260206004820181905260248201527f556e697633436f6c6c61746572616c546f6b656e3a204f6e6c795661756c747360448201526064015b60405180910390fd5b6000816001600160a01b031663075461726040518163ffffffff1660e01b815260040160206040518083038186803b15801561059857600080fd5b505afa1580156105ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d09190611d76565b90506000805b6001600160a01b0383166000908152609b6020526040902054811015610653576001600160a01b0383166000908152609b60205260409020805461063591908390811061062557610625611d93565b90600052602060002001546111e7565b61063f9083611d41565b91508061064b81611da9565b9150506105d6565b50949350505050565b6033546001600160a01b031633146106b65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610554565b6106c06000611272565b565b60606069805461034790611cf0565b3360009081526066602090815260408083206001600160a01b0386168452909152812054828110156107535760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610554565b61076033858584036110c3565b5060019392505050565b6000803390506000816001600160a01b031663af640d0f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156107ab57600080fd5b505afa1580156107bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e39190611d59565b6001600160601b0316116108275760405162461bcd60e51b815260206004820152600b60248201526a4f6e6c79205661756c747360a81b6044820152606401610554565b6000816001600160a01b031663075461726040518163ffffffff1660e01b815260040160206040518083038186803b15801561086257600080fd5b505afa158015610876573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089a9190611d76565b90506000609960009054906101000a90046001600160a01b03166001600160a01b0316630b2ee3bd846001600160a01b031663af640d0f6040518163ffffffff1660e01b815260040160206040518083038186803b1580156108fb57600080fd5b505afa15801561090f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109339190611d59565b6040516001600160e01b031960e084901b1681526001600160601b03909116600482015260240160206040518083038186803b15801561097257600080fd5b505afa158015610986573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109aa9190611d76565b90506001600160a01b0381166109f05760405162461bcd60e51b815260206004820152600b60248201526a1b9bc815985d5b1d13999d60aa1b6044820152606401610554565b6001600160a01b0382166000908152609b6020526040902054851015610ace576001600160a01b0382166000908152609b60205260408120805487908110610a3a57610a3a611d93565b600091825260209091200154609954604051637810f1eb60e01b8152600481018390526001600160a01b0385811660248301528a81166044830152929350911690637810f1eb90606401600060405180830381600087803b158015610a9e57600080fd5b505af1158015610ab2573d6000803e3d6000fd5b50505050610ac083826112c4565b5060019450505050506103db565b60005b6001600160a01b0383166000908152609b6020526040902054811015610bb2576001600160a01b0383166000908152609b60205260408120805483908110610b1b57610b1b611d93565b9060005260206000200154905080600014610b9f57609954604051637810f1eb60e01b8152600481018390526001600160a01b0385811660248301528a8116604483015290911690637810f1eb90606401600060405180830381600087803b158015610b8657600080fd5b505af1158015610b9a573d6000803e3d6000fd5b505050505b5080610baa81611da9565b915050610ad1565b50610bbc826113ee565b5060019695505050505050565b609c5460ff1615610c095760405162461bcd60e51b815260206004820152600a6024820152695265656e7472616e637960b01b6044820152606401610554565b609c805460ff19166001179055609954604051630b2ee3bd60e01b81526001600160601b03831660048201526000916001600160a01b031690630b2ee3bd9060240160206040518083038186803b158015610c6357600080fd5b505afa158015610c77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9b9190611d76565b90506001600160a01b038116610ce75760405162461bcd60e51b81526020600482015260116024820152701a5b9d985b1a59081b999d081d985d5b1d607a1b6044820152606401610554565b609a5460405163e15a879760e01b8152600481018590526001600160a01b039091169063e15a87979060240160806040518083038186803b158015610d2b57600080fd5b505afa158015610d3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d639190611ddb565b5060985460405163d912c42760e01b81526001600160601b03841660048201526000916001600160a01b03169063d912c4279060240160206040518083038186803b158015610db157600080fd5b505afa158015610dc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de99190611d76565b9050610e65816001600160a01b031663075461726040518163ffffffff1660e01b815260040160206040518083038186803b158015610e2757600080fd5b505afa158015610e3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5f9190611d76565b85611421565b6097546001600160a01b03166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b039182166004820152908516602482015260448101879052606401600060405180830381600087803b158015610ec757600080fd5b505af1158015610edb573d6000803e3d6000fd5b5050609c805460ff19169055505050505050565b609b6020528160005260406000208181548110610f0b57600080fd5b90600052602060002001600091509150505481565b600054610100900460ff1680610f39575060005460ff16155b610f555760405162461bcd60e51b815260040161055490611e71565b600054610100900460ff16158015610f77576000805461ffff19166101011790555b610f7f61148c565b610f898787611507565b609780546001600160a01b038088166001600160a01b031992831617909255609a8054858416908316179055609880548784169083161790556099805492861692909116919091179055609c805460ff191690558015610fef576000805461ff00191690555b50505050505050565b6033546001600160a01b031633146110525760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610554565b6001600160a01b0381166110b75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610554565b6110c081611272565b50565b6001600160a01b0383166111255760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610554565b6001600160a01b0382166111865760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610554565b6001600160a01b0383811660008181526066602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000816111f657506000919050565b609a546040516307fa648b60e11b8152600481018490526001600160a01b0390911690630ff4c9169060240160206040518083038186803b15801561123a57600080fd5b505afa15801561124e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103db9190611ebf565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000805b6001600160a01b0384166000908152609b60205260409020548110156113e4576001600160a01b0384166000908152609b6020526040902080548491908390811061131557611315611d93565b906000526020600020015414156113d2576113a381609b6000876001600160a01b03166001600160a01b0316815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561139957602002820191906000526020600020905b815481526020019060010190808311611385575b5050505050611587565b6001600160a01b0385166000908152609b6020908152604090912082516113d09391929190910190611919565b505b806113dc81611da9565b9150506112c8565b5060009392505050565b60408051600080825260208083018085526001600160a01b0386168352609b909152928120915190926103d79291611919565b806114605760405162461bcd60e51b815260206004820152600f60248201526e1a5b9d985b1a59081d1bdad95b9259608a1b6044820152606401610554565b6001600160a01b039091166000908152609b602090815260408220805460018101825590835291200155565b600054610100900460ff16806114a5575060005460ff16155b6114c15760405162461bcd60e51b815260040161055490611e71565b600054610100900460ff161580156114e3576000805461ffff19166101011790555b6114eb6117ba565b6114f3611824565b80156110c0576000805461ff001916905550565b600054610100900460ff1680611520575060005460ff16155b61153c5760405162461bcd60e51b815260040161055490611e71565b600054610100900460ff1615801561155e576000805461ffff19166101011790555b6115666117ba565b6115708383611884565b8015611582576000805461ff00191690555b505050565b606060008251116115d35760405162461bcd60e51b81526020600482015260166024820152750696e7075744172726179206c656e677468203d3d20360541b6044820152606401610554565b8151600114156115f257506040805160008152602081019091526103db565b600082600184516116039190611ed8565b8151811061161357611613611d93565b6020026020010151905082848151811061162f5761162f611d93565b60200260200101518114156116ec576001835161164c9190611ed8565b67ffffffffffffffff81111561166457611664611b9e565b60405190808252806020026020018201604052801561168d578160200160208202803683370190505b50915060005b82518110156116e5578381815181106116ae576116ae611d93565b60200260200101518382815181106116c8576116c8611d93565b6020908102919091010152806116dd81611da9565b915050611693565b50506103db565b808385815181106116ff576116ff611d93565b602002602001018181525050600183516117199190611ed8565b67ffffffffffffffff81111561173157611731611b9e565b60405190808252806020026020018201604052801561175a578160200160208202803683370190505b50915060005b82518110156117b25783818151811061177b5761177b611d93565b602002602001015183828151811061179557611795611d93565b6020908102919091010152806117aa81611da9565b915050611760565b505092915050565b600054610100900460ff16806117d3575060005460ff16155b6117ef5760405162461bcd60e51b815260040161055490611e71565b600054610100900460ff161580156114f3576000805461ffff191661010117905580156110c0576000805461ff001916905550565b600054610100900460ff168061183d575060005460ff16155b6118595760405162461bcd60e51b815260040161055490611e71565b600054610100900460ff1615801561187b576000805461ffff19166101011790555b6114f333611272565b600054610100900460ff168061189d575060005460ff16155b6118b95760405162461bcd60e51b815260040161055490611e71565b600054610100900460ff161580156118db576000805461ffff19166101011790555b82516118ee906068906020860190611964565b508151611902906069906020850190611964565b508015611582576000805461ff0019169055505050565b828054828255906000526020600020908101928215611954579160200282015b82811115611954578251825591602001919060010190611939565b506119609291506119d7565b5090565b82805461197090611cf0565b90600052602060002090601f0160209004810192826119925760008555611954565b82601f106119ab57805160ff1916838001178555611954565b828001600101855582156119545791820182811115611954578251825591602001919060010190611939565b5b8082111561196057600081556001016119d8565b600060208083528351808285015260005b81811015611a19578581018301518582016040015282016119fd565b81811115611a2b576000604083870101525b50601f01601f1916929092016040019392505050565b6001600160a01b03811681146110c057600080fd5b60008060408385031215611a6957600080fd5b8235611a7481611a41565b946020939093013593505050565b600080600060608486031215611a9757600080fd5b8335611aa281611a41565b92506020840135611ab281611a41565b929592945050506040919091013590565b600060208284031215611ad557600080fd5b8135611ae081611a41565b9392505050565b6020808252825182820181905260009190848201906040850190845b81811015611b1f57835183529284019291840191600101611b03565b50909695505050505050565b6001600160601b03811681146110c057600080fd5b60008060408385031215611b5357600080fd5b823591506020830135611b6581611b2b565b809150509250929050565b60008060408385031215611b8357600080fd5b8235611b8e81611a41565b91506020830135611b6581611a41565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611bc557600080fd5b813567ffffffffffffffff80821115611be057611be0611b9e565b604051601f8301601f19908116603f01168101908282118183101715611c0857611c08611b9e565b81604052838152866020858801011115611c2157600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060008060c08789031215611c5a57600080fd5b863567ffffffffffffffff80821115611c7257600080fd5b611c7e8a838b01611bb4565b97506020890135915080821115611c9457600080fd5b50611ca189828a01611bb4565b9550506040870135611cb281611a41565b93506060870135611cc281611a41565b92506080870135611cd281611a41565b915060a0870135611ce281611a41565b809150509295509295509295565b600181811c90821680611d0457607f821691505b60208210811415611d2557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611d5457611d54611d2b565b500190565b600060208284031215611d6b57600080fd5b8151611ae081611b2b565b600060208284031215611d8857600080fd5b8151611ae081611a41565b634e487b7160e01b600052603260045260246000fd5b6000600019821415611dbd57611dbd611d2b565b5060010190565b8051600281900b8114611dd657600080fd5b919050565b600060808284031215611ded57600080fd5b6040516080810181811067ffffffffffffffff82111715611e1057611e10611b9e565b6040528251611e1e81611a41565b8152611e2c60208401611dc4565b6020820152611e3d60408401611dc4565b604082015260608301516fffffffffffffffffffffffffffffffff81168114611e6557600080fd5b60608201529392505050565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b600060208284031215611ed157600080fd5b5051919050565b600082821015611eea57611eea611d2b565b50039056fea2646970667358221220579a8ca4604d0701cfe718eb303200689e514d11a00aa201f94c0a02d7e3b77b64736f6c63430008090033";

type Univ3CollateralTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Univ3CollateralTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Univ3CollateralToken__factory extends ContractFactory {
  constructor(...args: Univ3CollateralTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Univ3CollateralToken> {
    return super.deploy(overrides || {}) as Promise<Univ3CollateralToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Univ3CollateralToken {
    return super.attach(address) as Univ3CollateralToken;
  }
  override connect(signer: Signer): Univ3CollateralToken__factory {
    return super.connect(signer) as Univ3CollateralToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Univ3CollateralTokenInterface {
    return new utils.Interface(_abi) as Univ3CollateralTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Univ3CollateralToken {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as Univ3CollateralToken;
  }
}