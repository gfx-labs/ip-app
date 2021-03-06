# USDi

## Overview
USDi is the stablecoin issued by Interest Protocol. Borrowers can post collateral into their vault and borrow USDi. Anyone who holds USDi is a depositor and earns interest through positive rebasing.

Learn more about USDi [here](../../concepts/USDi/USDi.md).


## Secondary contracts
* UFragments by Ampleforth. USDi uses the uFragments concept from the Ideal Money project to pay interest. uFragments is a normal ERC20 token, but its supply can be adjusted by splitting and combining tokens proportionally across all wallets. uFragment balances are internally represented with a hidden denomination, 'gons'. We support splitting the currency in expansion and combining the currency on contraction by changing the exchange rate between the hidden 'gons' and the public 'fragments'.
    * UFragments has Open Zeppelin's OwnableUpgradeable which configures an owner and makes it upgradable.
* Open Zeppelin's PausableUpgradeable and OwnableUpgradeable so the owner can pause certain functionality if needed and upgrade the contract. 
* Vault

## Modifier
* onlyVaultController
    * Prohibits anyone but the vaultController from calling the function
* onlyPauser
    * Only the Pauser can call the pause functions
* paysInterest
    * Any functions that changes the reserve ratio will require payInterest() to be called prior to operations. The payInterest function is on the vaultController. Interest will accurue from the last timestamp it was called to the current timestamp.

## Functions
* function initialize(address reserveAddress)
    * sets the reserve asset for USDi. The initialize will also setup the contract owner. 
* function setPauser(address pauser_) external override onlyOwner
    * governance can get the pauser_ address
* function pause() external override onlyOwner
    * toggles any function with `whenNotPaused` to be paused.
* function unpause() external override onlyOwner
    * toggles any function with `whenNotPaused` to be unpaused.
* function pauser() public view returns (address)
    * Returns the address of the Pauser
* function owner() public view override(IUSDI, OwnableUpgradeable) returns (address)
    * Returns the address of the owner. 
* function name() public view override(IERC20Metadata, ERC20Detailed) returns (string memory)
    * Returns "USDI Token"
* function symbol() public view override(IERC20Metadata, ERC20Detailed) returns (string memory)
    * Returns "USDI"
* function decimals() public view override(IERC20Metadata, ERC20Detailed) returns (uint8)
    * Returns the number of decimals USDI uses. 18
* function reserveAddress() public view override returns (address)
    * Returns the USDC address: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
* function getVaultController() public view override returns (address)
    * Returns the address of the vault controller.
* function setVaultController(address) external override onlyOwner
    * Sets the VaultController address
* function deposit(uint256 usdc_amount) external override paysInterest whenNotPaused
    * Deposits the reserve asset into the reserve pool and mints USDi to the depositor.
* function withdraw(uint256 usdc_amount) external override paysInterest whenNotPaused
    * Withdraws the reserve asset from the reserve pool and decreases the withdrawer's USDi balance.
* function withdrawAll()cexternal override paysInterest whenNotPaused
    * converts the USDi holder's USDi balance for USDC. This is helpful since interest is always accruing. 
* function mint(uint256 usdc_amount) external override paysInterest onlyOwner
    * mints USDi to the owner.
* function burn(uint256 usdc_amount) external override paysInterest onlyOwner
    * burns msg.sender's USDi
* function donate(uint256 usdc_amount) external override paysInterest whenNotPaused
    * transfers usdc from callers address to the reserve.  
* function donateReserve() external override onlyOwner whenNotPaused
    * donates any USDC held by this contract to the USDi holders
* function vaultControllerMint(address target, uint256 amount) external override onlyVaultController
    * mints USDi for a Vault via the Vault Controller.
* function vaultControllerBurn(address target, uint256) external override onlyVaultController
    * burns USDi for a Vault via the Vault Controller. 
* function vaultControllerDonate(uint256 amount) external override onlyVaultController
    * increases the total supply without increasing the gons which thus increases all gons holders' balances.
* function _donation(uint256 amount)
    * function for distributing the donation to all USDi holders
* function reserveRatio() view override returns (uint192 e18_reserve_ratio)
    * solves for the protocol reserveRatio: reserveAsset/total USDi supply. 



