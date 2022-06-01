# Risk Management

To operate safely in adverse market environments, Interest Protocol manages two major financial risks: liquidity risk and credit risk. Managing these risks is essential for maintaining USDi's peg.

## Liquidity Risk
Liquidity is defined as the protocol's ability to meet redemption demand. The protocol has an obligation to USDi holders to redeem 1 USDi for 1 USDC on demand. On the other hand, the protocol allows borrowers to maintain a outstanding loan balances as long as they wish to, provided that they maintain enough collateral to stay over-collateralized. This causes a maturity mismatch, and it is possible at times for the protocol to face redemption demand in excess of the USDC held in Reserve. The protocol uses two mechanisms to minimize this possibility.

First, Interest Protocol aims to maintain a sufficiently high reserve ratio at all times by using a variable interest rate. As explained in the USDi and interest rate section; whenever the reserve ratio is low, a high interest rate incentivizes users to replenish the reserve by repaying their debt or depositing USDC— ensuring that any USDC shortage is short-lived.

Second, Interest Protocol aims to guarantee liquidity in various USDi markets. So long as USDi can be swapped for other assets with little slippage, users can hold USDi to earn interest until they wish to purchase other assets, at which point they can pay for the assets with USDi. Liquidity in USDi markets lowers the demand to redeem USDi for USDC.

## Credit Risk

Credit risk is the risk of borrowers defaulting on their loans. To manage credit risk, Interest Protocol only makes over-collateralized loans and liquidates under-collateralized vaults. The protocol employs an efficient liquidation mechanism that quickly and accurately unwinds under-collateralized vaults. This means that—compared to lending protocols with less efficient liquidation mechanisms—Interest Protocol is able to extend loans on more favorable terms (such as with higher LTVs) while incurring less credit risk.

Timely liquidation also depends on the characteristics of each collateral asset, such as  volatility, DEX liquidity, and smart contract and governance risk. We expect that managing the risk of collateral assets will be one of the primary tasks of protocol governance.

## Comparison against other stablecoins

### Dai
Dai's peg to $1 relies on the Peg Stability Module (PSM). The PSM lets Dai holders redeem 1 Dai for 1 USDC and allows USDC holders to deposit 1 USDC for 1 Dai. So long as the PSM has USDC, Dai will not trade below $1. However, if the PSM were to have a balance of 0 USDC, Dai can lose peg. MakerDao relies on governance to maintain enough USDC in the PSM. For example, governance can raise the interest rate (stability fee) to encourage Dai borrowers to close their position, or increase the Dai Savings Rate (DSR) to incentivize users to deposit USDC into the PSM.

Interest Protocol does not rely on governance to hold the peg. Instead, as the reserve ratio decreases, the interest rate function automatically raises both the borrow rate and the deposit rate to discourage borrowing and encourage depositing.

### Tether
Tether (USDT) has had issues with maintaining its dollar peg. Concerns about Tether's peg persist because the composition of the assets held by the issuer is not publicly known. In contrast, Interest Protocol's balance sheet is transparently observable. The balance sheet changes through protocol operations running on smart contracts, and these contracts are open source. Users can see firsthand what assets and liabilities the protocol has and how the protocol manages them.

