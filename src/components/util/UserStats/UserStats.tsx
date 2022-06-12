import { Box, Typography, Button, useTheme } from "@mui/material";
import { BigNumber } from "ethers";
import { Spinner, WithSpinner } from "../loading";
import { useState, useEffect, Suspense } from "react";
import { useLight } from "../../../hooks/useLight";
import {
  formatColor,
  formatGradient,
  gradient,
  neutral,
  blue,
} from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { ConnectWalletButton, CopyButton } from "../button";
import { TitleText } from "../text";
import { addressShortener } from "../text/";
import { SingleStatCard } from "./SingleStatCard";
import { UserTokenCard } from "./UserTokenCard";
import { BN } from "../../../easy/bn";
import { OpenVaultButton } from "../button/OpenVaultButton";
import { BNtoHexNumber } from "../helpers/BNtoHex";

const StatsBodyTypography = ({ text }: { text: string }) => (
  <Typography
    variant="label2"
    color={formatColor(neutral.gray3)}
    whiteSpace="nowrap"
  >
    {text}
  </Typography>
);

export const UserStats = () => {
  const isLight = useLight();
  const [rewards, setRewards] = useState(0);
  const [rewardsClaimed, setRewardsClaimed] = useState(0);

  const [borrowAPR, setBorrowAPR] = useState(0);
  const [totalBaseLiability, setTotalBaseLiability] = useState<number | null>(
    null
  );
  const [token_cards, setTokenCards] = useState<JSX.Element | undefined>(
    undefined
  );

  const theme = useTheme();
  const {
    connected,
    disconnectWallet,
    error,
    currentAccount,
  } = useWeb3Context();
  const rolodex = useRolodexContext();
  const {
    tokens,
    refresh,
    setTokens,
    vaultID,
    redraw,
    setRedraw,
    hasVault,
    setVaultID,
    vaultAddress,
    borrowingPower,
    setVaultAddress,
    accountLiability,
  } = useVaultDataContext();
  const { setType } = useModalContext();
  useEffect(() => {
    if (rolodex) {
      rolodex!
        .USDI!.reserveRatio()
        .then((ratio) => {
          return rolodex!.Curve?.getValueAt(
            "0x0000000000000000000000000000000000000000",
            ratio
          ).then((apr) => {
            setBorrowAPR(apr.div(BN("1e14")).toNumber() / 100);
          });
        })
        .catch((e) => {
          setBorrowAPR(0);
        });

      rolodex.VC?.totalBaseLiability().then((res) => {
        setTotalBaseLiability(BNtoHexNumber(res));
      });
    }
  }, [rolodex]);

  useEffect(() => {
    if (tokens) {
      let el: Array<any> = [];
      for (const [key, val] of Object.entries(tokens)) {
        el.push(
          <UserTokenCard
            key={key}
            tokenName={val.ticker}
            tokenValue={"$" + val.value?.toLocaleString()!}
            vaultBalance={"$" + val.vault_balance?.toLocaleString()!}
            tokenAmount={val.vault_amount?.toLocaleString()!}
            image={{
              src: val.ticker,
              alt: val.ticker,
            }}
            LTVPercent={val.token_LTV!.toLocaleString()}
            penaltyPercent={val.token_penalty!.toLocaleString()}
            canDelegate={val.can_delegate ? true : false}
          />
        );
      }
      setTokenCards(<>{el}</>);
    }
  }, [redraw]);

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
          {vaultID ? <StatsBodyTypography text={`Vault #${vaultID}`} /> : <></>}
        </Box>

        <Box display="flex" alignItems="center">
          <StatsBodyTypography text="Vault Address" />{" "}
          <Box marginRight={2}></Box>
          {connected ? (
            vaultAddress ? (
              <CopyButton
                text={addressShortener(vaultAddress!)}
                copy={vaultAddress}
              />
            ) : (
              <CopyButton
                text={addressShortener(
                  "0x0000000000000000000000000000000000000000"
                )}
                copy={`0x0000000000000000000000000000000000000000`}
              />
            )
          ) : (
            <ConnectWalletButton />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          justifyContent: "space-between",
          gridTemplateColumns: "2fr 1fr 1fr",
          columnGap: 4,
          rowGap: 4,
          marginBottom: 5,
          [theme.breakpoints.down("lg")]: {
            gridAutoFlow: "column",
            gridTemplateColumns: "3fr 2fr 2fr",
            columnGap: 1,
            rowGap: 3,
            marginBottom: 4,
          },
        }}
      >
        <SingleStatCard>
          <TitleText
            title="Borrowing Power"
            text={
              borrowingPower !== null
                ? "$" + Math.round(borrowingPower).toLocaleString()
                : null
            }
          />
        </SingleStatCard>

        <SingleStatCard>
          <TitleText
            title="Borrow APR"
            text={borrowAPR !== null ? borrowAPR.toString() + "%" : null}
          />
        </SingleStatCard>

        <SingleStatCard>
          <TitleText
            title="IPT APY"
            text={
              totalBaseLiability !== null
                ? ((94017 * accountLiability) / totalBaseLiability) * 52.143 + " IPT /y"
                : null
            }
          />
        </SingleStatCard>

        <SingleStatCard
          sx={{
            paddingRight: 3,
            gridColumn: "1 / -1",
            [theme.breakpoints.down("lg")]: {
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
              text={
                accountLiability !== null
                  ? "$" + Math.round(accountLiability).toLocaleString()
                  : null
              }
            />

            {hasVault ? (
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
                  [theme.breakpoints.down("sm")]: {
                    gridTemplateColumns: "1fr",
                    rowGap: 1,
                  },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: formatColor(neutral.white),
                    boxShadow: 0,
                    color: formatColor(neutral.black),
                    "&:hover": {
                      boxShadow: 0,
                      backgroundColor: formatColor(blue.blue5),
                    },
                  }}
                  onClick={() => setType(ModalType.Borrow)}
                >
                  <Typography variant="body3">Borrow</Typography>
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: formatColor(neutral.white),
                    boxShadow: 0,
                    color: formatColor(neutral.black),
                    "&:hover": {
                      boxShadow: 0,
                      backgroundColor: formatColor(blue.blue5),
                    },
                  }}
                  onClick={() => setType(ModalType.Repay)}
                >
                  <Typography variant="body3">Repay</Typography>
                </Button>
              </Box>
            ) : (
              <Box
                maxWidth={350}
                width="100%"
                display="flex"
                alignItems="center"
              >
                <OpenVaultButton />
              </Box>
            )}
          </Box>
        </SingleStatCard>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
            lg: "repeat(3, 1fr)",
          },
          columnGap: 3,
          rowGap: 3,
        }}
      >
        {connected && currentAccount ? token_cards : <></>}
      </Box>
      <Box
        sx={{
          display: "grid",
          justifyContent: "space-between",
          gridTemplateColumns: "10fr 1fr",
          columnGap: 4,
          marginTop: 2,
        }}
      ></Box>
    </Box>
  );
};
