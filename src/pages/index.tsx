import { formatColor, neutral } from "../theme";
import { Box, Typography, useTheme } from "@mui/material";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import { ProtocolStatsCard } from "../components/util/cards";
import { useLight } from "../hooks/useLight";
import { UsdiGraphCard } from "../components/util/cards/UsdiGraphCard";
import { StatsMeter } from "../components/util/statsMeter";
import { UserStats } from "../components/util/UserStats";
import { ConnectWalletButton } from "../components/util/button";
import { OpenVaultButton } from "../components/util/button/OpenVaultButton";
import { useRolodexContext } from "../components/libs/rolodex-data-provider/RolodexDataProvider";
import { useEffect } from "react";
import { useVaultDataContext } from "../components/libs/vault-data-provider/VaultDataProvider";
import { BigNumber } from "ethers";
import { useAppGovernanceContext } from "../components/libs/app-governance-provider/AppGovernanceProvider";
import { Governance } from "./governance";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router";

const Dashboard = () => {
  const cookies = new Cookies()
  const isFirst = cookies.get("first-visit")
  if(isFirst) {
  }else{
    console.log("detected first login")
    return <><meta http-equiv="refresh" content="0; url=#/landing" />
    <a href="#/landing">please click here if you are not redirected</a></>
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
          py={{ xs: 7, sm: 0 }}
          px={{ xs: 2, md: 10 }}
          margin="auto"
          position="relative"
          sx={{
            [theme.breakpoints.down("md")]: {
              mb: 0,
              pb: 0,
              marginLeft: "auto",
          },
          }}
        >
          <Typography
            variant="body1"
            paddingLeft={{ xs: 2, md: 6 }}
            marginBottom={2}
            color={formatColor(neutral.gray10)}
          >
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

          <Box sx={{ position: "relative" }}>
            {!connected ? (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 9,
                  top: "-2%",
                  bottom: -16,
                  left: "-100%",
                  right: "-100%",
                  width: "auto",
                  height: "102%",
                  background: isLight
                    ? "rgba(55, 66, 82, 0.42)"
                    : "rgba(35, 40, 48, 0.82)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
              >
                <ConnectWalletButton invertLight />
              </Box>
            ) : (
            connected &&
              !hasVault && (
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 9,
                    top: "-2%",
                    bottom: -16,
                    left: "-100%",
                    right: "-100%",
                    width: "auto",
                    height: "102%",
                    background: isLight
                      ? "rgba(55, 66, 82, 0.42)"
                      : "rgba(35, 40, 48, 0.82)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                  }}
                >
                  <OpenVaultButton />
                </Box>
            )
            )}
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
