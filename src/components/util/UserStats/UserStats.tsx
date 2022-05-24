import { Box, Typography, Button, useTheme } from "@mui/material";
import {BigNumber} from "ethers";
import { Spinner } from "../loading";
import { useState, useEffect, Suspense } from "react";
import { useLight } from "../../../hooks/useLight";
import {
  formatColor,
  formatGradient,
  gradient,
  neutral,
  blue,
} from "../../../theme";
import { ModalType, useModalContext } from "../../libs/modal-content-provider/ModalContentProvider";
import {useRolodexContext} from "../../libs/rolodex-data-provider/RolodexDataProvider";
import {useVaultDataContext} from "../../libs/vault-data-provider/VaultDataProvider";
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
  const [rewards, setRewards] = useState(0);
  const [rewardsClaimed, setRewardsClaimed] = useState(0);
  const [collateralDeposited, setCollateralDeposited] = useState(0);
  const [borrowAPR, setBorrowAPR] = useState(0);
  const [USDIBorrowed, setUSDIBorrowed] = useState(0);
  const [token_cards, setTokenCards] = useState(
    <div style={{display: 'flex', alignItems:'center', justifyContent: 'center', width: '100%'}}>
    {Spinner()}
    </div>
    )
  const theme = useTheme();
  const { connected, disconnectWallet, error, currentAccount } = useWeb3Context();
  const rolodex = useRolodexContext();
  const {tokens, setTokens,  vaultID, hasVault, setVaultID,vaultAddress,borrowingPower,  setVaultAddress,accountLiability } = useVaultDataContext();
  const {setType} = useModalContext()

  useEffect(() => {
    if (currentAccount && rolodex) {
      (async (): Promise<void> => {
        try {
          const vaultIDs = await rolodex?.VC?.vaultIDs(currentAccount);
          if (vaultIDs && vaultIDs?.length > 0) {
            const id = BigNumber.from(vaultIDs[0]._hex).toString()
            const addr = await rolodex?.VC?.vaultAddress(id)
            setVaultID(id);
            setVaultAddress(addr)
            const collateral = await rolodex!.VC?.accountBorrowingPower(id)
            setCollateralDeposited(collateral!.div(1e8).div(1e8).toNumber() / 100)
            const bab = await rolodex!.Curve?.getValueAt("0x0000000000000000000000000000000000000000", await rolodex!.USDI!.reserveRatio())
            const borrowAPR = bab!.div(1e8).div(1e8).toNumber()/100
            setBorrowAPR(borrowAPR)
          } else {
            setVaultID(null)
          }
        } catch (err) {
          setVaultID(null)
          throw new Error("cannot get vault");
        }
      })()
    }
  }, [currentAccount, rolodex]);

  useEffect(()=>{
    setUSDIBorrowed(accountLiability)
  }, [accountLiability])

  useEffect(() => {
    if(tokens){
      (async () => {
        try {
          const el = <>{Object.entries(tokens!).map(([key, val]) => {
            return <UserTokenCard
              key={key}
              tokenName={val.ticker}
              tokenValue={"$" + val.value?.toLocaleString()!}
              vaultBalance={"$"+val.vault_balance?.toLocaleString()!}
              tokenAmount={val.vault_amount?.toLocaleString()!}
              image={{
                src: val.ticker,
                alt: val.ticker,
              }}
              LTVPercent={val.token_LTV!.toLocaleString()}
              penaltyPercent={val.token_penalty!.toLocaleString()}
            />
          })}</>
          setTokenCards(el)
        }catch(err) {
          throw new Error("cannot load tokens in vault")
        }
      })()
    }
  }, [tokens])

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
              text={addressShortener(vaultAddress!)}
              copy={vaultAddress}
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
            title="Borrowing Power"
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
                  '&:hover': {
                    backgroundColor: formatColor(blue.blue5),
                }
                }}
                onClick={() => setType(ModalType.Borrow)}
              >
                Borrow
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: formatColor(blue.blue8),
                  color: formatColor(blue.blue7),
                  '&:hover': {
                    backgroundColor: formatColor(blue.blue5),
                }
                }}
                onClick={() => setType(ModalType.Repay)}
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
          {token_cards}
      </Box>
      <Box
        sx={{
          display: "grid",
          justifyContent: "space-between",
          gridTemplateColumns: "10fr 1fr",
          columnGap: 4,
          marginTop: 2,
          marginBottom: 5,
        }}
      >
        <Box display="flex" alignItems="center"></Box>
        <Box display="flex" alignItems="center">
          <StatsBodyTypography text={`Vault #${vaultID}`} />
        </Box>
      </Box>
    </Box>
  );
};
