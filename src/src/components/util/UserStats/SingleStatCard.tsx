import { Box, SxProps } from "@mui/material";
import React from "react";
import { formatColor, neutral } from "../../../theme";

export const SingleStatCard = ({
  children,
  sx
}: {
  children: React.ReactElement;
  sx?: SxProps
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'smallCard.background',
        borderRadius: 5,
        paddingY: 2,
        paddingLeft: {xs: 2, md: 3},
        ...sx
      }}
    >
      {children}
    </Box>
  );
};
