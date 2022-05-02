# CurveMaster

## Overview
The CurveMaster is responsible for managing the various interest rate curves utilized in Interest Protocol. Curve master keeps a record of CurveSlave contracts and links it with an address. All numbers should be scaled to 1e18. for instance, number 5e17 represents 50%

## Secondary contracts
* Ownable so the owner can manage the contract as needed.

## Functions
* function getValueAt(address token_address, int256 x_value) external view override returns (int256)
    * Returns the borrow rate for a specified reserve asset and reserve ratio.
* function setVaultController(address vault_master_address) external override onlyOwner
    * Setup the vault controller for the curve master
* function setCurve(address token_address, address curve_address) external override onlyOwner
    * Sets a new interest rate curve


