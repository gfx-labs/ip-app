# Interest Protocol allows Balancer LP tokens (BPT) to be utilized as collateral
## Overview

Balancer LP tokens are yield-bearing tokens that accrue yield to the owners from fees and rewards.

## Description

Interest Protocol and GFX Labs have worked to implement measures to add Balancer LP tokens as collateral, and to stake these for Aura Liquidity Provider reward tokens while in the Interest Protocol vaults, giving borrowers the ability to stake these assets where applicable, as well as the ability to claim any rewards for staking.

This proposal will require an upgrade to the existing VotingVaultController, to allow it to track the new vault type as well as registered BPTs.

The first asset to be proposed for listing is [B-stETH-STABLE](https://app.balancer.fi/#/ethereum/pool/0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080). This is a MetaStablePool on the Balancer protocol. MetaStablePools are made up of two assets that are tied together in some way, where one is generally pegged to the other. In this case, the assets are wstETH and wETH. MetaStablePools like this one incorporate a [rate provider contract](https://etherscan.io/address/0x72D07D7DcA67b8A406aD1Ec34ce969c90bFEE768#readContract) to determine the exchange rate between the two assets.

Like most other assets on Interest Protocol, the collateral will be wrapped by a Cap contract in order to limit the total supply allowed on the protocol, thus mitigating liquidity risk. In this case it will be wrapped by a new [CappedBptToken Contract](https://gfx.cafe/ip/contracts/-/blob/master/contracts/lending/wrapper/CappedBptToken.sol).

While the goal is to end up with a staked [Aura Reward Token](https://etherscan.io/address/0xe4683Fe8F53da14cA5DAc4251EaDFb3aa614d528) in the Interest Protocol vault as collateral, these tokens are not able to be transferred, so users must deposit regular Balancer LPs (BPTs) such as B-stETH-STABLE, and these must then be staked on Aura in exchange for the reward token. This staking is, of course, done in an automated way upon deposit into a user’s vault.

The reasoning for this is because if we look at the [holders of B-stETH-STABLE](https://etherscan.io/token/0x32296969Ef14EB0c6d29669C550D4a0449130230#balances) on Etherscan, we can see that the overwhelming majority of these BPTs are held by the [Gauge Contract](https://etherscan.io/address/0xcD4722B7c24C29e0413BDCd9e51404B4539D14aE). This is because in order to maximize rewards for your BPT, it should be staked on the corresponding gauge contract, in exchange for these Gauge Tokens.

However, if we further look at the [holders of the gauge token](https://etherscan.io/token/0xcD4722B7c24C29e0413BDCd9e51404B4539D14aE#balances), we can again see that the overwhelming majority are held by the [Aura Voter Proxy](https://etherscan.io/address/0xaF52695E1bB01A16D33D7194C28C42b10e0Dbec2). This is because one can further increase rewards by staking through the Aura Finance infrastructure, which stakes deposited BPTs for Gauge Tokens, then consolidates the voting power into the single Aura Voter Proxy contract.

So we can see that the majority of stakers are providing liquidity through the Aura Finance infrastructure, as the [holders of the Aura Reward Token](https://etherscan.io/token/0xe4683Fe8F53da14cA5DAc4251EaDFb3aa614d528#balances) have a good distribution. Unfortunately, the Aura contracts do not allow the deposit of Gauge tokens for staking, only the underlying BPT, so this is why on Interest Protocol the listed asset will be the BPT, rather than the Gauge Token or Aura Reward Token.

Because BPTs, Gauge Tokens, and Aura Reward Tokens are all issued 1:1 with each other, our oracle can price all of them at the same value.

Staking is done via the [Aura Booster Contract](https://etherscan.io/address/0xA57b8d98dAE62B26Ec3bcC4a365338157060B234), which handles all of the staking, and delivers the Aura Reward Token in exchange for the underlying BPT. The logic to handle this is on the new version 3 Vault on Interest Protocol, the [VaultBPT](https://gfx.cafe/ip/contracts/-/blob/master/contracts/lending/vault/VaultBPT.sol).

## Staking in Detail

Staking BPTs while using them as collateral presents some challenges.

The first of which is that if the Aura Reward Token is not transferable, how do we liquidate a position if needed?

In order to achieve this, the transfer function of the VaultBPT is overridden to automatically unstake any staked BPTs therein. As the transfer function should only be called upon liquidation or withdrawal, this results in a smooth transition of staked illiquid Aura Reward Tokens to transferable BPTs.

In the case of a partial liquidation, all of the staked Aura Reward Tokens will be unstaked, but not all of the underlying BPTs will be transferred out from the Vault, so the vault owner will need to stake again in order to maximize the rewards.

Another challenge is that the staking of BPTs into Aura Reward Tokens happens differently than staking [AuraBal](https://etherscan.io/token/0x616e8bfa43f920657b3497dbf40d6b1a02d4608d), and we wanted the new vault type to be able to handle both.

AuraBal is similar to BPTs in the sense that it can be staked for Aura Reward Tokens, however rather than being an LP for the Balancer Protocol, AuraBal represents liquid [veBal](https://etherscan.io/token/0xC128a9954e6c874eA3d62ce62B468bA073093F25), (Vote Escrowed Balancer BPT). This token is not transferable, and represents the voting power for the Balancer protocol. More about veBal can be read about in the [Balancer Docs](https://docs.balancer.fi/concepts/governance/veBAL/), and more about AuraBal can be found in the [Aura Docs](https://docs.aura.finance/aura/what-is-aura).

Essentially, AuraBal can be staked by simply calling stakeAll() on its corresponding Aura Reward Token, whereas regular BPTs must first be staked into Gauge Tokens which must be sent to the Aura Voter Proxy contract in the correct way. Therefore, staking of normal BPTs happens via the Aura Booster Contract.

As part of the asset listing process, BPTs are associated with their corresponding Aura Reward Token so that staking can take place.

## Claiming of Rewards

Rewards can be claimed regardless of liability, including support for extra rewards (supported by some Aura Reward Tokens).

For example, in the case of the token being listed, B-stETH-STABLE, standard rewards are paid in [BAL](https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3D) tokens, and extra rewards are currently configured to be paid in [LDO](https://etherscan.io/address/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32).

Claiming of extra rewards is an optional bool argument when calling claimAuraLpRewards() on the VaultBPT contract. Claiming extra rewards is gas intensive and so should not be done if there are no extra rewards to be claimed.

Rewards are always sent to the vault minter, and as such claiming rewards is not a permissioned function.

Claiming of rewards has the possibility of doing a solvency check if needed. While this consumes a lot of extra gas, it is needed because if any of the rewards or extra rewards tokens happen to be a BPT registered as collateral, then claiming rewards would transfer out all of the collateral without regard for any liability that may exist on the vault.

The solvency check only happens if the rewards or extra rewards tokens happen to be a BPT registered as collateral, otherwise, the solvency check is skipped, saving about 450k gas.

