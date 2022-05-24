---
id: How To Borrow
---

# Borrowing
To borrow USDi from the protocol, take the following steps:
1. Have a balance of a supported collateral asset in your wallet.
2. Go to Interest Protocol's interface and connect your wallet.
3. If it is your first time borrowing, you will be prompted to mint your vault.
4. Deposit collateral into your vault.
5. Borrow USDi.

To borrow from Interest Protocol, the borrower needs to open a vault. Vaults are smart contracts that are the conduit between the vault owner and the protocol. Each vault has a unique ID and is owned by the creator. Vaults that have been minted exist forever. The borrower can deposit supported collateral to the vault through the frontend or by transferring assets to the vault. 

**Note**: Only send ERC20 supported tokens to a vault. **Do not send native ETH to a vault**. Only wETH is supported. 

Once collateral has been deposited, the vault will have the borrowing power of the collateral's value discounted by the protocol's LTV for the asset. The vault can borrow USDi up to the vault's borrowing power. 

Upon a borrow, USDi is transferred to the vault owner, and interest begins to accrue. Interest is charged variably as the protocol's reserve ratio fluctuates.

Each vault is a living entity. Additional collateral assets can be deposited at any time, new loans can be made, and USDi can be repaid. Every vault operates under the same terms and procedures.

Governance tokens deposited as collateral retain their voting power through delegation. For example, UNI holders can open a vault, deposit UNI, borrow USDi, and delegate their voting power to an address of their choosing. Governance token holders no longer need to choose between capital power and voting interests. 

To delegate the vault's voting power, look for the `delegate` button on the frontend and enter the destination for the voting power. 

**Note**: If at any time the vault's borrowing power is less than the account's value of USDi borrowed at any time, it is eligible for liquidation. 

###### tags: `IP`

