import { Box, Toolbar, Typography, Button, Link } from '@mui/material'
import { useContext } from 'react'

import {
  ConnectWalletButton,
  SelectedChainButton,
  TokenSaleButton,
} from '../../util/button'
import { BaseSwitch } from '../../util/switch'
import { LightIcon } from '../../icons/misc/LightIcon'
import { DarkIcon } from '../../icons/misc/DarkIcon'
import { PaletteModeContext } from '../../libs/palette-mode-provider/palette-mode-provider'
import { useLight } from '../../../hooks/useLight'
import { useAppGovernanceContext } from '../../libs/app-governance-provider/AppGovernanceProvider'
import { AppGovSwitch } from '../../util/switch/AppGovSwitch'
import { DesktopMenu } from './DesktopMenu'

export const DesktopToolBar = () => {
  //desktop menu config

  const isLight = useLight()

  const { toggleMode } = useContext(PaletteModeContext)

  const { setIsApp } = useAppGovernanceContext()

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
          <AppGovSwitch />
          <Box display="flex" alignItems="center"></Box>
        </Box>
      ) : (
        <></>
      )}

      <Box sx={{ gap: 2 }} display="flex" mr={-1} ml="auto">
        {window.location.hash !== '#/sale' && (
          <Box mx={2} maxWidth={200} width="100%">
            <TokenSaleButton />
          </Box>
        )}
        <SelectedChainButton />
        <ConnectWalletButton />
        <DesktopMenu />
      </Box>
    </Toolbar>
  )
}
