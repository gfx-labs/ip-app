import { Box, Typography, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { UserTokenCard } from './UserTokenCard'
import { CardContainer } from '../cards/CardContainer'
import { DISPLAY_DECIMALS } from '../../../constants'
import { round } from '../../../easy/bn'

export const UserStats = () => {
  const [token_cards, setTokenCards] = useState<JSX.Element | undefined>(
    undefined
  )

  const theme = useTheme()
  const { tokens, redraw } = useVaultDataContext()

  useEffect(() => {
    if (tokens) {
      let el: Array<any> = []
      for (const [key, val] of Object.entries(tokens)) {
        el.push(
          <UserTokenCard
            key={key}
            index={el.length}
            tokenName={val.name}
            tokenTicker={val.ticker}
            tokenPrice={
              '$' +
              val.price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })!
            }
            vaultBalance={Number(val.vault_balance).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })!}
            tokenAmount={round(val.vault_amount_str || 0, DISPLAY_DECIMALS).toString()}
            image={ val.icons? 
              {
                src: val.icons[0],
                alt: val.icons[0]
              }
              : {
                src: val.ticker,
                alt: val.ticker,
              }
            }
            image2={ val.icons ? 
              {
                src: val.icons[1],
                alt: val.icons[1]
              } 
              : undefined
            }
            LTVPercent={val.token_LTV!.toLocaleString()}
            penaltyPercent={val.token_penalty!.toLocaleString()}
            canDelegate={val.can_delegate ? true : false}
            cappedAddress={val.capped_address}
          />
        )
      }
      setTokenCards(<>{el}</>)
    }
  }, [redraw])

  return (
    <CardContainer>
      <Box
        sx={{
          paddingTop: 2.5,
          [theme.breakpoints.down('md')]: {
            paddingTop: 2,
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            px: { xs: 2, lg: 3 },
            gridTemplateColumns: {
              xs: '1.5fr 1fr 1fr',
              lg: '1.5fr 1fr 0.5fr 0.5fr 1fr 0.6fr 1fr 92px',
            },
            mb: 0,
            columnGap: 2,
            color: 'text.secondary',
          }}
        >
          <Typography variant="label">Assets</Typography>
          <Typography
            display={{ xs: 'none', lg: 'block' }}
            textAlign="end"
            variant="label"
          >
            Price
          </Typography>
          <Typography
            display={{ xs: 'none', lg: 'flex' }}
            variant="label"
            justifyContent="end"
          >
            LTV
          </Typography>
          <Typography
            display={{ xs: 'none', lg: 'flex' }}
            variant="label"
            justifyContent="end"
          >
            Penalty
          </Typography>
          <Typography
            variant="label"
            whiteSpace="nowrap"
            display={{ xs: 'none', lg: 'flex' }}
            justifyContent="center"
          >
            Capped Token
          </Typography>
          <Typography variant="label" whiteSpace="nowrap" textAlign="end">
            Vault Balance
          </Typography>
          <Box></Box>
          <Box display={{ xs: 'none', lg: 'block' }}></Box>
        </Box>
        <Box
          sx={{
            mt: { xs: 2 },
            display: 'grid',
            gridTemplateColumns: {
              sm: '1fr',
            },
            columnGap: 3,
            '&:nth-of-type(odd) .MuiBox-root': {
              backgroundColor: 'red',
            },
          }}
        >
          {token_cards}
        </Box>
      </Box>
    </CardContainer>
  )
}
