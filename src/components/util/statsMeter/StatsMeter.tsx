import { Box, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import { formatColor, neutral } from "../../../theme";

export const StatsMeter = () => {
  const [percentBorrowed, setPercentBorrowed] = useState(30);

  const [borrowingPower, setBorrowingPower] = useState(46254.065);

  return (
    <Box>
      <Typography variant="body1" fontWeight={600} color={formatColor(neutral.gray3)}>
        Your Stats
      </Typography>

      <LinearProgress variant="determinate" value={percentBorrowed} sx={{marginY: 2}}/>

      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="body2" color={formatColor(neutral.gray3)}>
          USDi Borrowed: {percentBorrowed}%
        </Typography>

        <Typography variant="body2" color={formatColor(neutral.gray3)}>
          Borrowing Power: {borrowingPower.toLocaleString()}%
        </Typography>
      </Box>
    </Box>
  );
};
