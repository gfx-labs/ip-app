# Vault

## Overview

Interest Protocol vaults are multi-collateral vaults. Each borrower must create a vault and deposit collateral assets to borrow USDi. Assets in vaults are not rehypothicated and are only asseciable to the protocol in the event of a liquidation. 

Governance participants will be excited to know they can use their governance tokens as collateral on Interest Protocol and retain voting power by delegating votes from their vault to their regular voting address. 

## Constructor
Each vault is assigned an ID, minter, master_address, and usdi_address. 
* uint256 id
    * the number of the vault. Increases from 0. 
* address minter
    * the owner of the vault.
* address master_address
    * where the vault references for access to the protocol.
* address usdi_address
    * the address of the dollar synth.

## Modifier
* onlyVaultController
    * Only calls from the vault controller are allowed.
* onlyMinter
    * Only calls made by the vault's owner are allowed.

## Functions
* function minter() external view override returns (address)
    * the owner of the vault. 
* function id() external view override returns (uint96)
    * Returns the vault ID. 
* function baseLiability() external view override returns (uint256)
    * the amount of USDi borrowed by the vault. 
* function tokenBalance(address addr) external view override returns (uint256)
    * the amount of a collateral asset held by a vault. 
* function withdrawErc20(address token_address, uint256 amount) external override onlyMinter
    * to withdraw collateral assets.
* function delegateCompLikeTo(address delegatee, address token_address) external override onlyMinter
    * delegate votes of a collateral asset with voting capability an address for voting.
* function masterTransfer(address _token, address _to, uint256 _amount)
    * to transfer colllateral from the vault to the protocol for liquidation.
* function modifyLiability(bool increase, uint256 base_amount)
    * function used by the VaultController to reduce a vaults liability. true to increase, false to decerase


