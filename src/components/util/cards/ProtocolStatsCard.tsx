import { Box } from "@mui/material";
import React from "react";
import { TitleText } from "../text";

export const ProtocolStatsCard = () => {
  return (
    <Box>
      <Box
        about="Minted and Deposited stats"
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <TitleText title="USDi Minted" text="672,233,324" />
        <TitleText title="USDC Deposited" text="350,375,764" />
      </Box>

      
    </Box>
  );
};
