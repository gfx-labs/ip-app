# USDi

## Overview
USDi is the dollar synth of Interest Protocol. Lenders deposit their stablecoins to earn interest. Borrowers deposit collateral and borrow USDi. Lenders earn their interest paid by borrowers (minus the protocol fee). Lenders earn interest by holding USDi. Interest is streamed to holders by an upward rebasing asset. Lenders are also able to maintain stability and purchasing power because USDi and the reserve asset are convertable 1:1.

## Secondary contracts
* UFragements by Ampleforth. USDi uses the uFragments concept from the Ideal Money project to pay interest. uFragments is a normal ERC20 token, but its supply can be adjusted by splitting and combining tokens proportionally across all wallets. uFragment balances are internally represented with a hidden denomination, 'gons'. We support splitting the currency in expansion and combining the currency on contraction by changing the exchange rate between the hidden 'gons' and the public 'fragments'.
    * UFragments has Open Zeppelin's OwnableUpgradeable which configures an owner and makes it upgradable.
* Open Zeppelin's PausableUpgradeable and OwnableUpgradeable so the owner can pause certain functionality if needed and upgrade the contract. 
* Vault

## Modifier
* onlyVaultController
    * Prohibits anyone but the vaultController from calling the function
* paysInterest
    * Any functions that changes the reserve ratio will require payInterest() to be called prior to operations. The payInterest function is on the vaultController. Interest will accurue from the last timestamp it was called to the current timestamp.

## Functions
* function initialize(address reserveAddress)
    * sets the reserve asset for USDi. The initialize will also setup the contract owner. 
* function pause() external override onlyOwner
    * toggles any function with `whenNotPaused` to be paused.
* function unpause() external override onlyOwner
    * toggles any function with `whenNotPaused` to be unpaused.
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
* function vaultControllerMint(address target, uint256 amount) external override onlyVaultController
    * mints USDi for a Vault via the Vault Controller.
* function vaultControllerBurn(address target, uint256) external override onlyVaultController
    * burns USDi for a Vault via the Vault Controller. 
* function vaultControllerDonate(uint256 amount) external override onlyVaultController
    * increases the total supply without increasing the gons which thus increases all gons holders' balances.
* function reserveRatio() view override returns (uint192 e18_reserve_ratio)
    * solves for the protocol reserveRatio: reserveAsset/total USDi supply. 



