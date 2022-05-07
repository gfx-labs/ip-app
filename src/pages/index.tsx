import { formatColor, formatGradient, gradient, neutral } from "../theme";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import { BaseSwitch } from "../components/util/switch";
import { ProtocolStatsCard } from "../components/util/cards";
import { useLight } from "../hooks/useLight";
import { UsdiGraphCard } from "../components/util/cards/UsdiGraphCard";
import { StatsMeter } from "../components/util/statsMeter";
import { UserStats } from "../components/util/UserStats";

const LandingPage = () => {
  const theme = useTheme();
  const { currentAccount } = useWeb3Context();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isLight = useLight();

  return (
    <Box
      sx={{
        marginX: "auto",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <Box
        color={formatColor(neutral.black)}
        textAlign="left"
        maxWidth="xl"
        py={{ xs: 7, sm: 0 }}
        px={{ xs: 2, md: 10 }}
        margin="auto"
        position="relative"
        sx={{
          [theme.breakpoints.down("md")]: {
            mb: 16,

            pb: 0,
            marginLeft: "auto",
          },
        }}
      >
        <Typography variant="body1" paddingLeft={{xs: 2, md: 6}} marginBottom={2} color={formatColor(neutral.gray10)}>
          Protocol Stats
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 2,
            [theme.breakpoints.down("lg")]: {
              gridTemplateColumns: "1fr",
              rowGap: 5,
            },
          }}
        >
          <ProtocolStatsCard />
          <UsdiGraphCard />
        </Box>
        <Box sx={{ marginY: 4 }}>
          <StatsMeter />
        </Box>

        <UserStats />
      </Box>
    </Box>
  );
};

export default LandingPage;
