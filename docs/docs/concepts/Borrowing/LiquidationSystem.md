# Liquidations

Liquidations are a critical feature of any lending market. A good liquidation system is what keeps the system solvent and functioning. A strong liquidation system can support the protocol to offer capital-efficient opportunities. 

Interest Protocol's liquidation system is simple and fair. The collateral value is calculated in the `VaultController` by the `get_vault_borrowing_power(vault)` function. The function checks the vault's balances, fetches the asset prices, and discounts them by their Loan To Value (LTV) rate. If a vault's liability exceeds the vault's borrowing power, anyone can call the `liquidateVault(id, asset_address, tokens_to_liquidate)` function to perform a liquidation. The liquidation function allows liquidators to liquidate only to the point that the vault's liability is greater than or equal to the vault's borrowing power. This prevents liquidators from over liquidiating vaults. Notably, liquidators can perform partial liquations. If a massive liquidation needs to occur, multiple liquidators can partially fill the liquidation until the liability is less than or equal to the vault's borrowing power. The reverse is possible; if a liquidator tries to liquidate more of an asset than what is available in the vault, the liquidator will receive a partial fill. 

Liquidators can check a vault's liquidation eligibility by calling the `checkVault(id)` function on the `VaultController`. The function returns *true* if the account is safe and *false* if unsafe. 

If a liquidator wants to calculate the maximum amount of collateral they can purchase from a vault, they can call the `tokensToLiquidate(id,asset_address)` function on the `VaultController`. The function checks the vault's liability and borrowing power and finds the difference. It also gets the liquidation incentive for the purchased asset, LTV, and the price. The function calculates the exact number of asset tokens that would need to be liquidated to get the vault's liability to equal to the vault's borrowing power. If the `tokenAmount` the liquidator passed in is less than the number calculated, the liquidator's number is used. An additional check verifies the vault has the number of tokens the liquidator wishes to liquidate. If not, it uses the vault's balance. 

In the event the liquidator is utilizing more than one asset for collateral, the liquidator will need to perform more than one transaction to liquidate the vault.

Interest Protocol does not profit for liquidation and instead passes on the who incentive to the liquidator. Each asset has a configured liquidation incentive parameter that governance controls. As that have less liquidity should have a greater liquidation incentive than assets with significant liquidity. 

To learn more about liquidations check out the liquidate info in the protocol interectaction of guides.

