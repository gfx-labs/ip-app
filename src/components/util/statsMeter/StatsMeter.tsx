import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatColor, neutral } from "../../../theme";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";

export const StatsMeter = () => {
  const [percentBorrowed, setPercentBorrowed] = useState(0);
  const [percentBorrowedGraph, setPercentBorrowedGraph] = useState(0);

  const [barColor, setBarColor] = useState("success");

  const { borrowingPower, accountLiability } = useVaultDataContext();

  useEffect(() => {
    if (borrowingPower && accountLiability) {
      const borrowPercent = Math.floor(
        100 * (accountLiability / borrowingPower)
      );

      setPercentBorrowed(borrowPercent);

      // limits graph value to 100%
      setPercentBorrowedGraph(borrowPercent > 100 ? 100 : borrowPercent);
    }
  }, [borrowingPower, accountLiability]);

  useEffect(() => {
    if (percentBorrowed > 80) {
      setBarColor("error");
    }
  }, [percentBorrowed]);
  return (
    <Box>
      <Typography variant="label" color={formatColor(neutral.gray3)}>
        Vault Stats
      </Typography>

      <LinearProgress
        color={barColor as any}
        variant="determinate"
        value={percentBorrowedGraph}
        sx={{
          marginY: 2,
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="label2" color={formatColor(neutral.gray3)}>
          Borrowing Power: {Math.round(borrowingPower).toLocaleString()} USDi
        </Typography>

        <Typography variant="label2" color={formatColor(neutral.gray3)}>
          USDi Borrowed: {percentBorrowed}%
        </Typography>
      </Box>
    </Box>
  );
};
