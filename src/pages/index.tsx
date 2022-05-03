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
        px={{ xs: 3, md: 15 }}
        margin="auto"
        
        height={isMobile ? "auto" : "80vh"}
        position="relative"
        sx={{
          mb: 18,
          [theme.breakpoints.down("md")]: {
            mb: 16,
            pl: 3,
            pb: 0,
            marginLeft: "auto",
          },
        }}
      >
        <Typography
          variant="h2"
          position="relative"
          fontWeight={400}
          mb={3}
          sx={{
            [theme.breakpoints.down("md")]: {
              fontSize: 72,
            },
          }}
        >
          {currentAccount && <Typography>{currentAccount}</Typography>}

        </Typography>
          <Typography variant="body1" color={formatColor(neutral.gray3)}>Protocol Stats</Typography>
        <Box display="grid" gridTemplateColumns="1fr 1fr" columnGap={2}>
            <ProtocolStatsCard />
            <UsdiGraphCard />
          </Box>
          <Box sx={{marginY: 4}}>
          <StatsMeter />
          </Box>

          <UserStats />
      </Box>
    </Box>
  );
};

export default LandingPage;
