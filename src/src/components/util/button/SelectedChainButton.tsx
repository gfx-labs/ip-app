import { Chains } from "../../../chain/chains";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { blue, formatColor, neutral } from "../../../theme";
import { useLight } from "../../../hooks/useLight";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

export const SelectedChainButton = () => {
  const ctx = useWeb3Context();
  const token = Chains.getInfo(ctx.chainId);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const name = isMobile ? token.ticker : token.name;

  const isLight = useLight();

  return (
    <Button
      variant="outlined"
      sx={{
        color: formatColor(blue.blue1),
        paddingX: 2,
        paddingY: 1,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.03)",
        backgroundColor: isLight
          ? formatColor(neutral.white)
          : formatColor(neutral.gray7),
        "&:hover": {
          border: "none",
        },
        [theme.breakpoints.down("md")]: {
          paddingX: 1,
          minWidth: "auto",
        },
      }}
    >
      {name}
    </Button>
  );
};
