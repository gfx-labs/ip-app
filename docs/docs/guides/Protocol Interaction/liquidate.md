---
id: How To Liquidate
---

# Liquidate

To liquidate an undercollateralized vault:
1. Have a balance of USDi in your wallet to repay the debt.
2. Find an eligible vault.
3. Call the function `liquidateAccount()`.

Interest Protocol's liquidation system is simple yet efficient. Vaults with debts greater than their borrowing power are eligible for liquidation. Liquidators can only liquidate a vault up to a point where the vault's debt is exactly equal to the vault's borrowing power. 

Once an account has been identified as liquidatable, a liquidator can call the tokenToLiquidate(vault id, asset to liquidate) function, which will return the maximum number of tokens that can be liquidated at that time. 

Note: the number of tokens to liquidate is a moving number because prices are called on each function call, and interest is accrued constantly. 

Use the liquidateAccount(vault ID, asset address to liquidate, token to liquidate) to liquidate a vault. The protocol needs to know the vault to verify whether it is eligible for liquidation, the asset to liquidate to check the vault's balance, and the number of tokens to liquidate so the liquidator can partially fill a liquidation if desired. If a liquidator specifies a number greater than the vault's balance, the protocol liquidates the vault's full balance. If a vault has multiple collateral assets, each asset must be liquidated in a separate call.

Interest Protocol incentivizes liquidators by offering the collateral assets at a discount relative to the oracle price. The parameter `liquidationIncentive` represents the discount percentage for each asset.
