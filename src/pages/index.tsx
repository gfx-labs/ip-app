import { formatColor, neutral } from "../theme";
import { Box, Typography, useTheme } from "@mui/material";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import { ProtocolStatsCard } from "../components/util/cards";
import { useLight } from "../hooks/useLight";
import { UsdiGraphCard } from "../components/util/cards/UsdiGraphCard";
import { StatsMeter } from "../components/util/statsMeter";
import { UserStats } from "../components/util/UserStats";
import { useRolodexContext } from "../components/libs/rolodex-data-provider/RolodexDataProvider";
import { useEffect } from "react";
import { useVaultDataContext } from "../components/libs/vault-data-provider/VaultDataProvider";
import { BigNumber } from "ethers";
import { useAppGovernanceContext } from "../components/libs/app-governance-provider/AppGovernanceProvider";
import { Governance } from "./governance";
import Cookies from "universal-cookie";

const Dashboard = () => {
  const cookies = new Cookies();
  const isFirst = cookies.get("first-visit");
  if (isFirst) {
  } else {
    console.log("detected first login");
    return (
      <div style={{ minHeight: "80vh" }}>
        <meta http-equiv="refresh" content="0; url=#/landing" />
        <a href="#/landing">please click here if you are not redirected</a>
      </div>
    );
  }
  const theme = useTheme();
  const { currentAccount, connected } = useWeb3Context();
  const rolodex = useRolodexContext();
  const { hasVault, setVaultID, setVaultAddress } = useVaultDataContext();
  const isLight = useLight();
  const { isApp } = useAppGovernanceContext();

  useEffect(() => {
    if (currentAccount && rolodex) {
      const fetchVault = async (): Promise<void> => {
        try {
          const vaultIDs = await rolodex?.VC?.vaultIDs(currentAccount);
          if (vaultIDs && vaultIDs?.length > 0) {
            const vaultID = BigNumber.from(vaultIDs[0]._hex).toString();

            const vaultAddress = await rolodex?.VC?.vaultAddress(vaultID);
            setVaultID(vaultID);
            setVaultAddress(vaultAddress);
          } else {
            setVaultID(null);
          }
        } catch (err) {
          setVaultID(null);

          throw new Error("cannot get vault");
        }
      };

      fetchVault();
    }
  }, [currentAccount, rolodex]);

  return (
    <Box
      sx={{
        marginX: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isApp ? (
        <Box
          color={formatColor(neutral.black)}
          textAlign="left"
          maxWidth="xl"
          pt={{ xs: 7, sm: 0 }}
          pb={{ xs: 5, sm: 10 }}
          px={{ xs: 2, md: 10 }}
          margin="auto"
          position="relative"
          sx={{
            [theme.breakpoints.down("md")]: {
              mb: 0,
              marginLeft: "auto",
            },
          }}
        >
          <Typography
            variant="label"
            paddingLeft={{ xs: 2, md: 6 }}
            color={formatColor(neutral.gray3)}
          >
            Protocol Stats
          </Typography>
          <Box
            sx={{
              marginTop: 3,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 2,
              [theme.breakpoints.down("lg")]: {
                gridTemplateColumns: "1fr",
                rowGap: 2,
            },
            }}
          >
            <ProtocolStatsCard />
            <UsdiGraphCard />
          </Box>

          <Box sx={{ position: "relative" }}>
            <Box sx={{ marginY: 4 }}>
              <StatsMeter />
            </Box>
            <UserStats />
          </Box>
        </Box>
      ) : (
        <Governance />
      )}
    </Box>
  );
};

export default Dashboard;
