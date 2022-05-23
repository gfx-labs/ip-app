import { AppBar, AppBarProps, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import { DesktopToolBar } from "./DesktopToolBar";
import { MobileToolBar } from "./MobileToolBar";

export interface TopBarProps extends AppBarProps {}

export const TopBar = (props: TopBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar
      position="absolute"
      {...props}
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        paddingTop: { xs: 1, md: 5 },
        paddingX: isMobile ? 1 : 10,
        maxWidth: 1500,
        margin: "auto",
        left: 0,
        right: 0,
      }}
    >
      {isMobile ? <MobileToolBar /> : <DesktopToolBar />}
    </AppBar>
  );
};
