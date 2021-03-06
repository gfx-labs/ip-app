# Liquidator Contract

The [Liquidator contract](https://etherscan.io/address/0x0f131c38a552142d5753363090f6f7c4e01ab0e4) is a smart contract that allows for simple and easy liquiations on Interest Protocol. We welcome and encourage people to fork the contract and build more sophisticated liquidators. 

## Overview

[Liquidations](../../guides/Protocol%20Interaction/liquidate.md) are an important part of Interest Protocol, as they keep the protocol solvent and profitable for all USDi holders.

Liquidations cost [USDi](../../concepts/USDi/USDi.md) to perform. In effect, a liquidator is using USDi to purchase a borrower's collateral at a discounted rate.
The liquidator is then free to sell those assets at current market rates, thus yielding a profit.

However, this requires a liquidator to both possess enough USDi to return a vault to solvency, and to be willing to spend it to do so.

This is where the Liquidator contract comes in. This contract uses flash loans to allow anybody to liquidate any position on Interest Protocol, regardless of size, without the need to possess any funds other than the ether to cover the gas cost.

The Liquidator contract has no state, no owner, and holds no value for longer than a single transaction.

Once a user calls one of the liquidation functions, the profits are sent to the user in the same transaction.

## What is a flash loan?

All Ethereum transactions are *atomic*. This means that every aspect of the transaction must succeed, or the entire transaction will fail. Flash loans utilize this feature to provide loans without the need for any collateral or credit and can be very large in size, so long as they are repaid in the same transaction, with the addition of a small fee.

This makes flash loans an effective tool for liquidations on Interest Protocol.

### Overview of a flash loan liquidation

Due to the atomic nature of EVM transactions, all of these steps happen in the same transaction, and if any one fails, the entire transaction will revert

1. USDC is borrowed from the Flash Loan lender (Aave, Uniswap V3 or V2).
2. The USDC is deposited into the USDI contract for USDi, because USDi is required to perform the liquidation since debt is in USDi terms.
3. The liquidation is performed, and the resulting collateral is sent to the Liquidator contract.
4. The collateral is immediately sold on Uniswap V3 for USDC, which is sent back to the Liquidator contract.
5. The Liquidator swaps any remaining USDi not spent on liquidation back to USDC, Liquidator contract should now only hold USDC.
6. The USDC loan is repaid + the fee (Uniswap V3 has the lowest fee).
7. All remaining USDC is sent to the caller of the function.

## Borrowing USDC

The Liquidator contract can procure a USDC flash loan in three distinct ways:

* [Uniswap V3 Flash Swap](https://docs.uniswap.org/protocol/guides/flash-integrations/inheritance-constructors)
  * Fee: 0.01%
  * Gas: ~663k
* [Aave flash loan](https://docs.aave.com/developers/guides/flash-loans)
  * Fee: 0.09%
  * Gas: ~835k
* [Uniswap V2 Flash Swap](https://docs.uniswap.org/protocol/V2/guides/smart-contract-integration/using-flash-swaps)
  * Fee: 0.3%
  * Gas: ~655k when borrowing USDi, ~710k when borrowing USDC

Having multiple ways to utilize flash loans allows for flexibility  in terms of liquidity and gas cost.

However, it is clear that at the current time, utilizing Uniswap V3 Flash Loans to borrow USDC is the most efficient way to use the Liquidator contract.

## Borrowing USDi

The Liquidator contract is also capable of borrowing USDi directly from the USDi/USDC pair on Uniswap V2 (so long as liquidity is sufficient). The advantage here is the lowest possible gas cost, and profit is paid in USDi as opposed to USDC. Additionally, the fee for the flash loan will be paid to the IP community acting as liquidity providers in this pool.

### Overview of a flash loan liquidation using USDi liquidity  

1. USDi is borrowed from the Uniswap V2 pair.
2. The USDi is spent on the liquidation, the resulting collateral is sent to the Liquidator contract.
3. The collateral is immediately sold on Uniswap V3 for USDC, which is sent back to the Liquidator contract.
4. All USDC on the Liquidator contract is deposited into the Interest Protocol reserve, and an equivalent amount of USDi is returned to the Liquidator contract.
5. The USDi loan is repaid to the Uniswap V2 pool + the fee.
6. All remaining USDi is sent to the caller of the function.

## Important Technical Information  

* In order for the protocol lending out the flash loans to ensure the flash loan is repaid in the same transaction, all methods utilized by the Liquidator contract must implement and overwrite the respective callback function from the lending protocol.
  * For example, once the Liquidator contract initiates a flash loan on Uniswap V3 by calling `flash` on the pool contract, the pool will then call `uniswapV3FlashCallback` on the Liquidator contract.
    * This function must be implemented and overridden by the Liquidator contract. Here is where the logic for the liquidation takes place, followed by repaying the loan.
    * Flash loans on Aave and Uniswap V2 work in a similar fashion.
    * These callback functions must be external so the lending protocol can reach them, but should never be called erroneously by any other address.  
* Transactions that utilize flash loans are inherently complex in terms of the number of computational steps that take place, so as a result the gas usage is quite high. If liquidations become competitive, a high priority fee may be needed to make sure your transaction goes through.
  * All liquidations on the Liquidator contract can perform an optional check to ensure the gas cost does not exceed the revenue from the liquidation
* All external contracts that the Liquidator accesses are hard coded to save on gas costs:
  * [Interest Protocol Vault Controller](https://etherscan.io/address/0x4aaE9823Fb4C70490F1d802fC697F3ffF8D5CbE3)
  * [Interest Protocol USDI Token](https://etherscan.io/address/0x2A54bA2964C8Cd459Dc568853F79813a60761B58)
  * [Uniswap V2 Factory Contract](https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f)
  * [Uniswap V3 Router](https://etherscan.io/address/0xE592427A0AEce92De3Edee1F18E0157C05861564)
  * [Uniswap V3 Factory](https://etherscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984)
  * [Uniswap V3 DAI/USDC Pool at Fee: 100](https://etherscan.io/address/0x5777d92f208679DB4b9778590Fa3CAB3aC9e2168)
  * [USDC contract](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
  * [wETH contract](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
* The [source code](https://gfx.cafe/ip/liquidator) for this contract has been made public, anyone is welcome to modify or improve it for their own use.
* Deployment address: [0x0f131c38a552142d5753363090f6f7c4e01ab0e4](https://etherscan.io/address/0x0f131c38a552142d5753363090f6f7c4e01ab0e4)

## Functions

* function `calculateCost`(uint96 vault, address asset) external view returns (uint256 amount)
  * Returns an accurate estimate for the cost to liquidate the vault for the asset
  * Call this immediately before liquidation, and pass the value returned as the amount
* function uniswapV3FlashCallback(
        uint256 fee0,
        uint256 fee1,
        bytes calldata data
    ) external override
  * Callback function, this should only be called by the Uniswap V3 Pool
* function `uniV3FlashLiquidate`(FlashParams memory params) external
  * Call this to liquidate using USDC liquidity from the Uniswap V3 USDC/DAI pool at fee: 100 (1BPS)
  * The params argument should be structured as follows:
    * [uint256 amount,
        uint152 vault,
        address asset,
        bool profitCheck]
      * profitCheck is an optional check to ensure the gas cost does not exceed revenue
* function `aaveFlashLiquidate`(
        uint256 amount,
        uint96 vault,
        address asset,
        bool profitCheck
    ) external
  * Call this to liquidate using USDC liquidity from Aave
  * profitCheck is an optional check to ensure the gas cost does not exceed revenue
* function `executeOperation`(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool)
  * Callback function, this should only be called by Aave
* function `uniV2FlashLiquidate`(
        address tokenBorrow,
        uint256 amount,
        uint96 vault,
        address asset,
        bool profitCheck
    ) external
  * Call this to liquidate using USDC or USDi liquidity from Uniswap V2
  * tokenBorrow argument should be either USDC or USDi
  * profitCheck is an optional check to ensure the gas cost does not exceed revenue
* function `uniswapV2Call`(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external override
  * Callback function, this should only be called by the Uniswap V2 pair
