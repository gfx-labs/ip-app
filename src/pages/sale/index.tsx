import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import { keyframes } from "@emotion/react";
import Cookies from "universal-cookie";
import { ForwardIcon } from "../../components/icons/misc/ForwardIcon";
import { formatColor, neutral, blue } from "../../theme";
import { Terms } from "./terms";
import { AppLayout } from "../../components/partials/app-layout";
import { useLight } from "../../hooks/useLight";
import { DecimalInput } from "../../components/util/textFields";
import { DisableableModalButton } from "../../components/util/button/DisableableModalButton";
import { ModalInputContainer } from "../../components/util/modal/ModalContent/ModalInputContainer";

const PurchasePage: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
      console.log(scrollTop, document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <AppLayout>
      <Box
        sx={{
          marginX: "auto",
          position: "relative",
          height: "100%",
          minHeight: "70vh",
          width: "100%",
          overflow: "hidden",
          py: {xs: 10},
          maxWidth: 700,
          paddingX: { xs: 2, sm: 10 },
        }}
      >
        <Terms />
        <PurchaseBox />
      </Box>
    </AppLayout>
  );
};

const PurchaseBox: React.FC = () => {
  const isLight = useLight();

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabStyle = {
    backgroundColor: isLight
      ? formatColor(neutral.white)
      : formatColor(neutral.gray7),
    color: "primary.main",
    px: { xs: 1, sm: 5 },
    py: { xs: 0.5, sm: 1.5 },
    minHeight: "auto",

    "&.Mui-selected": {
      backgroundColor: isLight
        ? formatColor(neutral.gray7)
        : formatColor(neutral.white),
      borderRadius: 2,
      color: isLight ? formatColor(neutral.white) : formatColor(neutral.gray7),
    },
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          mb: 4,
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab sx={TabStyle} label="Wave 1" />
        <Tab sx={TabStyle} label="Wave 2" />
        <Tab sx={TabStyle} label="Wave 3" />
      </Tabs>

      <TabPanel value={value} index={0} />

      <TabPanel value={value} index={1} />

      <TabPanel value={value} index={2} />
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const isLight = useLight();
  const theme = useTheme();
  const [iptForSale, setIptForSale] = useState(1000000);
  const [usdcCommitted, setUsdcCommitted] = useState(1000000);
  const [usdcAmountToCommit, setUsdcAmountToCommit] = useState("");
  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);
  const waveNum = index + 1;

  const usdcCommitHandler = () => {
    console.log(usdcAmountToCommit);
  };

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src="images/ipt_blue.svg"
              width={80}
              mr={3}
            ></Box>
            <Typography variant="subtitle2" fontWeight={600}>
              IPT Sale
            </Typography>
          </Box>

          <Box display="flex" mt={3}>
            <Typography variant="body2" fontWeight={600} color="#A3A9BA" mr={1}>
              Sale Period:{" "}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color={
                isLight
                  ? formatColor(neutral.gray7)
                  : formatColor(neutral.white)
              }
            >
              Wave {waveNum} Ending in 48 Hours
            </Typography>
          </Box>

          <Box display="flex" flexWrap="wrap" mt={3} columnGap={4} rowGap={2}>
            <Box display="flex">
              <Typography variant="h3" fontWeight={600} color="#A3A9BA" mr={1}>
                IPT for sale:{" "}
              </Typography>
              <Typography
                variant="h3"
                fontWeight={600}
                color={
                  isLight
                    ? formatColor(neutral.gray7)
                    : formatColor(neutral.white)
                }
              >
                {" "}
                {iptForSale.toLocaleString()}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h3" fontWeight={600} color="#A3A9BA" mr={1}>
                USDC Committed:{" "}
              </Typography>
              <Typography
                variant="h3"
                fontWeight={600}
                color={
                  isLight
                    ? formatColor(neutral.gray7)
                    : formatColor(neutral.white)
                }
              >
                {usdcCommitted.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box component="form" onSubmit={usdcCommitHandler} mt={4}>
            <ModalInputContainer focus={focus}>
              <DecimalInput
                onFocus={toggle}
                onBlur={toggle}
                placeholder="USDC Amount"
                value={usdcAmountToCommit}
                onChange={setUsdcAmountToCommit}
              />
            </ModalInputContainer>
            <br />
            <DisableableModalButton
              disabled={Number(usdcAmountToCommit) <= 0}
              text="Commit"
              type="submit"
            />
          </Box>
          <Box mt={5} display="flex" justifyContent="space-between" flexDirection={{xs: 'column', md: 'row'}}>
            <Button>
              Token Sale Rules
            </Button>

            <Button>
              View Sales Contract
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PurchasePage;
