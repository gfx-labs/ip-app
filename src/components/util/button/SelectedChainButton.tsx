import { Chains } from '../../../chain/chains'
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'

export const SelectedChainButton = () => {
  const ctx = useWeb3Context()
  const token = Chains.getInfo(ctx.chainId)

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const name = isMobile ? token.ticker : token.name

  return (
    <Button
      sx={{
        color: 'text.primary',
        paddingX: 2,
        paddingY: 1,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.03)',
        backgroundColor: 'button.header',
        '&:hover': {
          border: 'none',
          backgroundColor: 'button.hover',
        },
        [theme.breakpoints.down('md')]: {
          paddingX: 1,
          minWidth: 'auto',
        },
      }}
    >
      <Typography variant="label2">{name}</Typography>
    </Button>
  )
}
