import { Box, useTheme, Button } from "@mui/material";
import React from "react";
import { useLight } from "../../../hooks/useLight";
import { useSwapTokens } from "../../../hooks/useSwapTokens";
import { formatColor, neutral } from "../../../theme";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { useSwapTokenContext } from "../../libs/swap-token-provider/SwapTokenProvider";
import { TokenSelect } from "./TokenSelect";
import { useTokenAmountInput } from "./useTokenAmountInput";

export const SwapContainer = () => {
  const isLight = useLight();

  const theme = useTheme();

  const [token1, token2, swapTokenPositions, switchToken1, switchToken2] = useSwapTokenContext()

  const [
    token1Amount,
    setToken1Amount,
    token2Amount,
    setToken2Amount,
    swapTokenAmount,
  ] = useTokenAmountInput();

  const swapTokens = () => {
    swapTokenAmount();
    swapTokenPositions();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: 2,
        rowGap: 1,
        position: "relative",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      }}
    >
      <TokenSelect
        token={token1}
        changeToken={switchToken1}
        tokenAmount={token1Amount}
        setTokenAmount={setToken1Amount}
      />

      <Button
        sx={{
          padding: 0,
          minWidth: "auto",
          backgroundColor: isLight
            ? formatColor(neutral.gray6)
            : formatColor(neutral.gray7),
          position: "absolute",
          width: 42,
          height: 30,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: isLight
            ? formatColor(neutral.gray6)
            : formatColor(neutral.gray8),
        }}
        onClick={swapTokens}
      >
        <ForwardIcon
          strokecolor={
            isLight ? formatColor(neutral.black) : formatColor(neutral.white)
          }
          sx={{
            width: 14,
            height: 13,
            [theme.breakpoints.down("md")]: {
              transform: "rotate(90deg)",
            },
          }}
        />
      </Button>

      <TokenSelect
        token={token2}
        changeToken={switchToken2}
        tokenAmount={token2Amount}
        setTokenAmount={setToken2Amount}
      />
    </Box>
  );
};
