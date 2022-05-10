import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";

interface WithdrawContentProps {
  tokenName: string;
  tokenValue: string;
  tokenVaultBalance: string;
  withdrawAmount: string;
  setWithdrawAmount: (e: string) => void;
}

export const WithdrawContent = (props: WithdrawContentProps) => {
  const {
    tokenName,
    tokenVaultBalance,
    tokenValue,
    withdrawAmount,
    setWithdrawAmount
  } = props;

  const isLight = useLight();

  const setMax = () => setWithdrawAmount(tokenVaultBalance);

  const handleWithdrawRequest = () => {};

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={formatColor(neutral.gray10)}
        textAlign="right"
      >
        {" "}
        Vault Balance: {tokenVaultBalance} {tokenName}
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
        }}
      >
        <DecimalInput
          onChange={(e) => setWithdrawAmount(e)}
          placeholder={`0 ${tokenName}`}
          value={withdrawAmount}
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
            {`$${Number(withdrawAmount) * Number(tokenValue)}`}
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
        onClick={handleWithdrawRequest}
      >
        Withdraw
      </Button>
    </Box>
  );
};
