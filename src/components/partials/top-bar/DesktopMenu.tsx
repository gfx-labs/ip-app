import {
  ButtonProps,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  ClickAwayListener,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useLight } from '../../../hooks/useLight'
import { EllipsisIcon } from '../../icons/misc/EllipsisIcon'
import SVGBox from '../../icons/misc/SVGBox'
import { PaletteModeContext } from '../../providers/PaletteModeProvider'

interface StyledDropdownButton extends ButtonProps {
  text: string
  img: string
  target?: string
}

const StyledDropdownButton = (props: StyledDropdownButton) => {
  const { onClick, sx, text, img, href, target = '' } = props

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

  return href ? (
    <Link href={href} sx={styles} target={target}>
      {content}
    </Link>
  ) : (
    <Button sx={styles} onClick={onClick}>
      {content}
    </Button>
  )
}

export const DesktopMenu = () => {
  const isLight = useLight()

  const { toggleMode } = useContext(PaletteModeContext)

  const [expanded, setExpanded] = useState(false)

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
            padding: 2,
            border: isLight ? '1px solid #F4F4F4' : 'none',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.03)',

            borderRadius: '10px',
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              alignItems: 'center',
              margin: 0,
            },
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setExpanded(!expanded)}
        >
          <EllipsisIcon
            sx={{
              stroke: isLight ? '#374252' : 'white',
              fill: isLight ? '#374252' : 'white',
              width: 16,
              height: 14,
            }}
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
          <StyledDropdownButton
            img="rewards"
            href="https://app.uniswap.org/#/add/v2/ETH/0x2A54bA2964C8Cd459Dc568853F79813a60761B58?chain=mainnet"
            text="ETH USDi Rewards"
            target="_blank"
          />
          <StyledDropdownButton
            img="chart-bar"
            href="https://analytics.gfx.xyz/"
            text="Analytics"
            target="_blank"
          />
          <StyledDropdownButton img="cog" text="Docs" href="#/docs" />
          <StyledDropdownButton
            img="document"
            text="Whitepaper"
            href="#/whitepaper"
          />
          <StyledDropdownButton
            img="feedback"
            text="Feedback"
            href="https://discord.gg/s9Wja2tb6k"
            target="_blank"
          />
          <StyledDropdownButton
            img="discord_icon_grey"
            href="https://discord.gg/s9Wja2tb6k"
            text="Discord"
            target="_blank"
          />

          <StyledDropdownButton
            img={isLight ? 'star' : 'sun'}
            text={isLight ? 'Dark Mode' : `Light Mode`}
            onClick={toggleMode}
          />
        </AccordionDetails>
      </Accordion>
    </ClickAwayListener>
  )
}
