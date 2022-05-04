import { Box, useTheme } from "@mui/material";
import React from "react";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { TokenSelect } from "./TokenSelect";

export const SwapContainer = () => {
  const isLight = useLight()

  const theme = useTheme()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: 2,
        rowGap: 1,
        position: "relative",
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column'
        }
      }}
    >
      <TokenSelect />

      <Box
        sx={{
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
      >
        <ForwardIcon
          strokecolor={
            isLight ? formatColor(neutral.black) : formatColor(neutral.white)
          }
          sx={{
            width: 14,
            height: 13,
            [theme.breakpoints.down('md')]: {
              transform: 'rotate(90deg)'
            }
          }}
        />
      </Box>

      <TokenSelect />
    </Box>
  );
};
