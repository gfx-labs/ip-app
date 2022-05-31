# Limitations

### USDi contract
* Donations must be made using the donate function on the USDI contract. These donations will take USDC and distribute it to all USDi holders. Any USDC that is sent to the USDi contract cannot be easily refunded. Governance can periodicly call `donateReserve()`, which will donate any USDC held by the USDi contract to all USDi holders in a similar way to `donate()`. Once `donateReserve()` is called, there is no longer any possibility to refund any USDC that is accidently sent to the USDi contract, unless governance wishies to do so out of its treasury. 

* Nothing stops a user from calling `repayAll()` on an empty vault or a vault with 0 liability, doing so will simply waste gas.

* The USDi contract cannot hold or receive any USDi, sending USDi to the contract will simply revert. Donations should be made using USDC via the `donate()` function. 

* If there are no loans currently active (0 liability) then there will be no yield on USDi tokens, and the balances will remain constant. 

* If there is no USDC in the reserve, the interest rate for all borrowers and USDi holders will be at its maximum. Though this could temporarily affect the peg for USDi, all USDi tokens are NOT undercollateralized during this scenario, all USDi is still backed by the loans that are currently in effect. This is an example of a liquidity problem, not a collateralization problem. 

### Liquidations
* Liquidators must pay for liquidations using USDi. Liquidations can not currently be paid using USDC or any other asset. Liquidations using insufficient USDi will result in a revert. 

* Calling `tokensToLiquidate()` prior to liquidations is a good way to get an approximate amount of tokens that can be liquidated from a particular vault, but the amount will not be exact. Even calling this in the same block as a liquidation will result in a slight discrepancy, as interest is calculated prior to liquidation. As a result, the result from `tokensToLiquidate()` will be very slightly less than the true amount. Passing a value sufficiently larger than this result will result in a complete liquidation, as the liquidation math will accurately calculate the maximum tokens to liquidate upon liquidation.  

* liquidationPenalty: LTV has to be strictly positive for each asset!!!!!!!!!! Pls remember future governance people. Actually, we get /0 or underflow if this is violated.

* Calling `tokensToLiquidate()` on a vault that is solvent will revert. Use checkVault() to determine solvency first. 

* If a vault contains multiple assets and is insolvent by only a small amount, it is possible for a liquidator to potentially liquidate the vault's entire holdings of one of the assets, provided doing so will put the vault back into a healthy state. It is not possible to borrow against one particular asset in the vault, all registered assets held by the vault will contribute to borrow power, and all are at risk for liquidation if the vault becomes insolvent. 

* Any assets, including any unregistered assets that may have been transferred to the vault accidently, may not be withdrawn if the vault is insolvent.

### Loans
* Calling `repayAll()` consumes about half as much gas as compared to repay(), though calling `repayAll()` while holding insufficient USDi will revert

### Vaults
* Vaults cannot currently accept native ether, sending ether to a vault or to any contract in IP will revert. One future upgrade may be to allow the option to mint a vault that supports native ether. Minting such a vault will cost additional gas (compared to the current vaults) and many users may not need this functionality. 

### USDi in AMM Protocols (i.e. Uniswap)

* USDi may be used in AMM protocols like uniswap. However, because USDi is constantly rebasing, its value may not be accurately reflected while in the custody of these protocols. For example, a uniswap v2 pair will report the value of USDI in the pool as of the last swap, and any interest generated will not be reported by `getReserves()` until the next swap takes place. The true value can still be attained by calling `balanceOf` on the USDi contract. Users can freely supply USDi and generate LP rewards while still earning interest on their USDi. When removing liquidity, the user's Uniswap LP tokens represent their share of the whole amount of USDi in the pool, and the user will receive their amount pro rata, thusly receiving their interest on the USDi supplied. 

### Upgradeability
* Only the VaultController and USDi contracts are explicitly upgradeable. Other future changes (such as new oracles, vaults, or curves) can be achieved by deploying new logic and pointing the VaultController and/or USDi contracts to the new versions as needed. 

* The upgradeability of the VaultController and USDi contracts follows the model of the [OpenZeppelin transparent upgradeable proxy](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies). 

### Wave IPT sale
In the case of partial saturation, if the implied price is not evenly divisible into the totalClaimed, there is the potential for a division error. 
As an example of this scenario, suppose 20mm USDC is committed to the Wave contract, and there are 30mm IPT to distribute pro rata. This results in an implied price of 666666 or 0.66 USDC per IPT. However, if you were to multiply 666666 USDC by 20mm USDC, the result would be 30,000,030.00030 IPT to be distributed. Therefor, the last to withdraw will be shorted about 30 IPT. This scenario can be further referenced in the tests. 

The IPT held by the Wave contract must equal or exceed `totalReward` as passed to the constructor. This amount must equal 30mm IPT or 30,000,000.00. Otherwise, it is possible for claimers to be unable to receive the IPT they purchased. 

