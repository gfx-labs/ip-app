---
id: How To Liquidate
---

# Liquidate

Steps to liquidate:
1. Have a balance of USDi (to repay the debt)
2. Find an eligible vault 
3. Call the liquidate account function

Liquidators are incentivized to perform liquidators through the liquidationIncentive parameter on each collateral asset. The parameter is the percentage of the asset's price marked down for liquidation.

Interest Protocol's liquidation system is purposely simple. Vaults with debts greater than their borrowing power are eligible for liquidation. Liquidators can only liquidate a vault such that the vault's debt is equal to the vault's borrowing power. 

Once an account has been identified as liquidatable, a liquidator can call the tokenToLiquidate(vault id, asset to liquidate) function, which will return the maximum number of tokens that can be liquidated at that time. 

Note: the number of tokens to liquidate is a moving number because prices are called on each function call, and interest is accrued constantly. 

Use the liquidateAccount(vault ID, asset address to liquidate, token to liquidate) to liquidate a vault. The protocol needs to know the vault to verify whether it is eligible for liquidation, the asset to liquidate to check the vault's balance, and the number of tokens to liquidate so the liquidator can partially fill a liquidation if desired. If a liquidator specifies a number greater than the vault's balance, the protocol liquidates the vault's full balance. If a vault has multiple collateral assets, multiple liquidations are necessary. 
