# NftVaultController
## Overview
The Nft Vault Controller manages the minting of Nft sub-vaults, registration of the UniV3CollateralToken, and supports withdrawing the underlying Nfts from vaults. The contract is upgradable and owned by Interest Protocol governance.

## Initialize
```
function initialize(address vaultController_) public initializer {
    __Ownable_init();
    _vaultController = IVaultController(vaultController_);
  }
```

## Functions
## Functions
* function registerUnderlying(address underlying_address, address capped_token) external onlyOwner
    * governance can register the UniV3CollateralToken by calling the register function here and on the main controller
* function retrieveUnderlying(uint256 amount, address voting_vault, address target) public
    * supports position withdraws when the main vault calls the transfer function
* function mintVault(uint96 id) public
    * Anyone can mint a sub-vault for a parent vault but only the parent has control
* function NftVaultId(address nft_vault_address) public
    * returns nft vault ID
* function vaultId(address vault_address) public
    * returns vault ID
* function NftVaultAddress(uint96 vault_id) public
    * returns nft vault address

