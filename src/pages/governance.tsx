import { Box, Typography, useTheme } from "@mui/material";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import { ProposalCard } from "../components/util/governance/ProposalCard";
import { Spinner } from "../components/util/loading";
import { GovernanceToolTip } from "../components/util/tooltip/GovernanceToolTip";
import {
  getRecentProposals,
  useProposalCount,
  useProposalInfo,
} from "../hooks/useGovernance";

export interface Proposal {
  body: string;
  id: string;
  proposer: string;
  eta: BigNumber;
  startBlock: BigNumber;
  endBlock: number;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  abstainVotes: BigNumber;
  canceled: boolean;
  executed: boolean;
  emergency: boolean;
  quorumVotes: BigNumber;
  delay: BigNumber;
}

export const Governance = () => {
  const theme = useTheme();
  const { dataBlock, provider, chainId } = useWeb3Context();
  const [proposals, setProposals] = useState<Map<number, Proposal>>(
    new Map<number, Proposal>([])
  );

  const [noProposals, setNoProposals] = useState(false);

  useEffect(() => {
    console.log("MOEWWWWW");
    console.log(provider);
    if (provider) {
      getRecentProposals(provider)
        .then((pl) => {
          console.log(
            pl,
            "PGAOIREGOAENROGNARENGOIUANEORGNOAERNGOANERGNOAERNGOAENRGIOL"
          );
          pl.forEach((val) => {
            proposals.set(val.args.id.toNumber(), {
              id: val.args.id.toString(),
              proposer: val.args.proposer,
              body: val.args.description,
              endBlock: val.args.endBlock.toNumber(),
            });
          });
          setProposals(new Map(proposals));
        })
        .catch((e) => {
          console.log("failed to load proposal info", e);

          setNoProposals(true);
        });

      const newProposals = new Map();

      newProposals.set(1, {
        body: "body body body",
        id: "1",
        proposer: "0x9723hr9f239dn329nd92n39dn2983nd8",
        eta: BigNumber.from("456456456"),
        startBlock: BigNumber.from("412312356456456"),
        endBlock: BigNumber.from("56456456"),
        forVotes: BigNumber.from("56"),
        againstVotes: BigNumber.from("456"),
        abstainVotes: BigNumber.from("6"),
        canceled: false,
        executed: false,
        emergency: false,
        quorumVotes: BigNumber.from("741256456"),
        delay: BigNumber.from("9412312356456456"),
      });

      newProposals.set(2, {
        body: "body body body",
        id: "2",
        proposer: "0x119723hr9f239dn329nd92n39dn2983nd8",
        eta: BigNumber.from("456456456"),
        startBlock: BigNumber.from("412312356456456"),
        endBlock: BigNumber.from("56456456"),
        forVotes: BigNumber.from("56"),
        againstVotes: BigNumber.from("456"),
        abstainVotes: BigNumber.from("6"),
        canceled: false,
        executed: false,
        emergency: true,
        quorumVotes: BigNumber.from("741256456"),
        delay: BigNumber.from("9412312356456456"),
      });

      setProposals(newProposals);
    }
  }, [provider, dataBlock, chainId]);

  return (
    <Box
      maxWidth="xl"
      py={{ xs: 7, sm: 0 }}
      px={{ xs: 2, md: 10 }}
      minHeight="80vh"
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
      <Box
        display="flex"
        mb={3}
        columnGap={2}
        rowGap={1}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <GovernanceToolTip
          title={
            <>
              <Typography variant="h3">Voting</Typography> <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Threshold: 40,000,000
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Qurourum Threshold: 20,000,000
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Voting Period: 5 days
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Timelock Period: 15 seconds
              </Typography>
            </>
          }
          text="Proposal Voting"
        />

        <GovernanceToolTip
          title={
            <>
              <Typography variant="h3">Emergency Voting</Typography> <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Voting Period: 1 day
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Qurourum Threshold: 20,000,000
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Timelock Period: 15 seconds
              </Typography>
            </>
          }
          text="Emergency Voting"
        />
      </Box>

      {proposals.size != 0 ? (
        Array.from(proposals.values())
          .sort((a, b) => {
            return Number(a.id) < Number(b.id) ? 1 : -1;
          })
          .map((proposal, index) => (
            <Box key={index} mb={2}>
              <ProposalCard proposal={proposal} />
            </Box>
          ))
      ) : (
        <Box display="flex" justifyContent="center" mt="30vh">
          {noProposals ? (
            <Box>No Proposals available to show</Box>
          ) : (
            <Spinner />
          )}
        </Box>
      )}
    </Box>
  );
};
