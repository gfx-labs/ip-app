import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatColor, neutral } from "../../../theme";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";

export const StatsMeter = () => {
  const [percentBorrowed, setPercentBorrowed] = useState(0);
  const [barColor, setBarColor] = useState("success");

  const {borrowingPower, accountLiability} = useVaultDataContext()

  useEffect(()=>{
    if(borrowingPower && accountLiability){
      setPercentBorrowed(Math.floor(100 * (accountLiability / borrowingPower)))
    }
  },[borrowingPower, accountLiability])

  useEffect(()=>{
    if(percentBorrowed > 80) {
      setBarColor("error")
    }
  },[percentBorrowed])
  return (
    <Box>
      <Typography variant="body1" fontWeight={600} color={formatColor(neutral.gray10)}>
        Vault Stats
      </Typography>

      <LinearProgress color={barColor as any} variant="determinate" value={percentBorrowed} sx={{
      marginY: 2,
      }}/>

      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="body2" fontWeight={600} fontSize={14} color={formatColor(neutral.gray3)}>
          Borrowing Power: {Math.round(borrowingPower).toLocaleString()} USDi
        </Typography>

        <Typography variant="body2" fontWeight={600} fontSize={14} color={formatColor(neutral.gray3)}>
          USDi Borrowed: {percentBorrowed}%
        </Typography>
      </Box>
    </Box>
  );
};
