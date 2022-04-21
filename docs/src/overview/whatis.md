# USDi
## What is USDi?

USDi is a stablecoin issued by Interest Protocol and stands for USD with interest. USDi automatically earns compounding interest without requiring holders to stake it anywhere. 

## USDC ↔ USDi

Currently, USDi is pegged to USDC. USDC holders can mint USDi by depositing USDC in the protocol 1:1 via the `deposit(usdc_amount)` function on the `USDi` contract. Holders of eligible collateral assets can mint USDi by borrowing it from the protocol via the `borrowUsdi(id, amount)` on the `VaultController`. To maintain a reliable value for USDi, holders can withdraw USDi for USDC from the protocol at a 1:1 ratio via the `withdraw(usdc_amount)` function on the `USDi` contract. 

## Compounding Yield
USDi holders accrue interest from borrowers paying to borrow USDi, net of the protocol fee, which is distributed pro-rata to all USDi holders in the form of additional USDi. The protocol implements the distribution by scaling up the balance of USDi tokens in all addresses so that the value of each USDi remains pegged to 1 USDC. This means that USDi is a liquid liquidity provider (LP) token. USDi earns yield generated from protocol operations and remains liquid because the protocol holds a reserve of USDC. 

USDi holders can earn compounding yield without staking. This improves gas efficiency because there is no need to switch back and forth between the LP token and the stablecoin. It is especially beneficial to smaller participants who spend a higher percentage of their trades on gas fees. Participants no longer have to choose between liquidity and yield; USDi provides both.

## Liquidity for USDi 

The protocol aims to guarantee liquidity in two ways:

1. Via the reserve of USDC maintained by the protocol. 

Interest Protocol uses a fractional reserve banking style system. The protocol charges borrowers interest to borrow USDi, and the interest rate is based on the reserve ratio. The reserve ratio is the protocol reserve of USDC over the total supply of USDi. As USDC is deposited, the reserve ratio increases, and as USDC is withdrawn, the reserve ratio decreases. As the reserve ratio decreases, interest rates rise, and as the reserve ratio increases, interest rates decrease. The protocol sets a minimum reserve ratio to ensure sufficient liquidity for USDi holders. Once the minimum is hit, the interest rate will increase significantly. This incentivizes USDC holders to deposit and borrowers to pay back their loans.

2. Ecosystem opportunities for USDi. 

USDi can be utilized in AMM pools and generally most DeFi protocols. Funds and exchanges can hold USDi to easily earn interest on their dollar holdings without sacrificing substantial liquidity. Interest continues to accrue regardless of where the USDi resides. 


