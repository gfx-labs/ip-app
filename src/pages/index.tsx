import { formatColor, neutral } from "../theme";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import { BaseSwitch } from "../components/util/switch";

const LandingPage = () => {
  const theme = useTheme();
  const { currentAccount } = useWeb3Context();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        marginX: "auto",
        backgroundColor: formatColor(neutral.white),
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
          interest protocol <br />
          {currentAccount && <Typography>{currentAccount}</Typography>}
          <BaseSwitch option1="he" option2="hi" onOptionChange={console.log}/>
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
