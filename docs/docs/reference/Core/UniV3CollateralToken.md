# Univ3CollateralToken
## Overview
Univ3CollateralToken is a wrapped Uniswap V3 position, allowing Interest Protocol use it as collateral. 
There should generally exist only one of these on a given network, as the underlying will always be the Uniswap V3 NonFungiblePositionManager, regardless of the pool the position represents. 

## Initialize
```
function initialize(
    string memory name_,
    string memory symbol_,
    address underlying_,
    address vaultController_,
    address nftVaultController_,
    address positionValuator_
  ) public initializer {
    __Ownable_init();
    __ERC20_init(name_, symbol_);


    _underlying = INonfungiblePositionManager(underlying_);
    _positionValuator = V3PositionValuator(positionValuator_);
    _vaultController = IVaultController(vaultController_);
    _nftVaultController = NftVaultController(nftVaultController_);
    locked = false;
  }
```

## Functions
* function deposit(uint256 amount, uint96 vaultId) public
    * transfers the underlying token to the sub-vault (nft vault) and transfers the wrapped token to the parent vault
* function transfer(address recipient, uint256 amount) public
    * supports the withdraw of the wrapped token for the underlying token when the vault owner calls withdraw on the parent vault
* function transferFrom(address, address, uint256)
    * explicitly overrides from being used
* function renounceOwnership() public virtual onlyOwner
    * leaves the contract without owner
* function transferOwnership(address newOwner) public virtual onlyOwner
    * transfers ownership of the contract to a new account
* function balanceOf(address account) public
    * returns the balance of an address
* function name() external view
    * returns string
* function symbol() external view
    * returns string
* function totalSupply() public
    * total supply of wrapped tokens 
