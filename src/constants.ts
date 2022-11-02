export const GOVERNOR_ADDRESS = '0x266d1020a84b9e8b0ed320831838152075f8c4ca'
export const LINK_FAST_GAS_GWEI = '0x169e633a2d1e6c10dd91238ba11c4a708dfef37c'
export const MERKLE_REDEEM_ADDRESS =
  '0x91a1Fb8eEaeB0E05629719938b03EE3C32348CF7'
export const VOTING_VAULT_CONTROLLER_ADDRESS =
  '0xaE49ddCA05Fe891c6a5492ED52d739eC1328CBE2'

export const IPT_DELEGATE_ADDRESS = '0xd909c5862cdb164adb949d92622082f0092efc3d'
export const SLOWROLL_ADDRESS = '0xFbD3060Fe1Ed10c34E236Cee837d82F019cF1D1d'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const USDI_DECIMALS = 18
export const BACKUP_PROVIDER = 'https://cloudflare-eth.com'
export const STAGING_ANALYTICS_URL = 'https://ip-stats-api.staging.gfx.town'
export const ANALYTICS_URL = 'https://analytics-api.gfx.xyz'
export const CHART_INTEREST_RATE_OVERTIME = '/charts/interest_rates_overtime'
export const LIVE_DELTAS = '/live/deltas'
export const LIVE_AVERAGE_RATES = '/live/average_rates'
export const SALE_SUMMARY = '/sale/summary'

export const GOV_PROPOSAL_CREATED_EVENTS = '/gov/proposal_created_events'

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [GOVERNOR_ADDRESS]: 'Governance',
  '0x4aaE9823Fb4C70490F1d802fC697F3ffF8D5CbE3': 'Vault Controller',
  '0xb800ca12a3e37c381e92daa0a2910d70a267da6e': 'Voting Vault Controller',
  '0xf4818813045E954f5Dc55a40c9B60Def0ba3D477': 'Oracle Master',
  '0x0029abd74B7B32e6a82Bf9f62CB9Dd4Bf8e39aAf': 'Curve Master',
  '0xd3bd7a8777c042De830965de1C1BCC9784135DD2': 'Capped AAVE',
  '0x05498574BD0Fa99eeCB01e1241661E7eE58F8a85': 'Capped BAL',
  '0xf5E0e2827F60580304522E2C38177DFeC7a428a4': 'BAL AnchoredViewRelay',
  '0x27FC4059860F3d9758DCC9a871838F06333fc6ed': 'AAVE AnchoredViewRelay',
  '0xba100000625a3754423978a60c9317c58a424e3D': 'Balancer Token',
  '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': 'Aave Token',
  '0xfb42f5AFb722d2b01548F77C31AC05bf80e03381': 'Capped ENS',
  '0x6DB54416CBB28C6a78F606947df53E83Dd69eb70': 'ENS AnchoredViewRelay',
  '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72': 'ENS',
  '0x16Ac44B1e161c735D7E372169d3573d920a23906': 'ThreeLines0_100 v2',
}
