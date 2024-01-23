# V3PositionValuator
## Overview
Determines the value of a Uniswap V3 Position, then assigns that value to the `balanceOf()` of a given vaults UniV3CollateralToken balance. 

## Initialize
```
function initialize(INonfungiblePositionManager _nfpManager, address _factoryV3) public initializer {
    __Ownable_init();
    nfpManager = _nfpManager;
    FACTORY_V3 = _factoryV3;
  }
```

## Functions
## Functions
* function currentValue() external pure override returns (uint256)
    * hard coded to return 1e18 to satisfy IOracleRelay interface.
* function getValue(uint256 tokenId) external view returns (uint256)
    * returns the value of a given `tokenId` in USDI terms (1e18)
* function verifyPool(uint256 tokenId) public view returns (VerifyData memory)
    * determine the pool has been registered, and if so, return the data associated with the given position id `tokenId`
*  function registerPool(IUniV3Pool pool, IOracleRelay _token0Oracle, IOracleRelay _token1Oracle) external onlyOwner
    * allows governance to register new pools, oracles are needed for each underlying asset