import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";

interface RepayContent {
  tokenName: string;
  tokenValue: string;
  tokenWalletBalance: string;
  repayAmount: string;
  setRepayAmount: (e: string) => void;
}

export const RepayContent = (props: RepayContent) => {
  const {
    tokenName,
    tokenWalletBalance,
    tokenValue,
    setRepayAmount,
    repayAmount,
  } = props;

  const isLight = useLight();

  const setMax = () => setRepayAmount(tokenWalletBalance);

  const handleRepayRequest = () => {};

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={formatColor(neutral.gray10)}
        textAlign="right"
      >
        {" "}
        Wallet Balance: {tokenWalletBalance} {tokenName}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: isLight
            ? formatColor(neutral.gray5)
            : formatColor(neutral.gray4),
          paddingTop: 1,
          paddingBottom: 0,
          paddingX: 2,
          borderRadius: 2,
          boxShadow: "0px 4px 4px 0px rgba(0,0,0, 0.05)",
          marginTop: 1
        }}
      >
        <DecimalInput
          onChange={(e) => setRepayAmount(e)}
          placeholder={`0 ${tokenName}`}
          value={repayAmount}
        />
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
          <Typography
            sx={{
              color: formatColor(neutral.gray3),
              fontSize: 14,
              fontWeight: 600,
              marginLeft: 1,
            }}
          >
            {`$${Number(repayAmount) * Number(tokenValue)}`}
          </Typography>

          <Button onClick={setMax}>
            <Typography
              sx={{
                color: formatColor(neutral.gray3),
                fontSize: 14,
                fontWeight: 600,
                marginLeft: 1,
              }}
            >
              Max
            </Typography>
          </Button>
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={{ color: formatColor(neutral.white), marginY: 2 }}
        onClick={handleRepayRequest}
      >
        Repay
      </Button>
    </Box>
  );
};
