import { BigNumber } from 'ethers'
import { InitializeTokenProps, Token } from '../../../types/token'

const initializeToken = ({
  name,
  ticker,
  address,
  capped_address,
  capped_token = false,
  can_delegate = false,
  value = 0,
}: InitializeTokenProps): Token => ({
  name,
  address,
  ticker,
  value,
  vault_balance: 0,
  vault_amount: 0,
  wallet_balance: 0,
  wallet_amount: 0,
  wallet_amount_bn: BigNumber.from(0),
  token_LTV: 0,
  token_penalty: 0,
  vault_unformatted_amount: '0',
  vault_amount_bn: BigNumber.from(0),
  capped_token,
  capped_address,
  can_delegate,
})

export default initializeToken
