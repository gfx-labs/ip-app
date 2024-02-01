import { Box, Typography, Button } from '@mui/material'
import { useLight } from '../../../hooks/useLight'
import { formatColor, neutral } from '../../../theme'
import { DecimalInput } from '../textFields'
import { WithDots } from '../loading'
import SVGBox from '../../icons/misc/SVGBox'
import { Token } from '../../../chain/tokens'

interface TokenSelectProps {
  token: Token
  tokenAmount: string
  setTokenAmount: (amount: string) => void
  onMaxBalanceClick?: () => void
  disableSetMax?: boolean
}

export const TokenSelect = (props: TokenSelectProps) => {
  const {
    token,
    tokenAmount,
    setTokenAmount,
    onMaxBalanceClick,
    disableSetMax = false,
  } = props
  const isLight = useLight()

  const setMax = () => {
    if (token.wallet_balance != undefined) {
      setTokenAmount(token.wallet_balance)
      if (onMaxBalanceClick) {
        onMaxBalanceClick()
      }
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
        paddingX: { xs: 2, lg: 4 },
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
          <SVGBox svg_name={token.ticker} height={24} width={24} />

          <Typography
            sx={{
              color: formatColor(neutral.gray3),
              marginLeft: 1,
            }}
            variant="body2_semi"
          >
            {token?.ticker}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end">
          <Typography
            variant="label_semi"
            sx={{
              color: 'text.primary',
              textAlign: 'right',
              mt: 1,
              display: 'flex',
            }}
          >
            Balance:
            <Button
              sx={{
                fontSize: 14,
                fontWeight: 400,
                paddingY: 0,
                paddingLeft: 0.5,
                color: 'text.primary',
                marginRight: -1,
                height: 'auto',
                width: 'auto',
                minWidth: 'auto',
                justifyContent: 'end',
                '&.Mui-disabled': {
                  color: formatColor(neutral.gray3),
                },
              }}
              onClick={setMax}
              disabled={token.wallet_balance === undefined || disableSetMax}
            >
              <WithDots val={token.wallet_balance != undefined}>
                {Number(token.wallet_balance).toLocaleString(undefined, {
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
