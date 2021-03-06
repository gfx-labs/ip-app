import { Box, Typography, Tabs, Tab, Button } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { formatColor, neutral } from '../../theme'
import { AppLayout } from '../../components/partials/app-layout'
import { useLight } from '../../hooks/useLight'
import { DecimalInput } from '../../components/util/textFields'
import { DisableableModalButton } from '../../components/util/button/DisableableModalButton'
import { ModalInputContainer } from '../../components/util/modal/ModalContent/ModalInputContainer'
import Cookies from 'universal-cookie'
import { PDFModal } from '../../components/util/pdfViewer/PDFModal'
import { useRolodexContext } from '../../components/libs/rolodex-data-provider/RolodexDataProvider'
import {
  getAccountRedeemedCurrentWave,
  getTotalClaimed,
  useClaimIPT,
  useCommitUSDC,
  WAVEPOOL_ADDRESS,
} from '../../hooks/useSaleUtils'
import { useWeb3Context } from '../../components/libs/web3-data-provider/Web3Provider'
import { getSaleMerkleProof } from './getMerkleProof'
import { useModalContext } from '../../components/libs/modal-content-provider/ModalContentProvider'
import { TransactionReceipt } from '@ethersproject/providers'
import { BN } from '../../easy/bn'
import { locale } from '../../locale'
import { BNtoHexNumber } from '../../components/util/helpers/BNtoHex'
import useCurrentTime from '../../hooks/useCurrentTime'
import { isInWhitelist } from './getUserIsEligible'

const PurchasePage: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const cookie = new Cookies()

  const [open, setOpen] = useState(cookie.get('IP_ACCEPT_TERMS') != 'YES')
  const handleAgree = () => {
    cookie.set('IP_ACCEPT_TERMS', 'YES')
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollTop])

  if (1 == 1) {
    return (
      <div style={{ minHeight: '80vh' }}>
        <meta
          http-equiv="refresh"
          content="0; url=https://forum.interestprotocol.io/t/token-distribution-delayed/30"
        />
        <a href="https://forum.interestprotocol.io/t/token-distribution-delayed/30">
          please click here if you are not redirected
        </a>
      </div>
    )
  }
  return (
    <AppLayout>
      <Box
        sx={{
          marginX: 'auto',
          position: 'relative',
          height: '100%',
          minHeight: '70vh',
          width: '100%',
          overflow: 'hidden',
          py: { xs: 10 },
          maxWidth: 800,
          paddingX: { xs: 2, sm: 10 },
        }}
      >
        <PDFModal
          isOpen={open}
          setIsOpen={setOpen}
          pdf_src="ip_terms.pdf"
          must_agree={true}
          must_agree_handler={handleAgree}
        />

        <PurchaseBox />
      </Box>
    </AppLayout>
  )
}

const PurchaseBox: React.FC = () => {
  const { currentAccount, connected } = useWeb3Context()
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const TabStyle = {
    backgroundColor: 'primary.light',
    color: 'primary.main',
    px: { xs: 1, sm: 5 },
    py: { xs: 0.5, sm: 1.5 },
    minHeight: 'auto',

    '&.Mui-selected': {
      backgroundColor: 'primary.dark',
      borderRadius: 2,
      color: 'primary.light',
    },
  }

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          mb: 4,
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        <Tab sx={TabStyle} label="Wave 1" />
        <Tab sx={TabStyle} label="Wave 2" />
        <Tab sx={TabStyle} label="Wave 3" />
      </Tabs>
      {!connected && !currentAccount && (
        <Box textAlign="center" mb={2}>
          <Typography color="error" variant="h6">
            Please connect your wallet
          </Typography>
        </Box>
      )}

      <TabPanel value={value} index={0} iptForSale={35000000} limit={1000000} />
      <TabPanel value={value} index={1} iptForSale={35000000} limit={500000} />
      <TabPanel value={value} index={2} iptForSale={35000000} />
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  iptForSale: number
  limit?: number
}

const saleTimes = [1655658000000, 1655139600000, 1655312400000, 1655485200000]

const formatSecondsTill = (n: number) => {
  if (n < 600) {
    return Math.floor(n) + ' second(s)'
  }
  if (n < 60 * 60 * 4) {
    return Math.floor(n / 60) + ' minute(s)'
  }

  return Math.floor(n / (60 * 60)) + ' hour(s)'
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, iptForSale, limit, ...other } = props
  const isLight = useLight()
  const [usdcAmountToCommit, setUsdcAmountToCommit] = useState('')
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus(!focus)
  const waveNum = index + 1
  const rolodex = useRolodexContext()
  const { currentSigner, currentAccount, dataBlock, chainId, connected } =
    useWeb3Context()
  const { updateTransactionState } = useModalContext()
  const currentTime = useCurrentTime()

  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')

  const [needAllowance, setNeedAllowance] = useState(true)
  const [disableTime, setDisableTime] = useState<Date>()
  const startTime = new Date(saleTimes[waveNum])

  const [salePeriodRemaining, setSalePeriodRemaining] = useState<string>('')
  const [redeemed, setRedeemed] = useState(true)
  const [totalClaimed, setTotalClaimed] = useState('0')
  const [claimable, setClaimable] = useState(0)
  const [isEligible, setIsEligible] = useState(false)
  useEffect(() => {
    if (currentAccount && waveNum !== 3) {
      const isEligible = isInWhitelist(waveNum, currentAccount)
      setIsEligible(isEligible)
    } else {
      setIsEligible(true)
    }
    const time: Date = new Date(saleTimes[0])

    if (saleTimes[waveNum] > currentTime.valueOf()) {
      let timeleft = (startTime.valueOf() - currentTime.valueOf()) / 1000
      setSalePeriodRemaining('starts in ' + formatSecondsTill(timeleft))
    } else {
      setSalePeriodRemaining(
        'ends in ' +
          formatSecondsTill((time.valueOf() - currentTime.valueOf()) / 1000)
      )
    }

    if (connected && rolodex && currentAccount) {
      setDisableTime(time)

      getAccountRedeemedCurrentWave(
        currentSigner!,
        currentAccount,
        waveNum
      ).then((res) => {
        setClaimable(BNtoHexNumber(res[0]))
        setRedeemed(res[1])
      })
    }
  }, [connected, currentAccount, chainId, rolodex, currentTime])

  useEffect(() => {
    if (rolodex && usdcAmountToCommit && rolodex.USDC) {
      rolodex
        .USDC!.allowance(currentAccount, WAVEPOOL_ADDRESS)
        .then((initialApproval) => {
          const formattedUSDCAmount = BN(usdcAmountToCommit).mul(1e6)
          if (initialApproval.lt(formattedUSDCAmount)) {
            setNeedAllowance(true)
          } else {
            setNeedAllowance(false)
          }
        })
    }
    getTotalClaimed(currentSigner!).then((res) =>
      setTotalClaimed(BNtoHexNumber(res.div(1000000)).toLocaleString())
    )
  }, [rolodex, dataBlock, chainId, usdcAmountToCommit])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (needAllowance) {
      handleApprovalRequest()
    } else {
      usdcCommitHandler()
    }
  }

  const claimHandler = async () => {
    try {
      const claimTransaction = await useClaimIPT(currentSigner!, waveNum)

      updateTransactionState(claimTransaction)
      const claimReceipt = await claimTransaction.wait()

      updateTransactionState(claimReceipt)
    } catch (err) {
      const error = err as TransactionReceipt
      updateTransactionState(error)
    }
  }

  const handleApprovalRequest = async () => {
    if (rolodex && usdcAmountToCommit) {
      let formattedCommitAmount = BN(usdcAmountToCommit).mul(1e6)
      setLoading(true)
      try {
        setLoadmsg(locale('CheckWallet'))
        const approve = await rolodex.USDC?.connect(currentSigner!).approve(
          WAVEPOOL_ADDRESS,
          formattedCommitAmount
        )

        setLoadmsg(locale('TransactionPending'))
        await approve?.wait()
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
  }

  const usdcCommitHandler = async () => {
    if (rolodex !== null && Number(usdcAmountToCommit) > 0) {
      let formattedCommitAmount = BN(usdcAmountToCommit).mul(1e6)
      setLoading(true)

      try {
        setLoadmsg(locale('CheckWallet'))
        const { proof, key } = await getSaleMerkleProof(currentAccount, waveNum)

        const commitTransaction = await useCommitUSDC(
          formattedCommitAmount,
          currentSigner!,
          waveNum,
          key,
          proof
        )

        updateTransactionState(commitTransaction)
        setLoadmsg(locale('TransactionPending'))

        const commitReceipt = await commitTransaction.wait()

        updateTransactionState(commitReceipt)
      } catch (err) {
        const error = err as TransactionReceipt
        updateTransactionState(error)
      }
      setLoading(false)
    }
  }

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src="images/ipt_blue.svg"
              width={80}
              mr={3}
            ></Box>
            <Typography variant="subtitle1">IPT Sale</Typography>
          </Box>

          <Box display="flex" mt={3}>
            <Typography variant="body3" color="#A3A9BA" mr={1}>
              Sale Period:{' '}
            </Typography>
            <Typography variant="body3" color="primary.dark">
              {salePeriodRemaining != ''
                ? `Wave ${waveNum} ${salePeriodRemaining}`
                : 'Ended'}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            mt={3}
            columnGap={4}
            rowGap={2}
          >
            <Box display="flex">
              <Typography variant="body1" color="#A3A9BA" mr={1}>
                Total IPT:{' '}
              </Typography>
              <Typography variant="body1" color="primary.dark">
                {' '}
                {iptForSale.toLocaleString()}
              </Typography>
            </Box>
            {connected && currentAccount && (
              <Box display="flex">
                <Typography variant="body1" color="#A3A9BA" mr={1}>
                  Total USDC:
                </Typography>
                <Typography variant="body1" color="primary.dark">
                  {totalClaimed}
                </Typography>
              </Box>
            )}
          </Box>
          <Box component="form" onSubmit={handleSubmit} mt={4}>
            <ModalInputContainer focus={focus}>
              <DecimalInput
                onFocus={toggle}
                onBlur={toggle}
                placeholder="USDC Amount"
                value={usdcAmountToCommit}
                onChange={setUsdcAmountToCommit}
              />
            </ModalInputContainer>
            <Box mt={2}>
              {limit &&
              disableTime !== undefined &&
              disableTime > currentTime ? (
                <Typography color="error" variant="label2">
                  Maximum commit allowed: {limit.toLocaleString()}
                </Typography>
              ) : (
                <Box height={28}></Box>
              )}
            </Box>

            {disableTime !== undefined &&
            disableTime > currentTime &&
            isEligible ? (
              <DisableableModalButton
                disabled={
                  Number(usdcAmountToCommit) <= 0 ||
                  (limit && Number(usdcAmountToCommit) > limit) ||
                  !connected ||
                  startTime > currentTime
                }
                type="submit"
                text={needAllowance ? 'Set Allowance' : 'Confirm Deposit'}
                loading={loading}
                load_text={loadmsg}
                onClick={handleSubmit}
              />
            ) : (
              <Button
                variant="contained"
                onClick={claimHandler}
                disabled={redeemed || !connected}
              >
                <Typography variant="body3" color={formatColor(neutral.white)}>
                  {!connected
                    ? `Please connect your wallet`
                    : !isEligible
                    ? 'You are not eligible for this wave'
                    : redeemed
                    ? `Already claimed for wave ${waveNum}`
                    : claimable > 0
                    ? `Claim IPT for wave ${waveNum}`
                    : `Nothing to claim`}
                </Typography>
              </Button>
            )}
          </Box>

          <Box
            mt={5}
            display="flex"
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Button href="./book/docs/IPTsale/index.html" target="_blank">
              Token Sale Rules
            </Button>

            <Button
              target="_blank"
              href="https://etherscan.io/address/0x5a4396a2fe5fd36c6528a441d7a97c3b0f3e8aee"
            >
              View Sales Contract
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PurchasePage
