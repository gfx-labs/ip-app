# Voting Vault

## Overview
The Voting Vault is a sub-vault of users' main vault. The Voting Vault manages Capped Collateral tokens by holding the capped token in the voting vault. Deposits to the voting vault are made via the Capped Collateral contract, and withdrawals occur at the main vault. The sub-vault provides additional functionality and acts as a conduit without requiring users to interact with it directly.  

Each Voting Vault has the same owner and sub-vault ID as its parent vault. New vaults are made by the Voting Vault Controller, similar to the Vault Controller. Unlike the primary vault, users **cannot** send assets directly to the vault. Users should not interact with the vault contract directly. 

## Constructor
* uint256 id
    * The number of the vault. The same as the Parent. 
* address vault_address
    * The address of the primary vault.
* address controller_address
    * where the vault references for access to the protocol.
* address voting_controller_address
    * where the vault references for access to the protocol.
## Modifier
* onlyVotingVaultController
    * checks if _msgSender is the controller of the voting vault
* onlyVaultController
    * checks if _msgSender is the controller of the vault
* onlyMinter
    * check if _msgSender is the minter of the vault

## Functions
* function parentVault() external view returns (address)
    * return address(_parentVault)
* function id() external view  returns (uint96)
    * return _vaultInfo.id;
* function delegateCompLikeTo(address delegatee, address token_address) external onlyMinter
    * delegate voting power of token_address to delegatee
* function controllerTransfer(address _token, address _to, uint256 _amount) external onlyVaultController
    * Allows the primary vault controller to transfer tokens (used for the liquidation)
* function votingVaultControllerTransfer(address _token, address _to, uint256 _amount) external onlyVotingVaultController
    * Allows the voting vault controller to transfer tokens (used for the withdraw)
