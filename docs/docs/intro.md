# What is Interest Protocol?


## Overview
Interest Protocol is the first fractional reserve banking protocol on the Ethereum blockchain that pays interest to all depositors. Interest Protocol issues a stablecoin, named USDi, that is both over-collateralized and highly scalable. USDi holders automatically earn yield without having to stake, which means Interest Protocol provides yield opportunities to gas-conscious users.  Given market interest rates of 5\% to 10\%, Interest Protocol's lending operations are 2 to 2.5 times as capital efficient as those of lending protocols without fractional reserves. 


## Who participates?
The protocol has two primary participants:
* Depositors who hold USDi and earn interest
* Borrowers who borrow USDi from the protocol after posting collateral

## What are the main pieces? 
Every borrow/lend protocol has four key pieces: 
1. Depositing capital 
2. Posting collateral & borrowing capital
3. Interest rate system to ensure liquidity
4. Liquidation system to prevent defaults

We have improved upon each piece to offer the most efficent credit market in DeFi.

* **Depositors** can deposit capital (USDC) and receive an LP token (USDi) representing their loan to the protocol. The USDi token is a stablecoin that is redeemable one-to-one for the reserve asset (USDC). While holding USDi, interest is automatically accrued to the holder through a continuously increasing rebasing system. This innovation eliminates the depositor's need to stake capital and sacrifice liquidity. 
* **Borrowers** can post collateral assets by opening a vault. Each borrower has their own vault to deposit their collateral in. The collateral is used to cross-margin the user and increase their borrowing power. When a vault holds governance tokens as collateral, the vault owner can delegate the votes to another wallet so they can continue participating in protocol governance while borrowing against the governance tokens.
* Interest Protocol's **interest rate system** ensures that USDi holders can redeem for USDC and is thus critical to maintaining the peg. The protocol uses a piecewise linear function to determine the interest rate, where the x-axis is the protocol's reserve ratio and the y-axis is the interest rate. Governance influences USDi liquidity by choosing the reserve ratios and the interest rates at the two kinks (s1,r1) and (s2,r2).

![](https://i.imgur.com/sHufcmn.png)

* Regular protocol operations are expected to occur in the middle segment between these two kinks. Once the reserve ratio drops below s1, the interest rate increases steeply in order to incentivize new depositors or for borrowers to close their position. Whenever the protocol's reserve ratio changes, the interest rate is updated and the accrued interest is distributed to depositors and the protocol.  
* The **liquidation system** is the main safety feature that allows Interest Protocol to extend loans to borrowers while protecting depositors. Liquidations occur whenever a vault's borrowing power drops below their debt. Liquidators are incentivized through a discount on the price of collateral assets. Governance can configure the discount for each asset. Unlike most protocols, Interest Protocol's liquidation system protects the borrower from unnecessary liquidations. Liquidators can only liquidate a vault until its borrowing power is equal to their debt. 

To protect against large liquidation, liquidators are able to partial fill necessary liquidations. Additionally, liquidators can be partially filled if they attempt to liquidate more than available. -> do we need these details here?

The combination of a robust interest rate system, a simple yet efficient liquidation system, and capital-efficient lending makes for a strong foundation to become the largest lending platform in DeFi. 







