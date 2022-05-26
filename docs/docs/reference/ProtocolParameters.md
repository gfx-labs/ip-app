# Governance Defined Parameters in Interest Protocol

## Protocol Parameters
### Interst Rate Curve
* 1st kink (s1): 40%
* 2nd kink (s2): 60%
* 1st kink rate (r1): 0.5%
* 2nd kink rate (r2): 10%
* Max rate (r3): 200%

### Fee Parameter
* Protocol Fee: 15%


## Asset Parameters
### Collateral Assset Parameters
* wETH: LTV: 85%, oracle address: tbd, liquidation incentive: 5%
* wBTC: LTV: 80%, oracle address: tbd, liquidation incentive: 5%
* UNI: LTV: 70%, oracle address: tbd, liquidation incentive: 8%

### wETH Oracle
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 60
* UniswapV3OracleRelay: _mul: 1e12
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: true
* UniswapV3OracleRelay: _pool: 0x1bcb372A9E3c1B67c09BadD9c02ba0BfBBDa8a90
* ChainlinkOracleRelay: feed_address:
* ChainlinkOracleRelay: mul: 1e10
* ChainlinkOracleRelay: div: 1

### wBTC Oracle
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 60
* UniswapV3OracleRelay: _mul: 1e12
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: true
* UniswapV3OracleRelay: _pool:
* ChainlinkOracleRelay: feed_address:
* ChainlinkOracleRelay: mul: 1e10
* ChainlinkOracleRelay: div: 1

### UNI Oracle
* AnchoredViewRelay: widthNumerator: 30
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 60
* UniswapV3OracleRelay: _mul: 1e12
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: true
* UniswapV3OracleRelay: _pool: 
* ChainlinkOracleRelay: feed_address:
* ChainlinkOracleRelay: mul: 1e10
* ChainlinkOracleRelay: div: 1

## Governance Parameters
* proposalThreshold: 250000

### Proposal Parameters
* votingDelay (blocks): 13140
* votingPeriod (blocks): 19710
* proposalTimelockDelay (seconds): 172800
* quorumVotes: 20000000

### Emergency Parameters
* emergencyVotingPeriod (blocks): 6570
* emergencyVotingTimelockDelay (seconds): 43200
* emergencyQuorumVotes: 50000000

