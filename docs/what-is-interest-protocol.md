# What is Interest Protocol?


## Overview
Interest Protocol is the first fractional reserve banking protocol that pays interest to all depositors. Interest Protocol issues a stablecoin named USDi that is both over-collateralized and highly scalable. Holders of USDi automatically earn yield without staking or sacrificing liquidity. Given market interest rates of 5\% to 10\%, Interest Protocol's lending operations are 5 to 7.6 times as capital efficient as those of lending protocols without fractional reserves. 


## Who participates?
The protocol has two primary participants:
* Lenders: who hold USDi and earn interest. 
* Borrowers: who borrow USDi from the protocol and post collateral. 

## What are the main pieces? 
Every borrow/lend protocol has four key pieces: 
1. Lending of capital & posting of collateral
2. Borrowing of capital
3. An interest rate system to ensure liquidity
4. A liquidation system to keep the system inline

We have improved upon each piece to offer the most efficent market in DeFi.

* **Lenders** can deposit capital (USDC) and receive an LP token (USDi) representing their loan to the protocol. The USDi token is redeemable for one reserve asset (USDC). While the holder poses USDi, interest is automatically accrued to the holder through a continuously increasing rebasing system. This innovation eliminates lenders' requirement for staking capital and substantial purchasing power loss. 
* **Borrowers** can post collateral assets by opening a Vault. Interest Protocol uses an accounting system whereby each borrower has a vault and deposits their collateral into it. The collateral is used to cross-margin the user and increase their borrowing power. Additionally, vaults can hold governance tokens for collateral purposes. The vault owner can delegate the votes to another wallet so they can continue participating in protocol governance without sacrificing capital.
* Interest Protocol's **interest rate system** ensures USDi holders can redeem for USDC and thus is critical to maintaining the peg. The protocol uses a piecewise linear curve function to determine the interest rate where the x-axis is the protocol's reserve ratio, and the y-axis is the interest rate. Governance influences USDi liquidity by choosing the reserve ratio and interest rate at s1 & s2.![](https://i.imgur.com/sHufcmn.png)
 Regular protocol operations should occur between these two points. The interest rate will kink after s1 to strongly incentivize new depositors or for borrowers to close their position. The interest rate is updated whenever the protocol's reserve ratio is calculated, and interest is distributed to lenders & the protocol at that time.  
* The protocol's **liquidation system** is the protocol's main safety feature for making good loans to borrowers and protecting lenders. Liquidations can occur whenever a vault's borrowing power drops below their debt. Each collateral asset has a liquidation incentive that is paid to liquidators. Governance can configure the incentive for specific to each asset. Unlike most protocols, Interest Protocol's liquidation system favors the borrower. Liquidators can only liquidate a vault such that their borrowing power is equal to their debt. To protect against large liquidation, liquidators are able to partial fill necessary liquidations. Additionally, liquidators can be partially filled if they attempt to liquidate more than available. 

The culmination of a strong interest system to maintain liquidity in USDi, a simple but exact liquidation system, capital-efficient lending, and borrowing solution makes for a strong foundation for governance to operate to become the largest borrow/lend platform in DeFi. 







