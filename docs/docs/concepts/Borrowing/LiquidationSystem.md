# Liquidations

Liquidations allow Interest Protocol to unwind loans that are not sufficiently collateralized. Interest Protocol has a simple liquidation mechanism that prevents unnecessary liquidations while enabling rapid liquidations of risky loans.

A vault's borrowing power is calculated in `VaultController` by the `get_vault_borrowing_power(vault)` function. The function checks the vault's collateral balances, fetches the price of each collateral, and discounts it by the maximum Loan To Value (LTV) of the collateral. If a vault's liability exceeds the vault's borrowing power, anyone can call the `liquidateVault(id, asset_address, tokens_to_liquidate)` function to perform a liquidation. The amount of collateral that can be liquidated is bounded above by the minimum amount that makes vault's liability less than or equal to the vault's borrowing power. This prevents liquidators from liquidating more collateral than is necessary. At the same time, liquidators are not required to call `liquidateVault()` multiple times in order to liquidate a single type of collateral in a given vault. If a liquidator tries to liquidate more than is allowed, `liquidateVault()` will liquidate the maximum amount that is allowed.

`liquidateVault()` also permits partial liquidations. If a large amount of liquidation is required to reduce a vault's liability below its borrowing power, multiple liquidators can liquidate portions of the vault's collateral.

Liquidators can check a vault's liquidation eligibility by calling the `checkVault(id)` function on the `VaultController`. The function returns *true* if the account is safe and *false* if unsafe. 

To calculate the maximum amount of collateral they can purchase from a vault, one can call the `tokensToLiquidate(id,asset_address)` function in `VaultController`. The function calculates the exact number of collateral tokens that needs to be liquidated to make the vault's liability equal its borrowing power. If the `tokenAmount` the liquidator passed is less than the number calculated, the liquidator's number is used. An additional check verifies the vault has the number of tokens the liquidator wishes to liquidate. If not, it uses the vault's balance. 

In the event the borrower is utilizing more than one asset for collateral, the liquidator may need to call `liquidateVault` multiple times until the vault becomes no longer liquidatable.

Interest Protocol does not profit from liquidations. All liquidation penalties are paid to the liquidator. Each asset has a configured liquidation penalty, chosen by governance. Less liquid assets tend to have a higher liquidation penalty. 

To learn more about liquidations, check out the Guides section.

