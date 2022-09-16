import {
  ButtonProps,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { useLight } from '../../../hooks/useLight'
import { EllipsisIcon } from '../../icons/misc/EllipsisIcon'
import { MenuIcon } from '../../icons/misc/menuIcon'
import { useWalletModalContext } from '../../libs/wallet-modal-provider/WalletModalProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'

export const DesktopMenu = () => {
  const isLight = useLight()

  const StyledConnectButton = (props: ButtonProps) => {
    const { onClick, children, sx } = props

    return (
      <Button
        sx={{
          minWidth: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          px: 3,
          justifyContent: 'space-between',
          backgroundColor: 'button.header',
          border: isLight ? '1px solid #F4F4F4' : 'none',
          '&:hover': {
            backgroundColor: 'button.hover',
          },
          ...sx,
        }}
        size="large"
        onClick={onClick}
      >
        <Typography variant="label" whiteSpace="nowrap" color="text.primary">
          {children}
        </Typography>
      </Button>
    )
  }

  return (
    <>
      <Accordion
        sx={{ borderRadius: '10px !important', boxShadow: 'none' }}
        disableGutters
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          sx={{
            padding: 2,
            border: isLight ? '1px solid #F4F4F4' : 'none',

            borderRadius: '10px',
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              alignItems: 'center',
              margin: 0,
            },
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <EllipsisIcon
            sx={{
              stroke: isLight ? '#374252' : 'white',
              fill: !isLight ? 'white' : '#374252',
              width: 16,
              height: 14,
            }}
          />
        </AccordionSummary>
        <AccordionDetails
          sx={{ position: 'absolute', px: 0, width: 'fit-content' }}
        >
          <StyledConnectButton>Docs</StyledConnectButton>
          <StyledConnectButton>Whitepaper</StyledConnectButton>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
