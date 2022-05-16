import { Box, Toolbar } from "@mui/material";
import { useContext } from "react";

import { Link } from "../../util/link";
import {
  ClaimsButton,
  ConnectWalletButton,
  SelectedChainButton,
} from "../../util/button";
import { BaseSwitch } from "../../util/switch";
import { LightIcon } from "../../icons/misc/LightIcon";
import { DarkIcon } from "../../icons/misc/DarkIcon";
import { PaletteModeContext } from "../../libs/palette-mode-provider/palette-mode-provider";
import { useLight } from "../../../hooks/useLight";
import {useWeb3Context} from "../../libs/web3-data-provider/Web3Provider";
import {Chains} from "../../../chain/chains";

export const DesktopToolBar = () => {
  //desktop menu config

  const isLight = useLight();

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
          defaultIsOption1={isLight}
        />
      </Box>
    </Toolbar>
  );
};