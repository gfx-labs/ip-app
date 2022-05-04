import {
  Box,
  Button,
  Link as MuiLink,
  SwipeableDrawer,
  Toolbar,
  Typography,
  
} from "@mui/material";
import React, { useRef, useState, useContext } from "react";

import { LightIcon } from "../../icons/misc/LightIcon";
import { DarkIcon } from "../../icons/misc/DarkIcon";
import { MenuIcon } from "../../icons/misc/menuIcon";
import { Link } from "../../util/link";
import { ConnectWalletButton, SelectedChainButton } from "../../util/button";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";

import { PaletteModeContext } from "../../libs/palette-mode-provider/palette-mode-provider";
import { BaseSwitch } from "../../util/switch";


const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const mobileNav = [
  { label: "faq", pathname: "/faq" },
  {
    label: "careers",
    pathname: "https://cryptocurrencyjobs.co/startups/gfx-labs",
  },
];

export const MobileToolBar = () => {
  // mobile menu config
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const navMenuButtonRef = useRef<HTMLButtonElement>(null);

  const { toggleMode } = useContext(PaletteModeContext);


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
          src="/images/usdi.svg"
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
            p: 1,
            py: 0,
            display: "flex",
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
          sx={{alignSelf: 'start', height: 23, marginBottom: 5}}
        >
          <ForwardIcon
            strokecolor={
              isLight ? formatColor(neutral.black) : formatColor(neutral.white)
            }
          />
        </Button>

        <BaseSwitch
          option1={<LightIcon />}
          option2={<DarkIcon />}
          onOptionChange={toggleMode}
        />

        <Box marginTop={12}>

        <BaseSwitch
          option1="App"
          option2="Governance"
          onOptionChange={console.log}
          />
          </Box>
      </SwipeableDrawer>
    </Toolbar>
  );
};
