import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useLight } from "../../../hooks/useLight";
import { formatGradient, gradient } from "../../../theme";

import { Footer } from "../footer";
import { TopBar } from "../top-bar";
export interface AppLayoutProps {
  children?: ReactNode;
}

export const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  const isLight = useLight();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(${formatGradient(
          isLight ? gradient.bgDefaultLight : gradient.bgDefaultDark
        )})`,
      }}
    >
      <TopBar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};
