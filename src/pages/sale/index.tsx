import {
  AppBar,
  Button,
  Icon,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import { keyframes } from "@emotion/react";
import Cookies from "universal-cookie";
import { ForwardIcon } from "../../components/icons/misc/ForwardIcon";
import { formatColor, neutral, blue } from "../../theme";
import { Terms } from "./terms";

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
    <>
      <Box
        sx={{
          marginX: "auto",
          position: "relative",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Terms />
        <PurchaseBox />
      </Box>
    </>
  );
};

const PurchaseBox: React.FC = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab sx={{
            color: 'red'
        }} label="Wave One" />
        <Tab label="Wave Two" />
        <Tab label="Wave Three" />
      </Tabs>

      <TabPanel value={value} index={0}>
          0
          </TabPanel>

      <TabPanel value={value} index={1}>
        1
      </TabPanel>

      <TabPanel value={value} index={2}>
        2
      </TabPanel>
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

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default PurchasePage;
