# USDi
## What is USDi?

USDi is a stablecoin pegged to \$1 that automatically earns interest. Anyone can mint USDi by depositing an equal amount of USDC into the protocol, and anyone can redeem their USDi for an equal amount of USDC held by the protocol. 
USDi is also minted when users borrow from the protocol. Borrowers can post collateral and take out loans denominated in USDi. The protocol mints USDi to generate loans and burns USDi when they are repaid.

## Fractional Reserve
New USDi is created only when an equivalent amount of USDC is deposited into the protocol, a borrower takes out an over-collateralized loan from the protocol, or when interest accrues to existing loans. Hence USDi is fully backed by USDC and loans. At the same time, whenever there are outstanding USDi loans, the amount of USDC held by the protocol is smaller than the amount of circulating USDi. This is why we say that Interest Protocol implements *fractional reserves*.

## USDC ↔ USDi

USDi is pegged to USDC. USDC holders can mint USDi by depositing USDC in the protocol 1:1 via the `deposit(usdc_amount)` function on the `USDi` contract. Holders of eligible collateral assets can mint USDi by borrowing it from the protocol via the `borrowUsdi(id, amount)` on the `VaultController`. USDi holders can burn USDi to receive USDC from the protocol at a 1:1 ratio via the `withdraw(usdc_amount)` function on the `USDi` contract. 

## Compounding Yield
USDi holders accrue interest from interest paid by borrowers, net of a protocol fee. The interest is distributed pro-rata to all USDi holders in the form of additional USDi. Interest Protocol implements this distribution by scaling up the balance of USDi tokens in all addresses so that the value of each USDi remains pegged to 1 USDC. This means that USDi is a liquidity provider (LP) token that is liquid. USDi is an LP token that earns yield generated from protocol operations, and USDi is liquid because it is pegged to $1. 

Therefore, USDi holders can earn compounding yield without staking. This improves gas efficiency because there is no need to switch back and forth between the LP token and the stablecoin, and is especially beneficial to small users who spend a higher percentage of their trades on gas fees. DeFi users no longer have to choose between liquidity and yield; USDi provides both.

## Stability of USDi

USDi can _maintain a stable_ value even in adverse market conditions because USDi is a fully collateralized stablecoin, backed by USDC and over-collateralized loans.

USDi is _pegged to $1_ because 1 USDi can be redeemed for 1 USDC at Interest Protocol.

Interest Protocol automatically maintains its reserve of USDC by adjusting the interest rate as a function of the *reserve ratio*, which is defined as the amount of USDC in the protocol's reserve divided by the total supply of USDi. A lower reserve ratio implies that there is less USDC to meet the potential redemption demand of USDi. As the reserve ratio decreases, both the borrow rate and the deposit rate of USDi increase. This induces users to repay their USDi loans or deposit USDC to mint USDi, increaseing the reserve ratio.

## Using USDi

When a USDi holder wants to use their USDi to purchase other assets, they can of course redeem their USDi for USDC at Interest Protocol and then spend the USDC. However, Interest Protocol aims to provide ways to directly swap USDi against other assets. At launch, Interest Protocol will have a liquidity mining program to incentivize ETH-USDi liquidity. This will allow USDi holders to use their USDi without having to redeem for USDC.

USDi can be utilized in most DeFi protocols, including AMM pools. Funds and exchanges can hold USDi to easily earn interest on their dollar holdings without sacrificing liquidity. Interest continues to accrue regardless of where the USDi resides.
