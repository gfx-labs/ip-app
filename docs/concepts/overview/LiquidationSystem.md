# Liquidations

Liquidations are a critical feature of any lending market. A good liquidation system is what keeps the system solvent and functioning. A strong liquidation system can support the protocol to offer capital-efficient opportunities. 

Interest Protocol's liquidation system is simple and fair. The collateral value/debit limit is calculated in the `VaultController` by the `get_vault_borrowing_power(vault)` function. The function checks the vault's balances, fetches the asset prices, and discounts them by their Loan To Value (LTV) rate. If a vault's debt exceeds their debt limit, anyone can call the `liquidate_account(id, asset_address, tokens_to_liquidate)` function to perform a liquidation. The liquidation function allows liquidators to liquidate the vault so that their debt is greater than or equal to their debt limit, but their debt cannot be less than their debt limit. This prevents liquidators from liquidating more than necessary. Notably, liquidators can perform partial liquations. If a massive liquidation needs to occur, multiple liquidators can partially fill the liquidation until the debt <= the debt limit. The reverse is possible; if a liquidator tries to liquidate more of an asset than what is available in the vault, the liquidator will receive a partial fill. 

Liquidators can check a vault's liquidation eligibility by calling the `checkAccount(id)` function on the `VaultController`. The function returns *true* if the account is safe and *false* if unsafe. 

If a liquidator wants to calculate the maximum amount of collateral they can purchase from a vault, they can call the `TokensToLiquidate(id,asset_address,tokens_to_liquidate)` function on the `VaultController`. The function checks the vault's debt and debt limit and finds the difference. It also gets the liquidation incentive for the purchased asset, LTV, and the price. The function calculates the exact number of asset tokens that would need to be liquidated to make the debt equal to the debt limit at the end of the liquidation. If the `tokens_to_liquidate` the liquidator passed in is less than the number calculated, the liquidator's number is used. An additional check verifies the vault has the number of tokens the liquidator wishes to liquidate. If not, it uses the vault's balance. 

In the event the liquidator is utilizing more than one asset for collateral, the liquidator will need to perform more than one transaction to liquidate the vault. 


