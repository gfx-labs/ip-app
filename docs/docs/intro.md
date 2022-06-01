# What is Interest Protocol?


## Overview
Interest Protocol (IP) is the first fractional reserve banking protocol on the Ethereum blockchain that pays interest to all depositors. Interest Protocol issues a stablecoin, named USDi, that is both over-collateralized and highly scalable. USDi holders automatically earn yield without having to stake, which means Interest Protocol provides yield opportunities to gas-conscious users. Compared to lending protocols without fractional reserves, Interest Protocol can generate more loans from a given amount of capital while incurring less liquidity risk.


## Who participates?
The protocol has two primary participants:
* Depositors who hold USDi and earn interest
* Borrowers who borrow USDi from the protocol after posting collateral

## What are the main pieces? 
Every lending protocol has four key pieces: 
1. Depositing capital 
2. Posting collateral & borrowing capital
3. Interest rate system to maintain the peg
4. Liquidation system to prevent defaults

We have improved upon each piece to offer the most efficent credit market in DeFi.

* **Depositors** can deposit capital (USDC) and receive an LP token (USDi) representing their loan to the protocol. The USDi token is a stablecoin that is redeemable one-to-one for the reserve asset (USDC). While holding USDi, interest is automatically accrued to the holder through a continuously increasing rebasing system. This innovation eliminates the depositor's need to stake capital and sacrifice liquidity. 

* **Borrowers** can post collateral assets by opening a vault. Each borrower has their own vault to deposit their collateral in. The collateral is used to cross-margin the user and increase their borrowing power. When a vault holds governance tokens as collateral, the vault owner can delegate the votes to another wallet so they can continue participating in protocol governance while borrowing against the governance tokens.

* Interest Protocol's **interest rate system** ensures that USDi holders can redeem their USDi for USDC and is thus critical to maintaining the peg. When the protocol has a low reserve of USDC, both the borrow rate and the deposit rate of USDi automatically increase. This induces users to repay their USDi loans or deposit USDC to mint USDi, increaseing the reserve ratio.

* The **liquidation system** is the main safety feature that allows Interest Protocol to extend loans to borrowers while protecting depositors. Liquidations occur whenever a vault's borrowing power drops below its debt. Liquidators are incentivized through a discount on the price of collateral assets. Governance can configure the discount for each asset. Unlike most protocols, Interest Protocol's liquidation system protects the borrower from unnecessary liquidations because liquidators can only liquidate a vault until their borrowing power is equal to their debt. To efficiently process large liquidations, liquidators are allowed to liquidate any amount as long as it does not exceed the maximum amount. Additionally, liquidators can be partially filled if they attempt to liquidate more than is allowed.

The combination of capital-efficient lending, a robust interest rate system, and a simple yet efficient liquidation system makes for a strong foundation to become the best lending platform in DeFi.

## Why did we build Interest Protocol? 
1. *To increase access to financial services.* IP offers fair and transparent access to a lending market to anyone with an internet connection—increasing access to capital and thus economic opportunity for everyone around the world. IP's gas efficiency allows small users to participate in yield farming on Ethereum without sacrificing liquidity.

2. *To increase the efficiency of financial services.* US commercial banks charge an average annual interest rate of 2–13% while paying depositors an average annual interest rate of just 0.06%. The difference goes to cover the middlemen expenses. Even DeFi lending protocols often operate based on manual decisions, which raises costs. IP’s smart contracts are designed so that the protocol can operate in volatile market environments without manual intervention. The corresponding efficiency gains are transferred to the depositor.

3. *To bring much-needed innovations to DeFi.* GFX team members have been active contributors of prominent DeFi protocols. We came to realize that DeFi lacks a fractional reserve bank that pays interest to depositors. So we built one ourselves.




