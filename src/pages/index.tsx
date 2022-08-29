import { formatColor, neutral } from '../theme'
import { Box, Typography, useTheme } from '@mui/material'
import { useWeb3Context } from '../components/libs/web3-data-provider/Web3Provider'
import { ProtocolStatsCard } from '../components/util/cards'
import { UsdiGraphCard } from '../components/util/cards/UsdiGraphCard'
import { StatsMeter } from '../components/util/statsMeter'
import { UserStats } from '../components/util/UserStats'
import { useRolodexContext } from '../components/libs/rolodex-data-provider/RolodexDataProvider'
import { useEffect, useState } from 'react'
import { useVaultDataContext } from '../components/libs/vault-data-provider/VaultDataProvider'
import { useAppGovernanceContext } from '../components/libs/app-governance-provider/AppGovernanceProvider'
import { Governance } from './governance'
import Cookies from 'universal-cookie'
import fetchVaultOf from '../contracts/Vault/fetchVaultOf'
import { getTotalSupply, getReserveRatio } from '../contracts/USDI'
import { BN, round } from '../easy/bn'
import { TitleText } from '../components/util/text'
import { SingleStatCard } from '../components/util/UserStats/SingleStatCard'
import { InverseButton } from '../components/util/button'
import { TitleTextToolTip } from '../components/util/text/TitleTextToolTip'
import {
  useModalContext,
  ModalType,
} from '../components/libs/modal-content-provider/ModalContentProvider'
import { OpenVaultButton } from '../components/util/button/OpenVaultButton'

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
  const { setType } = useModalContext()
  const theme = useTheme()
  const { currentAccount, dataBlock, gasPrice, chainId } = useWeb3Context()
  const rolodex = useRolodexContext()
  const { setVaultID, setVaultAddress, accountLiability, hasVault } =
    useVaultDataContext()
  const { isApp } = useAppGovernanceContext()

  const [totalSupply, setTotalSupply] = useState<string>('')
  const [totalUSDCDeposited, setTotalUSDCDeposited] = useState<string>('')
  const [reserveRatio, setReserveRatio] = useState('0')
  const [borrowAPR, setBorrowAPR] = useState(0)
  const [depositAPR, setDepositAPR] = useState(0)

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

  useEffect(() => {
    if (rolodex && rolodex.USDC && rolodex.addressUSDI) {
      rolodex.USDC.balanceOf(rolodex.addressUSDI).then((val) => {
        setTotalUSDCDeposited(val.div(BN('1e6')).toLocaleString())
      })

      getTotalSupply(rolodex).then((res) => {
        setTotalSupply(res)
      })
      getReserveRatio(rolodex).then((res) => {
        setReserveRatio(res)
      })
    }
  }, [rolodex, dataBlock, chainId])

  useEffect(() => {
    if (rolodex) {
      rolodex!
        .USDI!.reserveRatio()
        .then((ratio) => {
          const ratioDec = ratio.div(1e14).toNumber() / 1e4
          return rolodex!.Curve?.getValueAt(
            '0x0000000000000000000000000000000000000000',
            ratio
          ).then((apr) => {
            const ba = apr.div(BN('1e14')).toNumber() / 100
            setBorrowAPR(ba)
            setDepositAPR(round(ba * (1 - ratioDec) * 0.85, 3))
          })
        })
        .catch((e) => {
          setBorrowAPR(0)
        })
    }
  }, [rolodex, dataBlock])

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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              [theme.breakpoints.down('lg')]: {
                gridTemplateColumns: '1fr',
              },
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SingleStatCard>
                <TitleTextToolTip
                  title={`Collateral Deposited`}
                  tooltipContent="Total value of collateral "
                  text={borrowAPR !== null ? borrowAPR.toFixed(2) + '%' : null}
                />
              </SingleStatCard>
              <SingleStatCard>
                <TitleTextToolTip
                  title={`Borrow APR`}
                  tooltipContent="Current annualized rate paid by USDi borrowers"
                  text={borrowAPR !== null ? borrowAPR.toFixed(2) + '%' : null}
                />
              </SingleStatCard>
            </Box>

            <SingleStatCard>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  [theme.breakpoints.down('lg')]: {
                    flexWrap: 'wrap',
                    rowGap: 2,
                  },
                }}
              >
                <TitleTextToolTip
                  tooltipContent="Amount of USDi your vault is currently borrowing. This increases as interest accrues."
                  title={`USDi Borrowed`}
                  text={
                    accountLiability !== null
                      ? '$' + Math.round(accountLiability).toLocaleString()
                      : null
                  }
                />

                {hasVault ? (
                  <Box
                    display="grid"
                    alignItems="center"
                    columnGap={2}
                    gridTemplateColumns="1fr 1fr"
                    sx={{
                      [theme.breakpoints.down('lg')]: {
                        width: '100%',
                      },
                      [theme.breakpoints.down('sm')]: {
                        gridTemplateColumns: '1fr',
                        rowGap: 2,
                      },
                    }}
                  >
                    <InverseButton onClick={() => setType(ModalType.Borrow)}>
                      <Typography variant="body3">Borrow</Typography>
                    </InverseButton>

                    <InverseButton onClick={() => setType(ModalType.Repay)}>
                      <Typography variant="body3">Repay</Typography>
                    </InverseButton>
                  </Box>
                ) : (
                  <Box
                    maxWidth={{ xs: 'auto', md: 350 }}
                    width="100%"
                    display="flex"
                    alignItems="center"
                  >
                    <OpenVaultButton />
                  </Box>
                )}
              </Box>
            </SingleStatCard>
          </Box>
          <Box
            sx={{
              marginY: 3,
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
            <StatsMeter />
          </Box>
          <Box>
            <UserStats />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              my: 3,
              [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
              },
            }}
          >
            <SingleStatCard>
              <TitleText
                title="USDi in Circulation"
                text={Math.round(Number(totalSupply)).toLocaleString()}
              />
            </SingleStatCard>

            <SingleStatCard>
              <TitleText
                title="USDC in Reserve"
                text={Math.round(Number(totalUSDCDeposited)).toLocaleString()}
              />
            </SingleStatCard>
            <SingleStatCard>
              <TitleText title="Reserve Ratio" text={`${reserveRatio}%`} />
            </SingleStatCard>
          </Box>

          <UsdiGraphCard />
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
            <Typography variant="label2">Gwei: </Typography>
            <Typography variant="label2_medium">{gasPrice}</Typography>
          </Box>

          <Box>
            <Typography variant="label2">Block: </Typography>
            <Typography variant="label2_medium">{dataBlock}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
