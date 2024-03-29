# Capped Collateral Tokens

Interest Protocol prioritizes risk management. In an ideal world, the protocol would support a wide array of collateral assets for users to borrow against. Interest Protocol already has a flexible oracle system to support a wide variety of assets, voting for governance tokens, and a totally new liquidation system.

However, it is well known the greatest risk to a liquidation platform are the collateral assets. Specifically, with niche collateral assets on Aave v2 and Compound v2, those protocols run the risk of a large holder supplying a significant portion of the circulating supply to the protocol. If that position is later liquidated, it would likely put the account underwater and leave the protocol with a loss.

To empower Interest Protocol to support more assets while reducing risk, we’re introducing Capped Collateral Tokens. This new type of collateral functions similarly to the existing type, but limits the total number of tokens used as collateral to the platform.

For example, IPT holders could list dYdX as collateral with a limit of 5 million dYdX tokens, a 65% LTV, and a 10% liquidation penalty. A dYdX token price of $2.50 would put the platform’s maximum exposure at ~$8.1m. dYdX holders would continue to retain their voting power, and as liquidity improves, governance could choose to increase the cap. If protocol governance became concerned about the quality of collateral after its addition to the protocol, that cap could then be adjusted down without immediately liquidating users.

Capped Collateral Tokens enable the protocol to support a wide variety of assets while prudently managing the exposure to any individual asset.

DeFi is best when open collaborations with other protocols are possible. With IP’s governance token voting support and capped token functionality, it is well positioned to support DeFi’s large collection of governance tokens. Projects interested in learning whether Interest Protocol could support their governance tokens should visit the Discord and forum.

## Implementation

Capped Collateral Tokens have two key contracts. The Voting Vault Controller (VVC) & the Capped Token. The VVC mints a sub-vault (voting vault) and handles the registration of underlying assets. To register a new Capped Token, the Capped Token contract must already be deployed along with the requisite oracle contracts. A governance proposal can call the registerUnderlying() on the VVC and then call the registerERC20() on the main vault controller. 
 
Deposits of capped tokens are made at the capped token contract, and withdrawals occur at the vault. Any capped token withdrawal from a vault will deliver the underlying token, including for liquidations. Capped tokens are only accessible in Intrest Protocol.
 
Governance can manage the loan to token value and liquidation penalty like any collateral asset. The only additional parameter to manage is the cap. The cap is set by governance on the Capped Token contract. The cap may be lowered below the current total supply to limit additional deposits without immediately affecting existing deposits. 

## Usage
On the Interest Protocol site, the user experience for Capped Collaterals is almost identical to regular collaterals. The exception is that Capped Collaterals require a new sub-vault (to support the additional functionality) and approval by the vault owner for the capped token contract to transfer the underlying tokens from their wallet. Every Interest Protocol user must have a vault. Users depositing Capped Collaterals, such as MATIC, also need to create a sub-vault (voting vault) that manages the underlying assets of the capped tokens. Deposits of underlying assets are held in the sub-vault (voting vault) and can be withdrawn like any other collateral asset in the protocol. The Capped Collateral system is compatible with governance tokens. Governance tokens in the sub-vault (voting vault) can delegate their voting power to any address.

An example of Capped Collaterals with MATIC (assuming you already have a vault)

1. Have a balance of MATIC in your wallet. 
2. Deposit MATIC
3. Assuming it is your first time using a Capped Collateral, the interface will prompt you to approve a transaction to create the sub-vault. Note: this is a one-time cost for all Capped Collaterals.
4. Once the sub-vault is created, you'll be prompted to approve the cMATIC contract to transfer your MATIC from your wallet. Note: this is a one-time cost for MATIC. 
5. After the approval, you'll be able to deposit MATIC. The MATIC will transfer from your wallet to your sub-vault. cMATIC (capped MATIC) will be minted and transferred to your main vault. Once the cMATIC makes it to your main vault, your vault borrowing power will increase. 
6. You can withdraw MATIC at any time. One transaction will burn the cMATIC in the sub-vault and return MATIC to the vault owner.

## Links
[Voting Vault Controller](https://etherscan.io/address/0xae49ddca05fe891c6a5492ed52d739ec1328cbe2#readProxyContract)

[Capped Matic](https://etherscan.io/address/0x5AC39ED42E14CF330A864D7D1B82690B4D1B9E61#readProxyContract)
