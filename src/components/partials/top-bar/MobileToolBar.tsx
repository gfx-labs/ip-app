import {
  Box,
  Button,
  Divider,
  Link as MuiLink,
  SwipeableDrawer,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useRef, useState, useContext } from "react";

import { CaratUpIcon } from "../../icons/misc/CaratUpIcon";

import { LightIcon } from "../../icons/misc/LightIcon";
import { DarkIcon } from "../../icons/misc/DarkIcon";
import { MenuIcon } from "../../icons/misc/menuIcon";
import { Link } from "../../util/link";
import {
  ClaimsButton,
  ConnectWalletButton,
  SelectedChainButton,
} from "../../util/button";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { ForwardArrowCircleIcon } from "../../icons/misc/ForwardArrowCircleIcon";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";

import { PaletteModeContext } from "../../libs/palette-mode-provider/palette-mode-provider";
import { BaseSwitch } from "../../util/switch";
import { useAppGovernanceContext } from "../../libs/app-governance-provider/AppGovernanceProvider";

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export const MobileToolBar = () => {
  // mobile menu config
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const navMenuButtonRef = useRef<HTMLButtonElement>(null);

  const { toggleMode } = useContext(PaletteModeContext);
  const { setIsApp } = useAppGovernanceContext();


  const isLight = useLight();

  return (
    <Toolbar
      sx={{
        marginTop: 3,
        marginBottom: 3,
        justifyContent: {
          xs: "space-between",
        },
      }}
    >
      <MuiLink component={Link} to="/" aria-level={1}>
        <Box
          component="img"
          src="images/ip_green.svg"
          width={40}
          height={40}
        ></Box>
      </MuiLink>

      <Box display="flex">
        <SelectedChainButton />

        <Box marginX={2}>
          <ConnectWalletButton />
        </Box>

        <Button
          ref={navMenuButtonRef}
          sx={{
            p: 0,

            display: "flex",
            minWidth: "auto",
          }}
          variant="text"
          color="secondary"
          onClick={() => setNavMenuOpen(true)}
        >
          <MenuIcon sx={{ width: 32, height: 32 }} />
        </Button>
      </Box>

      <SwipeableDrawer
        open={navMenuOpen}
        anchor="right"
        onClose={() => {
          setNavMenuOpen(false);
        }}
        onOpen={() => {
          setNavMenuOpen(true);
        }}
        PaperProps={{
          elevation: 12,
          sx: {
            py: 8,
            px: 4,
            height: "100%",
            width: "80%",
            backgroundColor: "mobileToolBar.background",
            backgroundImage: "none",
            display: "flex",

            justifyContent: "start",
          },
        }}
        sx={{}}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        transitionDuration={500}
      >
        <Button
          onClick={() => {
            setNavMenuOpen(false);
          }}
          sx={{
            alignSelf: "start",
            height: 23,
            marginBottom: 5,
            minWidth: 14,
            padding: 0,
          }}
        >
          <ForwardIcon
            strokecolor={
              isLight ? formatColor(neutral.black) : formatColor(neutral.white)
            }
          />
        </Button>

        <ClaimsButton />
        <br />
        <br />
        <Divider variant="middle" />
        <br />

        <Accordion sx={{ boxShadow: "none" }} disableGutters={true}>
          <AccordionSummary
            expandIcon={<CaratUpIcon sx={{ transform: "rotate(180deg)" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ paddingX: 0 }}
          >
            <ForwardArrowCircleIcon sx={{ width: 18, height: 18 }} />{" "}
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "text.secondary", marginLeft: 1 }}
            >
              Your Vault
            </Typography>
          </AccordionSummary>
          {/* loop through user's assets */}
          <AccordionDetails>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "text.secondary", marginLeft: 1 }}
            >
              Manage WBTC
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Box marginBottom={12} marginTop={5}>
          <BaseSwitch
            option1={<LightIcon />}
            option2={<DarkIcon />}
            onOptionChange={toggleMode}
            defaultIsOption1={isLight}
          />
        </Box>

        <BaseSwitch
          option1="App"
          option2="Governance"
          onOptionChange={setIsApp}
        />
      </SwipeableDrawer>
    </Toolbar>
  );
};
