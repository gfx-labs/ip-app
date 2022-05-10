import { Box, Typography, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { useLight } from "../../../hooks/useLight";
import {
  formatColor,
  formatGradient,
  gradient,
  neutral,
  blue,
} from "../../../theme";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { ConnectWalletButton, CopyButton } from "../button";
import { TitleText } from "../text";
import { addressShortener } from "../text/";
import { SingleStatCard } from "./SingleStatCard";
import { UserTokenCard } from "./UserTokenCard";

const StatsBodyTypography = ({ text }: { text: string }) => (
  <Typography
    variant="body2"
    fontWeight={600}
    color={formatColor(neutral.gray3)}
    whiteSpace="nowrap"
  >
    {text}
  </Typography>
);

export const UserStats = () => {
  const isLight = useLight();
  const [rewards, setRewards] = useState(1543);
  const [rewardsClaimed, setRewardsClaimed] = useState(0);

  const [collateralDeposited, setCollateralDeposited] = useState(54443.42);
  const [borrowAPR, setBorrowAPR] = useState(4.24);
  const [USDIBorrowed, setUSDIBorrowed] = useState(14329);

  const theme = useTheme();

  const { connected, disconnectWallet, error, currentAccount } =
    useWeb3Context();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(${formatGradient(
          isLight ? gradient.statDefaultLight : gradient.statDefaultDark
        )})`,
        paddingX: 6,
        paddingY: 7,
        borderRadius: 16,

        [theme.breakpoints.down("md")]: {
          paddingX: 2,
          paddingY: 6,
          borderRadius: 5,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-end", md: "space-between" },
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Box display={{ xs: "none", md: "flex" }}>
          <StatsBodyTypography text={`Rewards:${rewards.toLocaleString()}`} />
          <Box
            sx={{
              width: 26,
              height: 0,
              border: "1px solid #A3A9BA",
              transform: "rotate(90deg) translateX(10px)",
              marginX: 3,
            }}
          ></Box>
          <StatsBodyTypography
            text={`Rewards claimed: ${rewardsClaimed.toLocaleString()}`}
          />
        </Box>

        <Box display="flex" alignItems="center">
          <StatsBodyTypography text="Vault Address" />{" "}
          <Box marginRight={2}></Box>
          {connected ? (
            <CopyButton
              text={addressShortener(currentAccount)}
              copy={currentAccount}
            />
          ) : (
            <ConnectWalletButton />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          justifyContent: "space-between",
          gridTemplateColumns: "2fr 1fr 4fr",
          columnGap: 4,
          marginBottom: 5,
          [theme.breakpoints.down("lg")]: {
            gridAutoFlow: "column",
            gridTemplateColumns: "3fr 2fr",
            columnGap: 1,
            rowGap: 3,
            marginBottom: 4,
          },
        }}
      >
        <SingleStatCard>
          <TitleText
            title="Collateral Deposited"
            text={`$${collateralDeposited.toLocaleString()}`}
          />
        </SingleStatCard>

        <SingleStatCard>
          <TitleText title="Borrow APR" text={`${borrowAPR}%`} />
        </SingleStatCard>

        <SingleStatCard
          sx={{
            paddingRight: 3,
            [theme.breakpoints.down("lg")]: {
              gridColumn: "1 / -1",
              gridRow: 2,
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              [theme.breakpoints.down("lg")]: {
                flexWrap: "wrap",
              },
            }}
          >
            <TitleText
              title="USDi Borrowed"
              text={`$${USDIBorrowed.toLocaleString()}`}
            />

            <Box
              display="grid"
              alignItems="center"
              columnGap={2}
              gridTemplateColumns="1fr 1fr"
              sx={{
                [theme.breakpoints.down("lg")]: {
                  width: "100%",
                  marginTop: 3,
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: formatColor(blue.blue8),
                  color: formatColor(blue.blue7),
                }}
              >
                Borrow
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: formatColor(blue.blue8),
                  color: formatColor(blue.blue7),
                }}
              >
                Repay
              </Button>
            </Box>
          </Box>
        </SingleStatCard>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          columnGap: 3,
          rowGap: 3,
        }}
      >
        <UserTokenCard
          tokenName="WBTC"
          tokenValue="39590"
          vaultBalance="42348"
          tokenAmount="4"
          image={{
            src: "WBTC",
            alt: "WBTC",
          }}
          LTVPercent="85"
          penaltyPercent="5"
        />

        <UserTokenCard
          tokenName="WBTC"
          tokenValue="39590"
          vaultBalance="42348"
          tokenAmount="4"
          image={{
            src: "WBTC",
            alt: "WBTC",
          }}
          LTVPercent="85"
          penaltyPercent="5"
        />

        <UserTokenCard
          tokenName="WBTC"
          tokenValue="39590"
          vaultBalance="42348"
          tokenAmount="4"
          image={{
            src: "WBTC",
            alt: "WBTC",
          }}
          LTVPercent="85"
          penaltyPercent="5"
        />
      </Box>
    </Box>
  );
};
