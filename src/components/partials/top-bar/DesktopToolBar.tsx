import { Box, Toolbar, Link } from '@mui/material'
import {
  ConnectWalletButton,
  SelectedChainButton,
  TokenSaleButton,
} from '../../util/button'
import { useLight } from '../../../hooks/useLight'
import { AppGovSwitch } from '../../util/switch'
import { DesktopMenu } from './DesktopMenu'
import SVGBox from '../../icons/misc/SVGBox'
import { useAppGovernanceContext } from '../../providers/AppGovernanceProvider'

export const DesktopToolBar = () => {
  const isLight = useLight()
  const { setIsApp } = useAppGovernanceContext()
  return (
    <Toolbar sx={{ padding: 0 }} disableGutters>
      <Link href="#/landing" role="heading" aria-level={1}>
        <SVGBox
          svg_name={isLight ? 'ip_black' : 'ip_white'}
          width={50}
          height={50}
        />
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
        {/* {window.location.hash !== '#/sale' && (
          <TokenSaleButton />
        )} */}
        <SelectedChainButton />
        <ConnectWalletButton />
        <DesktopMenu />
      </Box>
    </Toolbar>
  )
}
