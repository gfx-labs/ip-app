import { Box, Toolbar, Typography, Button, Link } from '@mui/material'
import { useContext } from 'react'

import { ConnectWalletButton, SelectedChainButton } from '../../util/button'
import { BaseSwitch } from '../../util/switch'
import { LightIcon } from '../../icons/misc/LightIcon'
import { DarkIcon } from '../../icons/misc/DarkIcon'
import { PaletteModeContext } from '../../libs/palette-mode-provider/palette-mode-provider'
import { useLight } from '../../../hooks/useLight'
import { useAppGovernanceContext } from '../../libs/app-governance-provider/AppGovernanceProvider'
import { useLocation, useNavigate } from 'react-router'

export const DesktopToolBar = () => {
  //desktop menu config

  const isLight = useLight()

  const { toggleMode } = useContext(PaletteModeContext)

  const { setIsApp } = useAppGovernanceContext()

  const navigate = useNavigate()
  const location = useLocation()

  const appGovSwitchHandler = () => {
    if (location.pathname.includes('proposal')) {
      navigate('/')
    } else {
      navigate('/proposal')
    }
  }

  return (
    <Toolbar sx={{ padding: 0 }} disableGutters>
      <Link href="#/landing" role="heading" aria-level={1}>
        <Box
          component="img"
          src={`images/ip_${isLight ? 'black' : 'white'}.svg`}
          width={50}
          height={50}
        ></Box>
      </Link>
      {setIsApp !== undefined ? (
        <Box sx={{ gap: 3 }} display="flex" ml={3}>
          <BaseSwitch
            option1="App"
            option2="Governance"
            onOptionChange={appGovSwitchHandler}
            defaultIsOption1={!location.pathname.includes('proposal')}
          />
          <Box display="flex" alignItems="center"></Box>
        </Box>
      ) : (
        <></>
      )}
      {window.location.hash !== '#/sale' && (
        <Box mx={2} maxWidth={200} width="100%">
          <Link href="#/sale">
            <Button variant="contained">
              <Typography variant="body3">IPT Sale</Typography>
            </Button>
          </Link>
        </Box>
      )}

      <Box mx={2} maxWidth={200} width="100%">
        <Link
          href="https://app.uniswap.org/#/add/v2/ETH/0x2A54bA2964C8Cd459Dc568853F79813a60761B58?chain=mainnet"
          target="_blank"
        >
          <Button variant="outlined">
            <Typography variant="label2">ETH-USDi Rewards</Typography>
          </Button>
        </Link>
      </Box>

      <Box sx={{ gap: 2 }} display="flex" mr={-1} ml="auto">
        <SelectedChainButton />
        <ConnectWalletButton />
        <BaseSwitch
          option1={<LightIcon sx={{ width: 15 }} />}
          option2={<DarkIcon sx={{ width: 15 }} />}
          onOptionChange={toggleMode}
          defaultIsOption1={isLight}
        />
      </Box>
    </Toolbar>
  )
}
