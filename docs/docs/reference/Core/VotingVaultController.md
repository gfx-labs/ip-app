# Voting Vault Controller
## Overview
The Voting Vault Controller manages the minting of voting sub-vaults, registration of new capped tokens, and supports withdrawing the underlying tokens from vaults. The contract is upgradable and owned by Interest Protocol governance.

## Initialize
```
function initialize(address vaultController_) public initializer {
    __Ownable_init();
    _vaultController = IVaultController(vaultController_);
  }
```

## Functions
* function registerUnderlying(address underlying_address, address capped_token) external onlyOwner
    * governance can added new Capped Collaterals by calling the register function here and on the main controller
* function retrieveUnderlying(uint256 amount, address voting_vault, address target) public
    * supports capped token withdraws when the main vault calls the transfer function
* function mintVault(uint96 id) public
    * Anyone can mint a sub-vault for a parent vault but only the parent has control
* function votingVaultId(address voting_vault_address) public
    * returns voting vault ID
* function vaultId(address vault_address) public
    * returns vault ID
* function votingVaultAddress(uint96 vault_id) public
    * returns voting vault address
