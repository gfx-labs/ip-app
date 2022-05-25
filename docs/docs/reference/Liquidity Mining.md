# Liquidity Mining

Interest Protocol runs two liquidity mining programs to bootstrap protocol usage. First, the protocol provides IPT rewards to those who borrow USDi from the protocol. Second, the protocol provides IPT rewards to market makers who provide ETH-USDi liquidity on Uniswap V2. 10% of IPT supply is earmarked for liquidity mining rewards.


## Borrowing Incentives

Interest Protocol will distribute IPT rewards pro-rata to users who borrow USDi from Interest Protocol. The initial distribution speed will be 2.015333446 IPT per block and decrease by 0.1832121315 IPT every three months. After two years, the protocol will have distributed around 6.67% of the IPT supply.

Note that rewarding borrowers also benefits depositors (USDi holders) through higher interest rates. Depositors will reap this benefit without having to spend gas to claim rewards.

## Market Making Incentives

Interest Protocol will distribute IPT rewards to users who provide ETH-USDi liquidity on Uniswap v2. The initial distribution speed will be 1.007666723 IPT per block, and the protocol will decrease the distribution speed by 0.09160606573 IPT every three months. After two years, the protocol will distribute around 3.33% of the IPT supply through market-making incentives.


## Merkle Root Implementation
We are utilizing Balancer's merkle root system for distributing rewards. An off-chain open source script will calculate the amount of IPT to reward each IPT borrower and Uniswap v2 liquidity provider. The script will be run weekly, starting from the protocol launch and occurring every seven days thereafter. Users can let their rewards accrue over multiple weeks and claim when convenient. 

Token holders can adjust the protocol's liquidity mining system through the protocol's governance system.  

The script can be found: here.