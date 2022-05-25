---
id: How To Liquidate
---

# Liquidate

To liquidate an undercollateralized vault:
1. Have a balance of USDi in your wallet to repay the debt.
2. Find an eligible vault.
3. Call the function `liquidateAccount()`.

Interest Protocol's liquidation system is simple yet efficient. Vaults with debts greater than their borrowing power are eligible for liquidation. Liquidators can only liquidate a vault up to a point where the vault's debt is exactly equal to the vault's borrowing power. 

The protocol incentivizes liquidators by offering the collateral assets at a discount relative to the oracle price. The parameter `liquidationIncentive` represents the discount percentage for each asset.

A liquidator can call the function `tokensToLiquidate(vault id, asset to liquidate)` to identify whether a vault can be liquidated, and if so, by how much. 

**Note**: the number of tokens to liquidate is a moving number because prices are called on each function call, and interest is accrued constantly. 

The function `liquidateAccount(vault ID, asset address, tokens to liquidate)` liquidates a vault. The liquidator can liquidate any amount up to the maximum amount given by `tokensToLiquidate()`. If `tokens to liquidate` passed by the liquidator is greater than `tokensToLiquidate()`, the vault is liquidated up to `tokensToLiquidate()`. If a vault has multiple collateral assets, each asset must be liquidated in a separate call.






