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

## Initialize
```
function initialize() external override initializer {
__Ownable_init();
_vaultsMinted = 0;
_tokensRegistered = 0;
_interestFactor = 1e18; // initialize at 1e18;
_totalBaseLiability = 0;
_protocolFee = 1e14;
_lastInterestTime = block.timestamp;
}
```
## Functions

* function InterestFactor() external view override returns (uint256)
    * Returns the interest factor
* function ProtocolFee() external view override returns (uint256)
    * Returns the protocol fee.
* function VaultAddress(uint256 id) external view override returns (address)
    * Returns a Vault address with input of a Vault ID.
* function mint_vault() public override returns (address)
    * Mints a Vault to the msg.sender
* function register_usdi(address usdi_address) external override onlyOwner
    * Registers USDi with the controller.
* function register_oracle_master(address master_oracle_address) external override onlyOwner
    * Registers the OracleMaster with the controller.
* function register_curve_master(address master_curve_address) external onlyOwner
    * Registers the CurveMaster with the controller.
* function change_protocol_fee(uint256 new_protocol_fee) external onlyOwner
    * Updates the protocol fee. 
* function register_erc20(address token_address, uint256 LTV, address oracle_address, uint256 liquidationIncentive) external onlyOwner
    * Adds a collateral asset to the protocol. Governance must set a liquidation token value, setup an oracle configuration, and choose a liquidation incentive.
* function update_registered_erc20(address token_address, uint256 LTV, address oracle_address, uint256 liquidationIncentive) external onlyOwner
    * Same as registeration but for updating an existing market.
* function check_account(uint256 id) external view override returns (bool)
    * Checks if an account is ready for liquidation. 
* function borrow_usdi(uint256 id, uint256 amount) external override
    * For a vault to borrow USDi.
* function repay_usdi(uint256 id, uint256 amount) external override
    * For a vault to repay some number of USDi.
* function repay_all_usdi(uint256 id) external override
    * For a vault to repay their entire liability.
* function liquidate_account(uint256 id, address asset_address, uint256 tokens_to_liquidate) external override returns (uint256)
    * Liquidates a vault to get it back to minimum solvency (and allows for partial fill).
* function TokensToLiquidate(uint256 id, address asset_address, uint256 tokens_to_liquidate) public view returns (uint256)
    * An external call that liquidators can use to find the maximum amount of tokens of collateral that can be purchased from a vault. Calls _liquidationMath()
* function _liquidationMath( uint256 id, address asset_address, uint256 tokens_to_liquidate) internal view returns (uint256, uint256)
    * Calculates the maximum amount of tokens that can be purchased from a vault. Note: liquidation will only liquiate to the point of minimum solvency. 
* function getVault(uint256 id) internal view returns (IVault vault)
    * Returns vault address with ID input. 
* function AccountLiability(uint256 id) external view override
    * An external function that returns a Vault's debt with ID input. Calls _AccountLiability
* function _AccountLiability(uint256 id) internal view returns (uint256)
    * Returns a Vault's debt to the protocol via Vault ID.
* function AccountBorrowingPower(uint256 id) external view returns (uint256)
    * An externall callabel that calls get_vault_borrowing_power
* function get_vault_borrowing_power(IVault vault) private view returns (uint256)
    * Returns a vault's borrowing power by looping through all collateral asset, querying prices, checking for balances, and adjusting based off LTV. 
* function calculate_interest() external override returns (uint256)
    * Calls pay_interest()
* function pay_interest() private returns (uint256)
    * Updates the interest rate for borrowers (and thus lenders). Acccures interest for lenders and collects the protocol fee. 

