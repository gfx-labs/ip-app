# Governance Defined Parameters in Interest Protocol

## Protocol Parameters
### Interst Rate Curve
* 1st kink (s1): 40%
* 2nd kink (s2): 60%
* 1st kink rate (r1): 0.5%
* 2nd kink rate (r2): 10%
* Max rate (r3): 600%

### Fee Parameter
* Protocol Fee: 15%


## Asset Parameters
### Collateral Assset Parameters
* wETH: LTV: 85%, oracle address: tbd, liquidation incentive: 5%
* wBTC: LTV: 80%, oracle address: tbd, liquidation incentive: 5%
* UNI: LTV: 55%, oracle address: tbd, liquidation incentive: 15%

### wETH Oracle
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 60
* UniswapV3OracleRelay: _mul: 1e12
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: true
* UniswapV3OracleRelay: _pool: 0x45dda9cb7c25131df268515131f647d726f50608
* ChainlinkOracleRelay: feed_address: 0xf9680d99d6c9589e2a93a78a04a279e509205945
* ChainlinkOracleRelay: mul: 1e10
* ChainlinkOracleRelay: div: 1

### wBTC Oracle
* AnchoredViewRelay: widthNumerator: 10
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 60
* UniswapV3OracleRelay: _mul: 1e12
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: true
* UniswapV3OracleRelay: _pool: 0x847b64f9d3a95e977d157866447a5c0a5dfa0ee5
* ChainlinkOracleRelay: feed_address: 0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6
* ChainlinkOracleRelay: mul: 1e10
* ChainlinkOracleRelay: div: 1

### UNI Oracle
* AnchoredViewRelay: widthNumerator: 30
* AnchoredViewRelay: widthDenominator: 100
* UniswapV3OracleRelay: lookback: 60
* UniswapV3OracleRelay: _mul: 1e12
* UniswapV3OracleRelay: _div: 1
* UniswapV3OracleRelay: _quoteTokenIsToken0: true
* UniswapV3OracleRelay: _pool: 0x74d3c85df4dbd03c7c12f7649faa6457610e7604
* ChainlinkOracleRelay: feed_address: 0xdf0fb4e4f928d2dcb76f438575fdd8682386e13c
* ChainlinkOracleRelay: mul: 1e10
* ChainlinkOracleRelay: div: 1

## Governance Parameters
* proposalThreshold: 10000000

### Proposal Parameters
* votingDelay (blocks): 13140
* votingPeriod (blocks): 40320
* proposalTimelockDelay (seconds): 172800
* quorumVotes: 10000000

### Emergency Parameters
* emergencyVotingPeriod (blocks): 6570
* emergencyVotingTimelockDelay (seconds): 43200
* emergencyQuorumVotes: 50000000

