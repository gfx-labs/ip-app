import { formatColor, formatGradient, gradient, neutral } from "../theme";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import { BaseSwitch } from "../components/util/switch";
import { ProtocolStatsCard } from "../components/util/cards";
import { useLight } from "../hooks/useLight";
import { UsdiGraphCard } from "../components/util/cards/UsdiGraphCard";

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
        mt={{ xs: 20, md: 31 }}
        height={isMobile ? "auto" : "80vh"}
        position="relative"
        marginBottom={25}
        sx={{
          mb: 25,
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
          <Box display="grid" gridTemplateColumns="1fr 1fr" columnGap={2}>
            <ProtocolStatsCard />
            <UsdiGraphCard />
          </Box>
        </Typography>
        <Typography
          variant="h4"
          zIndex={1}
          textAlign="right"
          position="relative"
          fontWeight={600}
          sx={{
            color: formatColor(neutral.gray1),
            [theme.breakpoints.down("md")]: {
              fontSize: 24,
            },
          }}
        >
          usdi <br />
          usdi <br />
          usdi <br />
          usdi <br />
          usdi <br />
          usdi <br />
          usdi <br />
          usdi <br />
          usdi <br />
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
