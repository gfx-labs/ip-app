import { Box, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { DecimalInput } from "../textFields";

export const TokenSelect = () => {
  const isLight = useLight()
  
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: isLight
          ? formatColor(neutral.gray5)
          : formatColor(neutral.gray4),
        padding: 4,
        borderRadius: 5,
        boxShadow: '0px 4px 4px 0px rgba(0,0,0, 0.05)'
      }}
    >
      <DecimalInput />
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box component="img" width={24} height={24} src="/images/usdi.svg">
          </Box>

          <Typography sx={{
            color: formatColor(neutral.gray3),
            fontSize: 18,
            fontWeight: 600,
            marginLeft: 1
          }}>USDI</Typography>
      </Box>
    </Box>
  );
};
