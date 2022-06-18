import { Box, Typography, Button } from '@mui/material'
import { useLight } from '../../../hooks/useLight'
import { formatColor, neutral } from '../../../theme'
import { DecimalInput } from '../textFields'
import { Token } from '../../../chain/tokens'
import { WithDots } from '../loading'

interface TokenSelectProps {
  token: Token
  tokenAmount: string
  setTokenAmount: (amount: string) => void
}

export const TokenSelect = (props: TokenSelectProps) => {
  const { token, tokenAmount, setTokenAmount } = props
  const isLight = useLight()

  const setBalance = () => {
    if (token.wallet_balance != undefined) {
      setTokenAmount(token.wallet_balance.toString())
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: isLight
          ? formatColor(neutral.gray5)
          : formatColor(neutral.gray4),
        paddingX: 4,
        paddingY: 2,
        borderRadius: 5,
        boxShadow: '0px 4px 4px 0px rgba(0,0,0, 0.05)',
      }}
    >
      <DecimalInput
        onChange={setTokenAmount}
        value={tokenAmount}
        useLargerFont
      />
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: ' center',
            justifyContent: 'flex-end',
          }}
        >
          <Box
            component="img"
            width={24}
            height={24}
            src={`images/${token.ticker}.svg`}
          ></Box>

          <Typography
            sx={{
              color: formatColor(neutral.gray3),
              marginLeft: 1,
            }}
            variant="body2_semi"
          >
            {token.ticker}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end">
          <Typography
            variant="label2"
            sx={{
              color: formatColor(neutral.gray3),
              textAlign: 'right',
              mt: 1,
            }}
          >
            Balance:
            <br />
            <Button
              sx={{
                paddingY: 0,
                paddingX: 1,
                marginRight: -1,
                height: 'auto',
                width: 'auto',
                minWidth: 'auto',
                justifyContent: 'end',
                '&.Mui-disabled': {
                  color: formatColor(neutral.gray3),
                },
              }}
              onClick={setBalance}
              disabled={token.wallet_balance === undefined}
            >
              <WithDots val={token.wallet_balance != undefined}>
                {token.wallet_balance?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </WithDots>
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
