import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatColor, neutral } from "../../../theme";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";

export const StatsMeter = () => {
  const [percentBorrowed, setPercentBorrowed] = useState(30);

  const {borrowingPower, accountLiability} = useVaultDataContext()

  useEffect(()=>{
    if(borrowingPower && accountLiability){
      setPercentBorrowed(Math.floor(100 * accountLiability / borrowingPower))
    }
  },[borrowingPower, accountLiability])
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
          Borrowing Power: {borrowingPower} USDi
        </Typography>
      </Box>
    </Box>
  );
};
