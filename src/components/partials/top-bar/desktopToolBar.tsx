import { formatColor, neutral } from "../../../theme";
import {
  Box,
  Link as MuiLink,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useContext, useRef, useState } from "react";

import { Link } from "../../util/link";
import { WalletType } from "../../libs/web3-data-provider/WalletOptions";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import {
  ClaimsButton,
  ConnectWalletButton,
  SelectedChainButton,
} from "../../util/button";
import { BaseSwitch } from "../../util/switch";
import { LightIcon } from "../../icons/misc/LightIcon";
import { DarkIcon } from "../../icons/misc/DarkIcon";
import { PaletteModeContext } from "../../libs/palette-mode-provider/palette-mode-provider";

export const DesktopToolBar = () => {
  const { connectWallet, connected, disconnectWallet, error, currentAccount } =
    useWeb3Context();
  //desktop menu config

  const { toggleMode } = useContext(PaletteModeContext);
  return (
    <Toolbar>
      <Link to="./" role="heading" aria-level={1}>
        <Box component="img" src="images/usdi.svg" width={50} height={50}></Box>
      </Link>
      <Box display="flex" ml={3}>
        <BaseSwitch
          option1="App"
          option2="Governance"
          onOptionChange={console.log}
        />
        <Box display="flex" alignItems="center">
          <ConnectWalletButton />
        </Box>
      </Box>
      <Box display="flex" mr={-1} ml="auto">
        <ClaimsButton />
        <SelectedChainButton />

        <BaseSwitch
          option1={<LightIcon />}
          option2={<DarkIcon />}
          onOptionChange={toggleMode}
        />
      </Box>
    </Toolbar>
  );
};
