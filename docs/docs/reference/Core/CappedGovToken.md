# Capped Collateral Token
## Overview
A Capped Collateral Token is a wrapper for an underlying asset that can be listed as collateral on the protocol, while governance can control the total supply of the Capped Collateral Token. The Capped Collateral contract does not hold any assets. The user's sub-vault (voting vault) holds the underlying tokens. By controlling the tokens in the sub-vaults rather than the token contract, governance token holders can retain voting power while being utilized as collateral assets.

## Initialize
```
function initialize(
    string memory name_,
    string memory symbol_,
    address underlying_,
    address vaultController_,
    address votingVaultController_
  ) public initializer {
    __Ownable_init();
    __ERC20_init(name_, symbol_);
    _underlying = IERC20Metadata(underlying_);

    _vaultController = IVaultController(vaultController_);
    _votingVaultController = VotingVaultController(votingVaultController_);
  }
```

## Functions
* function decimals() public
    * returns 18 (hardcoded at deployment)
* function getCap() public
    * returns _cap (uint 256 in 18 terms)
* function setCap(uint256 cap_) external onlyOwner
    * governance can set the cap in 18 terms
* function checkCap(uint256 amount_) internal view
    * each deposit checks to make sure the deposit won't exceed the cap
* function deposit(uint256 amount, uint96 vaultId) public
    * transfers the underlying token to the sub-vault (voting vault) and transfers the capped token to the parent vault
* function transfer(address recipient, uint256 amount) public
    * supports the withdraw of the capped token for the underlying token when the vault owner calls withdraw on the parent vault
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
    * total supply of capped tokens 
