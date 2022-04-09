# What is USDI?

USDi is a stablecoin issued by Interest Protocol and stands for USD with interest. As the name suggests, USDi automatically earns compounding interest without requiring you to stake it anywhere.

## Deposit USDC to mint USDI

You can deposit USDC into the protocol to mint USDi at a 1:1 ratio. USDC deposits are kept in the protocol's [reserve](./accounting.md) until they are redeemed.

You can think of depositing USDC as depositing cash into a bank. USDC is like cash, and USDi is like the balance on your checking or savings account that you receive for depositing cash. You can deposit USDC to the protocol to receive USDi, which earns interest. USDi can be used to buy other assets, just as you would use a debit card to pay from your account balance.


## Redeem USDI for USDC 

You can burn your USDi to receive USDC at a 1:1 ratio. This USDC comes from the [reserve](./accounting.md)

The protocol aims to guarantee liquidity for swapping USDi against a diverse range of assets. With enough liquidity, users will rarely need to actually redeem USDi for USDC, just as we do not always need to withdraw cash from the bank to make purchases. However, the fact that USDi can be redeemed for USDC keeps USDi pegged to USDC.


## Compounding Yield
The interest accrued to [usdi loans](./lending.md) net of a protocol fee, is distributed pro rata to all USDi holders in the form of additional USDi. The protocol implements the distribution by [scaling up](./smart_contracts.md) the balance of USDi tokens in all addresses so that the value of each USDi remains pegged to $1. This means that USDi is a liquidity provider (LP) token that is liquid. USDi earns yield generated from protocol operations, but remains liquid because it is pegged to $1. 

As a result, USDi holders are able to earn compounding yield without staking. This improves gas efficiency because there is no need to switch back and forth between the LP token and the stablecoin. It is especially beneficial to retail investors who spend a higher percentage of their trades on gas fees. Investors no longer have to choose between liquidity and yield; USDi provides both.