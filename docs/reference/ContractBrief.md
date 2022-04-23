# Interest Protocol Contracts Brief 

## Core Contracts
* USDi: a USDC synth. 1:1 to USDC. Interest baring via (Ampleforth) rebasing. The contract is upgradable via governance.
* Vault: where a borrower holds their collateral assets.
* VaultController: the core math and functionality of the protocol. Each vault references the VaultController. The contract is upgradable via governance

## Auxiliary Contracts
* CurveMaster: is what the VaultController calls to calculate the borrow rate. Set at the VaultController via address. 
    * ThreeLines0_100: is called by the CurveMaster to calculate the borrow rate.
* OracleMaster is what the VaultController calls for prices. Set at the VaultController via address. 
    * AnchoredViewRelay: called by the OracleMaster. It santity checks the anchor against the main price.
    * ChainlinkOracleRelay: called by the AnchoredViewRelay. Gets the lastestAnswer from a Chainlink oracle. 
    * UniswapV3OracleRelay: called by the AnchoredViewRelay. Calculates the price of x ticks for a UniV3 market.

