import { formatColor, neutral } from '../theme'
import { Box, Typography, useTheme } from '@mui/material'
import { useWeb3Context } from '../components/libs/web3-data-provider/Web3Provider'
import { ProtocolStatsCard } from '../components/util/cards'
import { UsdiGraphCard } from '../components/util/cards/UsdiGraphCard'
import { StatsMeter } from '../components/util/statsMeter'
import { UserStats } from '../components/util/UserStats'
import { useRolodexContext } from '../components/libs/rolodex-data-provider/RolodexDataProvider'
import { useEffect } from 'react'
import { useVaultDataContext } from '../components/libs/vault-data-provider/VaultDataProvider'
import { useAppGovernanceContext } from '../components/libs/app-governance-provider/AppGovernanceProvider'
import { Governance } from './governance'
import Cookies from 'universal-cookie'
import fetchVaultOf from '../contracts/Vault/fetchVaultOf'

const Dashboard = () => {
  const cookies = new Cookies()
  const firstVisitExists = cookies.get('first-visit')
  if (!firstVisitExists) {
    console.log('detected first login')
    return (
      <div style={{ minHeight: '80vh' }}>
        <meta http-equiv="refresh" content="0; url=#/landing" />
        <a href="#/landing">please click here if you are not redirected</a>
      </div>
    )
  }

  const theme = useTheme()
  const { currentAccount, dataBlock, gasPrice } = useWeb3Context()
  const rolodex = useRolodexContext()
  const { setVaultID, setVaultAddress } = useVaultDataContext()
  const { isApp } = useAppGovernanceContext()

  useEffect(() => {
    if (currentAccount && rolodex) {
      fetchVaultOf(currentAccount, rolodex).then((res) => {
        if (res !== null) {
          setVaultID(res.vaultID)
          setVaultAddress(res.vaultAddress)
        }
      })
    }
  }, [currentAccount, rolodex])

  return (
    <Box
      sx={{
        marginX: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isApp ? (
        <Box
          color={formatColor(neutral.black)}
          textAlign="left"
          maxWidth="xl"
          pt={{ xs: 7, sm: 0 }}
          pb={{ xs: 5, sm: 10 }}
          px={{ xs: 2, md: 10 }}
          margin="auto"
          position="relative"
          sx={{
            [theme.breakpoints.down('md')]: {
              mb: 0,
              marginLeft: 'auto',
            },
          }}
        >
          <Typography
            variant="label"
            paddingLeft={{ xs: 2, md: 6 }}
            color={formatColor(neutral.gray3)}
          >
            Protocol Stats
          </Typography>
          <Box
            sx={{
              marginTop: 3,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 2,
              [theme.breakpoints.down('lg')]: {
                gridTemplateColumns: '1fr',
                rowGap: 2,
              },
            }}
          >
            <ProtocolStatsCard />
            <UsdiGraphCard />
          </Box>
          <Box>
            <Box sx={{ marginY: 4, px: { xs: 2, md: 6 } }}>
              <StatsMeter />
            </Box>
            <UserStats />
          </Box>
        </Box>
      ) : (
        <Governance />
      )}

      <Box maxWidth="xl" margin="auto">
        <Box
          px={{ xs: 3, md: 12 }}
          mb={2}
          display="flex"
          columnGap={2}
          justifyContent="flex-end"
        >
          <Box>
            <Typography variant="label2">gwei: </Typography>
            <Typography variant="label2_medium">{gasPrice}</Typography>
          </Box>

          <Box>
            <Typography variant="label2">block: </Typography>
            <Typography variant="label2_medium">{dataBlock}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
