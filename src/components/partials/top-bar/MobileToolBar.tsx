import {
  Box,
  Button,
  Link as MuiLink,
  SwipeableDrawer,
  Toolbar,
} from '@mui/material'
import { useRef, useState, useContext } from 'react'
import { MenuIcon } from '../../icons/misc/menuIcon'
import { Link } from '../../util/link'
import { ConnectWalletButton, SelectedChainButton } from '../../util/button'
import { ForwardIcon } from '../../icons/misc/ForwardIcon'
import { useLight } from '../../../hooks/useLight'
import { formatColor, neutral } from '../../../theme'

import { PaletteModeContext } from '../../libs/palette-mode-provider/palette-mode-provider'
import { MobileIconButton } from './MobileIconButton'
import SVGBox from '../../icons/misc/SVGBox'

const iOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent)

export const MobileToolBar = () => {
  // mobile menu config
  const [navMenuOpen, setNavMenuOpen] = useState(false)
  const navMenuButtonRef = useRef<HTMLButtonElement>(null)

  const { toggleMode } = useContext(PaletteModeContext)

  const isLight = useLight()

  return (
    <Toolbar
      sx={{
        marginTop: 3,
        marginBottom: 3,
        paddingX: { xs: 1 },
        justifyContent: {
          xs: 'space-between',
        },
      }}
    >
      <MuiLink component={Link} to="/landing" aria-level={1}>
        <SVGBox
          svg_name={isLight ? 'ip_black' : 'ip_white'}
          width={32}
          height={32}
        />
      </MuiLink>

      <Box display="flex">
        <SelectedChainButton />

        <Box marginLeft={2} marginRight={1}>
          <ConnectWalletButton />
        </Box>

        <Button
          ref={navMenuButtonRef}
          sx={{
            p: 0,
            display: 'flex',
            minWidth: 'auto',
          }}
          onClick={() => setNavMenuOpen(true)}
        >
          <MenuIcon sx={{ width: 32, height: 32, fill: '#5E64F4' }} />
        </Button>
      </Box>

      <SwipeableDrawer
        open={navMenuOpen}
        anchor="right"
        onClose={() => {
          setNavMenuOpen(false)
        }}
        onOpen={() => {
          setNavMenuOpen(true)
        }}
        PaperProps={{
          elevation: 12,
          sx: {
            py: 5,
            px: 4,
            height: '100%',
            width: '80%',
            backgroundColor: 'mobileToolBar.background',
            backgroundImage: 'none',
            display: 'flex',
            justifyContent: 'start',
          },
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        transitionDuration={500}
      >
        <Button
          onClick={() => {
            setNavMenuOpen(false)
          }}
          sx={{
            display: 'flex',
            alignSelf: 'start',
            width: 'auto',
            height: 23,
            marginBottom: 3,
            minWidth: 14,
            padding: 0,
          }}
        >
          <ForwardIcon
            stroke={
              isLight ? formatColor(neutral.black) : formatColor(neutral.white)
            }
          />
        </Button>
        {/* <ClaimsButton /> */}
        {/* {window.location.hash !== '#/sale' && (
          <MobileIconButton text="Token Sale" img="star" href="/#/sale" />
        )} */}
        <MobileIconButton text="App" img="rocket" href="/" />
        <MobileIconButton text="Governance" img="people" href="/#/proposal" />
        <br />
        <MobileIconButton text="Docs" img="cog" href="/#/docs" />
        <MobileIconButton
          text="Whitepaper"
          img="document"
          href="/#/whitepaper"
        />
        <MobileIconButton
          text="Feedback"
          img="feedback"
          href="https://gfxlabs.io"
        />
        <br />
        <MobileIconButton
          text="Discord"
          img="discord_icon_grey"
          href="https://discord.gg/s9Wja2tb6k"
        />
        <MobileIconButton
          text={isLight ? `Light Mode` : 'Dark Mode'}
          img="sun"
          onClick={toggleMode}
        />

        {/* <Box my={1} maxWidth={200} width="100%">
          <MuiLink
            href="https://app.uniswap.org/#/add/v2/ETH/0x2A54bA2964C8Cd459Dc568853F79813a60761B58?chain=mainnet"
            target="_blank"
          >
            <Button variant="outlined">
              <Typography variant="label">ETH-USDi Rewards</Typography>
            </Button>
          </MuiLink>
        </Box> */}
      </SwipeableDrawer>
    </Toolbar>
  )
}
