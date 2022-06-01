---
id: How To Borrow
---

# Borrowing

To borrow USDi from the protocol:
1. Have a balance of a supported collateral asset in your wallet.
2. Go to Interest Protocol's interface and connect your wallet.
3. If it is your first time borrowing, you will be prompted to mint your vault.
4. Deposit collateral into your vault.
5. Borrow USDi.

To borrow from Interest Protocol, users must open a vault. Vaults are smart contracts that are the conduit between the vault owner and the protocol. Each vault has a unique ID and is owned by its creator. Once minted, vaults exist forever. The borrower can deposit supported collateral to the vault through the interface or by transferring assets to their vault address. 

**Note**: Only send ERC20 supported tokens to a vault. **Do not send native ETH to a vault**. Only wETH is supported. 

A vault's borrowing power equals the sum of collateral values discounted by each collateral's LTV. A user can borrow USDi from their vault up to the vault's borrowing power.

Upon a borrow transaction, USDi is transferred to the vault owner, and interest begins to accrue. Interest Protocol charges a variable rate that depends on the protocol's reserve ratio.

**Note**: If at any time the vault's borrowing power is less than the vault's outstanding balance of USDi loan, the vault is eligible for liquidation. 

**Note**: Your loan will start accruing interest immediately after you borrow. If you borrow exactly up to your borrowing power, your vault will be eligible for liquidation after the next rebase, which can sometimes take place in the same block as your borrow transaction.

At any time, the vault owner can deposit additional collateral assets to their vault, borrow more USDi, or repay their loan.

## Voting with Collateral
Governance tokens deposited as collateral retain their voting power through delegation. For example, UNI holders can open a vault, deposit UNI, borrow USDi, and delegate their voting power to an address of their choice. Governance token holders no longer need to choose between borrowing and governance participation. 

To delegate the vault's voting power, look for the `delegate` button on the frontend and enter the address to delegate voting power to.

More information on borrowing available [here](../../../concepts/Borrowing/InterestRates).


###### tags: `IP`

