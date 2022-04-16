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

## Functions
* function getMinter()
    * the owner of the vault. 
* function BaseLiability()
    * the amount of USDi borrowed by the vault. 
* function withdraw_erc20(address token_address, uint256 amount)
    * to withdraw collateral assets.
* function masterTransfer(address _token, address _to, uint256 _amount)
    * to transfer colllateral from the vault to the protocol for liquidation.
* function decrease_liability(uint256 base_amount)
    * decrease the account liability upon repayment or liquidation.
* function increase_liability(uint256 base_amount)
    * increase the account liability upon borrow.
* function delegateCompLikeTo(address compLikeDelegatee, address CompLikeToken)
    * delegate votes of a collateral asset with voting capability an address for voting.