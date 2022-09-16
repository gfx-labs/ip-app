import { Chains } from '../../../chain/chains'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import ETH from '/images/eth.svg'
import { useLight } from '../../../hooks/useLight'

export const SelectedChainButton = () => {
  const ctx = useWeb3Context()
  const token = Chains.getInfo(ctx.chainId)

  const theme = useTheme()
  const isLight = useLight()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const name = isMobile ? token.ticker : token.name

  return (
    <Button
      sx={{
        color: 'text.primary',
        paddingX: 2,
        paddingY: 1,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.03)',
        backgroundColor: 'button.header',
        border: isLight ? '1px solid #F4F4F4' : 'none',
        minWidth: 'auto',
        '&:hover': {
          backgroundColor: 'button.hover',
        },
        [theme.breakpoints.down('md')]: {
          paddingX: 2,
          minWidth: 'auto',
        },
      }}
    >
      {token.ticker === 'ETH' && (
        <Box
          component="img"
          src={ETH}
          width={20}
          height={24}
          position="relative"
          mr={1}
        ></Box>
      )}
      <Typography variant="label">{name}</Typography>
    </Button>
  )
}
