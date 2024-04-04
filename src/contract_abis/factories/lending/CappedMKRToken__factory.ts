/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  CappedMkrToken,
  CappedMkrTokenInterface,
} from "../../lending/CappedMkrToken";

const _abi = [
  {
    inputs: [],
    name: "CannotDepositZero",
    type: "error",
  },
  {
    inputs: [],
    name: "CapReached",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMKRVotingVault",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidVault",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyVaults",
    type: "error",
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
    name: "_mkrVotingVaultController",
    outputs: [
      {
        internalType: "contract MKRVotingVaultController",
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
        internalType: "contract ERC20Upgradeable",
        name: "",
        type: "address",
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
        name: "account",
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
    stateMutability: "pure",
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
        name: "amount",
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
    inputs: [],
    name: "getCap",
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
        name: "mkrVotingVaultController_",
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
    inputs: [
      {
        internalType: "uint256",
        name: "cap_",
        type: "uint256",
      },
    ],
    name: "setCap",
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
        name: "amount",
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
    stateMutability: "pure",
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
  "0x608060405234801561001057600080fd5b506118c4806100206000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c8063715018a6116100b8578063a9059cbb1161007c578063a9059cbb1461027c578063b1290dad1461028f578063b66c72ac146102a2578063db0ed6a0146102b5578063dd62ed3e146102c8578063f2fde38b1461030157600080fd5b8063715018a6146102355780638da5cb5b1461023d57806395d89b411461024e5780639e57366514610256578063a457c2d71461026957600080fd5b806339509351116100ff57806339509351146101b157806347786d37146101c4578063554d578d146101d957806360d8a423146101e157806370a082311461020c57600080fd5b806306fdde031461013c578063095ea7b31461015a57806318160ddd1461017d57806323b872dd1461018f578063313ce567146101a2575b600080fd5b610144610314565b604051610151919061145b565b60405180910390f35b61016d6101683660046114a3565b6103a6565b6040519015158152602001610151565b6067545b604051908152602001610151565b61016d61019d3660046114cf565b6103bc565b60405160128152602001610151565b61016d6101bf3660046114a3565b6103c6565b6101d76101d2366004611510565b610402565b005b609a54610181565b6099546101f4906001600160a01b031681565b6040516001600160a01b039091168152602001610151565b61018161021a366004611529565b6001600160a01b031660009081526065602052604090205490565b6101d761043a565b6033546001600160a01b03166101f4565b610144610470565b6097546101f4906001600160a01b031681565b61016d6102773660046114a3565b61047f565b61016d61028a3660046114a3565b610518565b6098546101f4906001600160a01b031681565b6101d76102b036600461155b565b610700565b6101d76102c336600461162e565b610961565b6101816102d63660046116cc565b6001600160a01b03918216600090815260666020908152604080832093909416825291909152205490565b6101d761030f366004611529565b610a21565b606060688054610323906116fa565b80601f016020809104026020016040519081016040528092919081815260200182805461034f906116fa565b801561039c5780601f106103715761010080835404028352916020019161039c565b820191906000526020600020905b81548152906001019060200180831161037f57829003601f168201915b5050505050905090565b60006103b3338484610abc565b50600192915050565b60005b9392505050565b3360008181526066602090815260408083206001600160a01b038716845290915281205490916103b39185906103fd90869061174b565b610abc565b6033546001600160a01b031633146104355760405162461bcd60e51b815260040161042c90611763565b60405180910390fd5b609a55565b6033546001600160a01b031633146104645760405162461bcd60e51b815260040161042c90611763565b61046e6000610be1565b565b606060698054610323906116fa565b3360009081526066602090815260408083206001600160a01b0386168452909152812054828110156105015760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161042c565b61050e3385858403610abc565b5060019392505050565b60995460009081906001600160a01b0316637726a73c336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260240160206040518083038186803b15801561056e57600080fd5b505afa158015610582573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a69190611798565b90506001600160601b0381166105cf57604051635d7652df60e11b815260040160405180910390fd5b60995460405163a1a33b9d60e01b81526001600160601b03831660048201526000916001600160a01b03169063a1a33b9d9060240160206040518083038186803b15801561061c57600080fd5b505afa158015610630573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065491906117b5565b90506001600160a01b03811661067d5760405163247ed6e960e11b815260040160405180910390fd5b6106873385610c33565b609954604051637810f1eb60e01b8152600481018690526001600160a01b038381166024830152878116604483015290911690637810f1eb90606401600060405180830381600087803b1580156106dd57600080fd5b505af11580156106f1573d6000803e3d6000fd5b50600198975050505050505050565b8161071e576040516330d6375d60e11b815260040160405180910390fd5b60995460405163a1a33b9d60e01b81526001600160601b03831660048201526000916001600160a01b03169063a1a33b9d9060240160206040518083038186803b15801561076b57600080fd5b505afa15801561077f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a391906117b5565b90506001600160a01b0381166107cc5760405163247ed6e960e11b815260040160405180910390fd5b60985460405163d912c42760e01b81526001600160601b03841660048201526000916001600160a01b03169063d912c4279060240160206040518083038186803b15801561081957600080fd5b505afa15801561082d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085191906117b5565b90506001600160a01b03811661087a57604051630681d31960e51b815260040160405180910390fd5b61088384610d7e565b6097546000906001600160a01b031663dd62ed3e336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015260440160206040518083038186803b1580156108dd57600080fd5b505afa1580156108f1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091591906117d2565b905084811015610938576040516313be252b60e01b815260040160405180910390fd5b6109428286610db4565b61095a336097546001600160a01b0316908588610e93565b5050505050565b600054610100900460ff168061097a575060005460ff16155b6109965760405162461bcd60e51b815260040161042c906117eb565b600054610100900460ff161580156109b8576000805461ffff19166101011790555b6109c0610ef3565b6109ca8686610f6e565b609780546001600160a01b038087166001600160a01b0319928316179092556098805486841690831617905560998054928516929091169190911790558015610a19576000805461ff00191690555b505050505050565b6033546001600160a01b03163314610a4b5760405162461bcd60e51b815260040161042c90611763565b6001600160a01b038116610ab05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161042c565b610ab981610be1565b50565b6001600160a01b038316610b1e5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161042c565b6001600160a01b038216610b7f5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161042c565b6001600160a01b0383811660008181526066602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216610c935760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161042c565b6001600160a01b03821660009081526065602052604090205481811015610d075760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161042c565b6001600160a01b0383166000908152606560205260408120838303905560678054849290610d36908490611839565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610bd4565b505050565b609a5481610d8b60675490565b610d95919061174b565b1115610ab957604051636bf4c8e960e11b815260040160405180910390fd5b6001600160a01b038216610e0a5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161042c565b8060676000828254610e1c919061174b565b90915550506001600160a01b03821660009081526065602052604081208054839290610e4990849061174b565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052610eed908590610fed565b50505050565b600054610100900460ff1680610f0c575060005460ff16155b610f285760405162461bcd60e51b815260040161042c906117eb565b600054610100900460ff16158015610f4a576000805461ffff19166101011790555b610f526110bf565b610f5a611129565b8015610ab9576000805461ff001916905550565b600054610100900460ff1680610f87575060005460ff16155b610fa35760405162461bcd60e51b815260040161042c906117eb565b600054610100900460ff16158015610fc5576000805461ffff19166101011790555b610fcd6110bf565b610fd78383611189565b8015610d79576000805461ff0019169055505050565b6000611042826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661121e9092919063ffffffff16565b805190915015610d7957808060200190518101906110609190611850565b610d795760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161042c565b600054610100900460ff16806110d8575060005460ff16155b6110f45760405162461bcd60e51b815260040161042c906117eb565b600054610100900460ff16158015610f5a576000805461ffff19166101011790558015610ab9576000805461ff001916905550565b600054610100900460ff1680611142575060005460ff16155b61115e5760405162461bcd60e51b815260040161042c906117eb565b600054610100900460ff16158015611180576000805461ffff19166101011790555b610f5a33610be1565b600054610100900460ff16806111a2575060005460ff16155b6111be5760405162461bcd60e51b815260040161042c906117eb565b600054610100900460ff161580156111e0576000805461ffff19166101011790555b82516111f3906068906020860190611396565b508151611207906069906020850190611396565b508015610d79576000805461ff0019169055505050565b606061122d8484600085611235565b949350505050565b6060824710156112965760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161042c565b843b6112e45760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161042c565b600080866001600160a01b031685876040516113009190611872565b60006040518083038185875af1925050503d806000811461133d576040519150601f19603f3d011682016040523d82523d6000602084013e611342565b606091505b509150915061135282828661135d565b979650505050505050565b6060831561136c5750816103bf565b82511561137c5782518084602001fd5b8160405162461bcd60e51b815260040161042c919061145b565b8280546113a2906116fa565b90600052602060002090601f0160209004810192826113c4576000855561140a565b82601f106113dd57805160ff191683800117855561140a565b8280016001018555821561140a579182015b8281111561140a5782518255916020019190600101906113ef565b5061141692915061141a565b5090565b5b80821115611416576000815560010161141b565b60005b8381101561144a578181015183820152602001611432565b83811115610eed5750506000910152565b602081526000825180602084015261147a81604085016020870161142f565b601f01601f19169190910160400192915050565b6001600160a01b0381168114610ab957600080fd5b600080604083850312156114b657600080fd5b82356114c18161148e565b946020939093013593505050565b6000806000606084860312156114e457600080fd5b83356114ef8161148e565b925060208401356114ff8161148e565b929592945050506040919091013590565b60006020828403121561152257600080fd5b5035919050565b60006020828403121561153b57600080fd5b81356103bf8161148e565b6001600160601b0381168114610ab957600080fd5b6000806040838503121561156e57600080fd5b82359150602083013561158081611546565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126115b257600080fd5b813567ffffffffffffffff808211156115cd576115cd61158b565b604051601f8301601f19908116603f011681019082821181831017156115f5576115f561158b565b8160405283815286602085880101111561160e57600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080600060a0868803121561164657600080fd5b853567ffffffffffffffff8082111561165e57600080fd5b61166a89838a016115a1565b9650602088013591508082111561168057600080fd5b5061168d888289016115a1565b945050604086013561169e8161148e565b925060608601356116ae8161148e565b915060808601356116be8161148e565b809150509295509295909350565b600080604083850312156116df57600080fd5b82356116ea8161148e565b915060208301356115808161148e565b600181811c9082168061170e57607f821691505b6020821081141561172f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561175e5761175e611735565b500190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000602082840312156117aa57600080fd5b81516103bf81611546565b6000602082840312156117c757600080fd5b81516103bf8161148e565b6000602082840312156117e457600080fd5b5051919050565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b60008282101561184b5761184b611735565b500390565b60006020828403121561186257600080fd5b815180151581146103bf57600080fd5b6000825161188481846020870161142f565b919091019291505056fea26469706673582212206f9c9cf05400833303b212be0880496f4aa57b1e70734b8295cedc4af5149ba764736f6c63430008090033";

type CappedMkrTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CappedMkrTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CappedMkrToken__factory extends ContractFactory {
  constructor(...args: CappedMkrTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CappedMkrToken> {
    return super.deploy(overrides || {}) as Promise<CappedMkrToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CappedMkrToken {
    return super.attach(address) as CappedMkrToken;
  }
  override connect(signer: Signer): CappedMkrToken__factory {
    return super.connect(signer) as CappedMkrToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CappedMkrTokenInterface {
    return new utils.Interface(_abi) as CappedMkrTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CappedMkrToken {
    return new Contract(address, _abi, signerOrProvider) as CappedMkrToken;
  }
}