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
import Cookies from 'universal-cookie'
import fetchVaultOf from '../contracts/Vault/fetchVaultOf'
import { getTotalSupply, getReserveRatio } from '../contracts/USDI'
import { BN, round } from '../easy/bn'
import { TitleText } from '../components/util/text'
import { SingleStatCard } from '../components/util/cards'
import { InverseButton } from '../components/util/button'
import { TitleTextToolTip } from '../components/util/text/TitleTextToolTip'
import {
  useModalContext,
  ModalType,
} from '../components/libs/modal-content-provider/ModalContentProvider'
import { OpenVaultButton } from '../components/util/button/OpenVaultButton'
import { InterestRateGraphCard } from '../components/util/cards/InterestRateGraphCard'
import { Substat } from '../components/util/text/Substat'
import getAverages, { Averages } from '../components/util/api/getAverages'
import { useLight } from '../hooks/useLight'
import getDeltas, {
  CurrentWithTemporal,
} from '../components/util/api/getDeltas'
import { UserIPTVault } from '../components/util/UserStats/UserIPTVault'

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
  const isLight = useLight()
  const { setType } = useModalContext()
  const theme = useTheme()
  const { currentAccount, dataBlock, gasPrice, chainId } = useWeb3Context()
  const rolodex = useRolodexContext()
  const { setVaultID, setVaultAddress, accountLiability, hasVault } =
    useVaultDataContext()

  const [totalSupply, setTotalSupply] = useState<string>('')
  const [totalUSDCDeposited, setTotalUSDCDeposited] = useState<string>('')
  const [reserveRatio, setReserveRatio] = useState('0')
  const [borrowAPR, setBorrowAPR] = useState(0)
  const [depositAPR, setDepositAPR] = useState(0)
  const [averages, setAverages] = useState<Averages | undefined>()
  const [totalCollateral, setTotalCollateral] = useState<
    CurrentWithTemporal | undefined
  >()

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

    getAverages().then((averages) => setAverages(averages))
    getDeltas().then((deltas) => setTotalCollateral(deltas.TotalCollateral))
  }, [rolodex, dataBlock])

  return (
    <Box
      sx={{
        marginX: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        color={formatColor(neutral.black)}
        textAlign="left"
        maxWidth="xl"
        pt={{ xs: 2, sm: 0 }}
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
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            my: 3,
            [theme.breakpoints.down('lg')]: {
              flexDirection: 'column',
            },
          }}
        >
          <SingleStatCard>
            <>
              <Box
                component="img"
                src={`images/globe_${isLight ? 'light' : 'dark'}.svg`}
                width="36px"
                height="36px"
                marginRight={3}
              ></Box>
              <TitleText
                title="USDi in Circulation"
                text={Math.round(Number(totalSupply)).toLocaleString()}
              />
            </>
          </SingleStatCard>

          <SingleStatCard>
            <>
              <Box
                component="img"
                src={`images/cube_${isLight ? 'light' : 'dark'}.svg`}
                width="36px"
                height="36px"
                marginRight={3}
              ></Box>
              <TitleText
                title="USDC in Reserve"
                text={Math.round(Number(totalUSDCDeposited)).toLocaleString()}
              />
            </>
          </SingleStatCard>
          <SingleStatCard>
            <>
              <Box
                component="img"
                src={`images/cylinder_${isLight ? 'light' : 'dark'}.svg`}
                width="36px"
                height="36px"
                marginRight={3}
              ></Box>
              <TitleText title="Reserve Ratio" text={`${reserveRatio}%`} />
            </>
          </SingleStatCard>
        </Box>

        <InterestRateGraphCard />
        <Box
          display="flex"
          flexDirection={{ xs: 'column-reverse', lg: 'column' }}
        >
          <Typography
            mt={5}
            mb={2}
            color="text.primary"
            display={{ xs: 'none', lg: 'block' }}
          >
            Your Position
          </Typography>
          <Box
            sx={{
              marginBottom: 4,
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '3fr 2fr',
              gap: 2,
              mb: 3,
              [theme.breakpoints.down('lg')]: {
                gridTemplateColumns: '1fr',
                mt: 3,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', lg: 'row' },
              }}
            >
              <SingleStatCard>
                <TitleTextToolTip
                  title={`Collateral Deposited`}
                  tooltipContent="Total collateral value deposited"
                  text={
                    totalCollateral?.Current !== null
                      ? Number(totalCollateral?.Current).toLocaleString(
                          'en-US',
                          {
                            style: 'currency',
                            currency: 'USD',
                          }
                        )
                      : null
                  }
                />
              </SingleStatCard>
              <SingleStatCard>
                <TitleTextToolTip
                  title={`Deposit APR`}
                  tooltipContent="Current annualized rate paid to USDi holders"
                  text={
                    depositAPR !== null ? depositAPR.toFixed(2) + '%' : null
                  }
                  substat={
                    <Substat
                      days={7}
                      stat={((averages?.Supply || 0) * 100).toFixed(2)}
                      suffix="%"
                    />
                  }
                />
              </SingleStatCard>
              <SingleStatCard>
                <TitleTextToolTip
                  title={`Borrow APR`}
                  tooltipContent="Current annualized rate paid by USDi borrowers"
                  text={borrowAPR !== null ? borrowAPR.toFixed(2) + '%' : null}
                  substat={
                    <Substat
                      days={7}
                      stat={((averages?.Borrow || 0) * 100).toFixed(2)}
                      suffix="%"
                    />
                  }
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
                  columnGap: 12,
                  [theme.breakpoints.down('lg')]: {
                    flexWrap: 'wrap',
                    rowGap: 2,
                  },
                }}
              >
                <TitleTextToolTip
                  tooltipContent="The amount of USDi your vault is currently borrowing. This increases as interest accrue."
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
                    width="100%"
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
                    <InverseButton
                      sx={{ width: '100%' }}
                      onClick={() => setType(ModalType.Borrow)}
                    >
                      <Typography variant="body1">Borrow</Typography>
                    </InverseButton>

                    <InverseButton
                      sx={{ width: '100%' }}
                      onClick={() => setType(ModalType.Repay)}
                    >
                      <Typography variant="body1">Repay</Typography>
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
        </Box>

        <Box>
          <UserIPTVault />
          <UserStats />
        </Box>
      </Box>

      <Box maxWidth="xl" margin="auto">
        <Box
          px={{ xs: 3, md: 10 }}
          mb={2}
          display="flex"
          columnGap={2}
          justifyContent="flex-end"
        >
          <Box>
            <Typography variant="label">Gwei: </Typography>
            <Typography variant="label2_medium">{gasPrice}</Typography>
          </Box>

          <Box>
            <Typography variant="label">Block: </Typography>
            <Typography variant="label2_medium">{dataBlock}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
