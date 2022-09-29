import {
  ButtonProps,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Link,
  ClickAwayListener,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useLight } from '../../../hooks/useLight'
import { EllipsisIcon } from '../../icons/misc/EllipsisIcon'
import { PaletteModeContext } from '../../libs/palette-mode-provider/palette-mode-provider'

interface StyledDropdownButton extends ButtonProps {
  text: string
  img: string
}

const StyledDropdownButton = (props: StyledDropdownButton) => {
  const { onClick, sx, text, img, href } = props

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
      <Box
        component="img"
        src={`images/${img}.svg`}
        width={16}
        height={16}
      ></Box>
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
    <Link href={href} sx={styles}>
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
              fill: !isLight ? 'white' : '#374252',
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
          />
          <StyledDropdownButton
            img="discord_icon_grey"
            href="https://discord.gg/s9Wja2tb6k"
            text="Discord"
          />
          <StyledDropdownButton
            img="sun"
            text={isLight ? 'Dark Mode' : `Light Mode`}
            onClick={toggleMode}
          />
        </AccordionDetails>
      </Accordion>
    </ClickAwayListener>
  )
}
