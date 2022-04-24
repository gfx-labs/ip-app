# USDi

## Overview
USDi is the dollar synth of Interest Protocol. Lenders deposit their stablecoins to earn interest. Borrowers deposit collateral and borrow USDi. Lenders earn their interest paid by borrowers (minus the protocol fee). Lenders earn interest by holding USDi. Interest is streamed to holders by an upward rebasing asset. Lenders are also able to maintain stability and purchasing power because USDi and the reserve asset are convertable 1:1.

## Secondary contracts
* UFragements by Ampleforth. USDi uses the uFragments concept from the Ideal Money project to pay interest. uFragments is a normal ERC20 token, but its supply can be adjusted by splitting and combining tokens proportionally across all wallets. uFragment balances are internally represented with a hidden denomination, 'gons'. We support splitting the currency in expansion and combining the currency on contraction by changing the exchange rate between the hidden 'gons' and the public 'fragments'.

## Functions
* function initialize(address reserveAddress)
    * sets the reserve asset for USDi.
* function deposit(uint256 usdc_amount)
    * Deposits the reserve asset into the reserve pool and mints USDi to the depositor.
* function withdraw(uint256 usdc_amount)
    * Withdraws the reserve asset from the reserve pool and decreases the withdrawer's USDi balance.
* function setVaultController(address)
    * Set the VaultController address. 
* function mint(uint256 usdc_amount)
    * mints USDi to the owner.
* function burn(uint256 usdc_amount)
    * burns msg.sender's USDi
* function vault_master_mint(address target, uint256 amount)
    * mints USDi for a Vault via the Vault Controller.
* function vault_master_burn(address target, uint256)
    * burns USDi for a Vault via the Vault Controller. 
* function vault_master_donate(uint256 amount)
    * increases the total supply without increasing the gons which thus increases all gons holders' balances.
* function reserveRatio()
    * solves for the protocol reserveRatio: reserveAsset/total USDi supply. 



