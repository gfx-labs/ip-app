import {
  ButtonProps,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { useLight } from '../../../hooks/useLight'
import { formatColor, neutral, blue } from '../../../theme'
import { useWalletModalContext } from '../../libs/wallet-modal-provider/WalletModalProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'

import { WalletModal } from '../modal'
import { addressShortener } from '../text'

interface ConnectWalletButtonProps {
  invertLight?: boolean
}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { invertLight = false } = props

  const { setIsWalletModalOpen } = useWalletModalContext()

  let isLight = useLight()

  if (invertLight) {
    isLight = !isLight
  }

  const { connected, disconnectWallet, error, currentAccount } =
    useWeb3Context()

  const StyledConnectButton = (props: ButtonProps) => {
    const { onClick, children, sx } = props
    return (
      <Button
        variant="outlined"
        sx={{
          minWidth: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          px: 3,
          justifyContent: 'space-between',
          backgroundColor: isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.gray4),
          '&:hover': {
            backgroundColor: isLight
              ? formatColor(neutral.gray5)
              : formatColor(blue.blue1),
            border: 'none',
          },
          ...sx,
        }}
        size="large"
        onClick={onClick}
      >
        <Typography
          variant="label2"
          whiteSpace="nowrap"
          sx={{
            color: isLight
              ? formatColor(neutral.black)
              : formatColor(neutral.white),
          }}
        >
          {children}
        </Typography>
      </Button>
    )
  }

  return (
    <>
      {connected ? (
        <Accordion
          sx={{ borderRadius: '10px !important', boxShadow: 'none' }}
          disableGutters
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            sx={{
              padding: 0,
              '& .MuiAccordionSummary-content': {
                margin: 0,
              },
            }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <StyledConnectButton>
              {addressShortener(currentAccount)}
            </StyledConnectButton>
          </AccordionSummary>
          <AccordionDetails sx={{ position: 'absolute', px: 0, width: '100%' }}>
            <StyledConnectButton
              onClick={disconnectWallet}
              sx={{ width: '100%', justifyContent: 'center' }}
            >
              Disconnect
            </StyledConnectButton>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <StyledConnectButton onClick={() => setIsWalletModalOpen(true)}>
            Connect wallet
          </StyledConnectButton>
          <WalletModal />
        </>
      )}
    </>
  )
}
