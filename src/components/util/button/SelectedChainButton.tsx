import { useState } from 'react'
import { ChainIDs, Chains } from '../../../chain/chains'
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonProps, ClickAwayListener, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { useLight } from '../../../hooks/useLight'
import SVGBox from '../../icons/misc/SVGBox'

interface StyledDropdownButton extends ButtonProps {
  text: string
  img: string
}

const StyledDropdownButton = (props: StyledDropdownButton) => {
  const { onClick, sx, text, img } = props

  const styles = {
    minWidth: 'auto',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    columnGap: 1,
    pl: 2,
    pr: 7,
    justifyContent: 'start',
    backgroundColor: 'button.header',
    height: 38,
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'button.hover',
    },
    ...sx,
  }

  const content = (
    <>
      <SVGBox svg_name={img} width={14} height={14} />
      <Typography
        variant="body2"
        whiteSpace="nowrap"
        color="text.primary"
        sx={{
          lineHeight: 1,
        }}
      >
        {text}
      </Typography>
    </>
  )

  return (
  <Button sx={styles} onClick={onClick}>
      {content}
  </Button>
  )
}

const StyledChainButton = (props: StyledDropdownButton) => {
  const { onClick, sx, text, img } = props
  const theme = useTheme()
  const isLight = useLight()

  return (
    <Button
      sx={{
        color: 'text.primary',
        paddingX: 2,
        paddingY: 1,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.03)',
        backgroundColor: 'button.header',
        border: isLight ? '1px solid #F4F4F4' : 'none',
        minWidth: 'auto',
        '&:hover': {
          backgroundColor: 'button.hover',
        },
        [theme.breakpoints.down('md')]: {
          paddingX: 2,
          minWidth: 'auto',
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <SVGBox svg_name={img} height={24} sx={{ mr: 1 }} />
      <Typography variant="label">{text}</Typography>
    </Button>
  )
}

export const SelectedChainButton = () => {
  const { chainId, switchNetwork } = useWeb3Context()
  const curChain = Chains.getInfo(chainId)

  const theme = useTheme()
  const isLight = useLight()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [expanded, setExpanded] = useState(false)

  //const name = isMobile ? chain.symbol : chain.name

  let otherChains = []
  for (let item in ChainIDs) {
    let num = Number(item)
    const chain = Chains.getInfo(num)
    if (!isNaN(num) && num !== curChain.id && chain.id !== 0) {
      const name = isMobile ? chain.symbol : chain.name
      otherChains.push(
        <StyledDropdownButton
          key={num}
          img={chain.logo}
          text={name}
          onClick={() => switchNetwork(num)}
        />
      )
    }
  }

  // return (
  //   <Button
  //     sx={{
  //       color: 'text.primary',
  //       paddingX: 2,
  //       paddingY: 1,
  //       boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.03)',
  //       backgroundColor: 'button.header',
  //       border: isLight ? '1px solid #F4F4F4' : 'none',
  //       minWidth: 'auto',
  //       '&:hover': {
  //         backgroundColor: 'button.hover',
  //       },
  //       [theme.breakpoints.down('md')]: {
  //         paddingX: 2,
  //         minWidth: 'auto',
  //       },
  //     }}
  //   >
  //     <SVGBox svg_name={chain.logo} height={24} sx={{ mr: 1 }} />

  //     <Typography variant="label">{name}</Typography>
  //   </Button>
  // )
  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Accordion
        sx={{
          borderRadius: '10px !important',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'button.hover',
          },
        }}
        disableGutters
        TransitionProps={{ unmountOnExit: true }}
        expanded={expanded}
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
          <StyledChainButton
            img={curChain.logo}
            text={isMobile? curChain.symbol : curChain.name}
            onClick={() => setExpanded(!expanded)}
          />
        </AccordionSummary>
        <AccordionDetails
          sx={{
            position: 'absolute',
            right: 0,
            mt: 1,
            p: 0,
            width: 'fit-content',
            border: isLight ? '1px solid #F4F4F4' : 'none',
            borderRadius: '10px',
            backgroundColor: 'button.header',
          }}
        >
          <>{otherChains}</>
        </AccordionDetails>
      </Accordion>
    </ClickAwayListener>
  )
}
