# VaultController

## Overview

The VaultController is the brain of the protocol. It is responsible for adding and mananging collateral assets, handling liquidations of Vaults and of course, lending  USDi.

Each Vault is minted from the VaultController and references the controller for access to the protocol. 

The VaultController is purposely simple and adaptable. Governance can upgrade the contract to make complex changes or stick to regular changes on onlyOwner functions such as:

1. register_oracle_master
2. register_curve_master
3. change_protocol_fee
4. register_erc20
5. update_registered_erc20

## Secondary contracts
* Vault: to manage users collateral. 
* Oracle Master: to handle asset prices. 
* Curve Master: to calculate the reserve ratio and thus the new interest rate. 
* Open Zeppelin's PausableUpgradeable and OwnableUpgradeable so the owner can pause certain functionality if needed and upgrade the contract. 

## Initialize
```
function initialize() external override initializer {
__Ownable_init();
__Pausable_init();
_interest = Interest(uint64(block.timestamp), 1e18);
_protocolFee = 1e14;
_vaultsMinted = 0;
_tokensRegistered = 0;
_totalBaseLiability = 0;
}
```
## Modifier
* paysInterest
    * Any functions that changes the reserve ratio will require payInterest() to be called prior to operations. The payInterest function is on the vaultController. Interest will accurue from the last timestamp it was called to the current timestamp.
* onlyPauser
    * Limit function call to only the Pauser
* 

## Functions
* function interestFactor() external view override returns (uint256)
    * Returns the interest factor
* function lastInterestTime() external view override returns (uint64)
    * Returns the last timestamp for when payInterest() was called.
* function protocolFee() external view override returns (uint256)
    * Returns the protocol fee.
* function vaultAddress(uint256 id) external view override returns (address)
    * Returns a Vault address with input of a Vault ID.
* function vaultIDs(address wallet) external view override returns (uint96[] memory)
    * Returns an arrary of vaultIDs owner by an address
* function totalBaseLiability() external view override returns (uint256)
    * Returns the total base liability for the protocol.
* function vaultsMinted() external view override returns (uint96)
    * Returns the number of vaults in the system.
* function tokensRegistered() external view override returns (uint256)
    * Returns then number of tokens registered in the system
* function mintVault() public override returns (address)
    * Mints a Vault to the msg.sender
* function pause() external override onlyPauser 
    * toggles any function with `whenNotPaused` to be paused.
* function unpause() external override onlyPauser 
    * toggles any function with `whenNotPaused` to be unpaused.
* function registerUSDi(address usdi_address) external override onlyOwner
    * Registers USDi with the controller.
* function getOracleMaster() external view override returns (address)
    * Returns the address of the oracle master.
* function registerOracleMaster(address master_oracle_address) external override onlyOwner
    * Registers the OracleMaster with the controller.
* function getCurveMaster() external view override returns (address)
    * Returns the address of the curve master.
* function registerCurveMaster(address master_curve_address) external onlyOwner
    * Registers the CurveMaster with the controller.
* function changeProtocolFee(uint256 new_protocol_fee) external onlyOwner
    * Updates the protocol fee. 
* function registerErc20(address token_address, uint256 LTV, address oracle_address, uint256 liquidationIncentive) external onlyOwner
    * Adds a collateral asset to the protocol. Governance must set a liquidation token value, setup an oracle configuration, and choose a liquidation incentive.
* function updateRegisteredErc20(address token_address, uint256 LTV, address oracle_address, uint256 liquidationIncentive) external onlyOwner
    * Same as registeration but for updating an existing market.
* function checkVault(uint256 id) external view override returns (bool)
    * Checks if an account is ready for liquidation. true = vault over-collateralized; false = vault under-collaterlized
* function borrowUsdi(uint256 id, uint256 amount) external override paysInterest whenNotPaused
    * For a vault to borrow USDi.
* function repayUSDi(uint256 id, uint256 amount) external override paysInterest whenNotPaused
    * For a vault to repay some number of USDi.
* function repayAllUSDi(uint256 id) external override paysInterest whenNotPaused
    * For a vault to repay their entire liability.
* function liquidateVault(uint256 id, address asset_address, uint256 tokens_to_liquidate) external override paysInterest whenNotPaused returns (uint256)
    * Liquidates a vault to get it back to minimum solvency (and allows for partial fill).
* function tokensToLiquidate(uint256 id, address asset_address, uint256 tokens_to_liquidate) external view override returns (uint256)
    * An external call that liquidators can use to find the maximum amount of tokens of collateral that can be purchased from a vault. Calls _liquidationMath()
* function _liquidationMath( uint256 id, address asset_address, uint256 tokens_to_liquidate) internal view returns (uint256, uint256)
    * Calculates the maximum amount of tokens that can be purchased from a vault. Note: liquidation will only liquiate to the point of minimum solvency. 
* function getVault(uint256 id) internal view returns (IVault vault)
    * Returns vault address with ID input. 
* function amountToSolvency(uint96 id) public view override returns (uint256)
    * calls _amountToSolvency
* function _amountToSolvency(uint96 id) internal view returns (uint256)
    * Returns `_vaultLiability(id) - get_vault_borrowing_power(getVault(id)`
* function vaultLiability(uint256 id) external view override returns (uint192)
    * An external function that returns a Vault's debt with ID input. Calls _AccountLiability
* function _vaultLiability(uint96 id) internal view returns (uint192)
    * Returns a Vault's debt to the protocol via Vault ID.
* function vaultBorrowingPower(uint256 id) external view returns (uint192)
    * An externall callabel that calls get_vault_borrowing_power
* function get_vault_borrowing_power(IVault vault) private view returns (uint192)
    * Returns a vault's borrowing power by looping through all collateral asset, querying prices, checking for balances, and adjusting based off LTV. 
* function calculateInterest() external override returns (uint256)
    * Calls pay_interest()
* function pay_interest() private returns (uint256)
    * Updates the interest rate for borrowers (and thus lenders). Acccures interest for lenders and collects the protocol fee. 

