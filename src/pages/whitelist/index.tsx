import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Button,
  TextField,
} from '@mui/material'
import { useEffect, useState, ReactNode, useContext } from 'react'
import {
  formatColor,
  formatGradient,
  gradient,
  neutral,
  blue,
} from '../../theme'
import { useLight } from '../../hooks/useLight'
import { DecimalInput } from '../../components/util/textFields'
import { DisableableModalButton } from '../../components/util/button/DisableableModalButton'
import { ModalInputContainer } from '../../components/util/modal/ModalContent/ModalInputContainer'
import { wave1 } from './wave1'
import { wave2 } from './wave2'
import { Spacer } from '../../easy/spacer'

const WhitelistPage: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const isLight = useLight()
  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollTop])

  return (
    <Box
      sx={{
        marginX: 'auto',
        position: 'relative',
        height: '100vh',
        minHeight: '70vh',
        width: '100vw',
        overflow: 'hidden',
        py: { xs: 10 },
        paddingX: { xs: 2, sm: 10 },
        backgroundImage: `linear-gradient(
          ${formatGradient(
            isLight ? gradient.bgDefaultLight : gradient.bgDefaultDark
          )}
        )`,
      }}
    >
      <PurchaseBox />
    </Box>
  )
}

const PurchaseBox: React.FC = () => {
  const isLight = useLight()

  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const TabStyle = {
    backgroundColor: isLight
      ? formatColor(neutral.white)
      : formatColor(neutral.gray7),
    color: 'primary.main',
    px: { xs: 1, sm: 5 },
    py: { xs: 0.5, sm: 1.5 },
    minHeight: 'auto',
    '&.Mui-selected': {
      backgroundColor: isLight
        ? formatColor(neutral.gray7)
        : formatColor(neutral.white),
      borderRadius: 2,
      color: isLight ? formatColor(neutral.white) : formatColor(neutral.gray7),
    },
  }

  return (
    <Box sx={{ maxWidth: 700, margin: 'auto' }}>
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

      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1} />
      <TabPanel value={value} index={2} />
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [included, setIncluded] = useState(false)
  const [focus, setFocus] = useState(false)
  const waveNum = index + 1

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  useEffect(() => {
    checkWallet()
  }, [address])

  let waveStart = ''
  switch (waveNum) {
    case 1:
      waveStart = 'June 13, 2022 5:00:00 PM UTC'
      break
    case 2:
      waveStart = 'June 15, 2022 5:00:00 PM UTC'
      break
    case 3:
      waveStart = 'June 17, 2022 5:00:00 PM UTC'
      break
  }

  const checkWallet = () => {
    if (address.length < 10) {
      setMessage(Spacer)
      setIncluded(false)
      return
    }
    if (address.length > 42 || !address.startsWith('0x')) {
      setMessage('malformed address')
      setIncluded(false)
      return
    }
    switch (waveNum) {
      case 1:
        if (wave1.has(address.toLowerCase())) {
          setIncluded(true)
        } else {
          setIncluded(false)
        }
        setMessage('')
        return
      case 2:
        if (wave2.has(address.toLowerCase())) {
          setIncluded(true)
        } else {
          setIncluded(false)
        }
        setMessage('')
        return
      case 3:
        setIncluded(true)
        setMessage('')
        return
      default:
        setIncluded(false)
    }
    setIncluded(false)
    setMessage('')
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
            <Typography variant="subtitle2" color="text.primary">
              IPT Sale Whitelist
            </Typography>
          </Box>

          <Box component="form" sx={{ border: 0 }} mt={4}>
            <ModalInputContainer sx={{ border: 0 }} focus={focus}>
              <TextField
                variant="standard"
                placeholder="Enter address here"
                value={address}
                onChange={handleChange}
                sx={{
                  width: '100%',
                  height: '100%',
                  paddingBottom: 1,
                }}
              />
            </ModalInputContainer>
            <br />
          </Box>
          <Box
            mt={5}
            display="flex"
            justifyContent="center"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            {included == true ? (
              <Box sx={{ whiteSpace: 'pre' }}>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  mb="1em"
                  color="#50b543"
                >
                  Congratulations!
                </Typography>
                <Box textAlign="center">
                  <Typography variant="label" textAlign="center">
                    Address {address} is included in Wave {waveNum}
                    <br />
                    <br />
                    <Typography variant="h6" textAlign="center">
                      Wave {waveNum} Starts At ~ {waveStart}{' '}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            ) : message != '' ? (
              <>
                <Typography color={'#fc3903'}> {message} </Typography>
              </>
            ) : (
              <Box sx={{ whiteSpace: 'pre' }}>
                <Typography
                  color={'#fc3903'}
                  variant="subtitle1"
                  textAlign="center"
                  mb="1em"
                >
                  Too Bad!
                </Typography>
                <Box textAlign="center">
                  <Typography variant="label" sx={{ whiteSpace: 'pre' }}>
                    Address {address} is not in Wave {waveNum}
                    <br />
                    <br />
                    {waveNum == 1 ? 'Try Wave 2!' : ''}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default WhitelistPage
