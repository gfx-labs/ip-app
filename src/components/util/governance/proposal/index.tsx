import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { formatColor, neutral, blue } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { VoteCount, Voter } from "./VoteCount";
import { VoteModal } from "./VoteModal";
import { getProposalVoters } from "../../../../hooks/useGovernance";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";
import { BN } from "../../../../easy/bn";
import VoteButton from "../VoteButton";

export interface ProposalDetailsProps {
  id: string;
  status: string;
}

const ProposalDetails: React.FC<ProposalDetailsProps> = (
  props: ProposalDetailsProps
) => {
  const theme = useTheme();
  const isLight = useLight();
  const { provider } = useWeb3Context();
  const [open, setOpen] = useState(false);
  const { id, status } = props;

  const time = "Voting ended on March 25, 2020";
  const totalVotes = 23423424234;

  const [voters, setVoters] = useState<Map<string, Voter>>(new Map());
  const [votersFor, setVotersFor] = useState<Array<Voter>>([]);
  const [votersBad, setVotersBad] = useState<Array<Voter>>([]);
  const [votersPeanut, setVotersPeanut] = useState<Array<Voter>>([]);

  const [votesTotal, setVotesTotal] = useState(0);
  useEffect(() => {
    if (provider) {
      getProposalVoters(id, provider).then((px) => {
        px.map((p) => {
          voters.set(p.voter, {
            address: p.voter,
            votingPower: p.votes.div(BN("1e16")).toNumber() / 100,
            direction: p.support,
          });
        });
        const vfor: Array<Voter> = [];
        const vbad: Array<Voter> = [];
        const vpea: Array<Voter> = [];
        let total = 0;
        voters.forEach((v) => {
          total = total + v.votingPower;
          switch (v.direction) {
            case 0:
              vbad.push(v);
              break;
            case 1:
              vfor.push(v);
              break;
            case 2:
              vpea.push(v);
              break;
          }
        });
        setVotesTotal(total);
        setVotersFor(vfor);
        setVotersBad(vbad);
      });
    }
  }, [provider]);

  return (
    <Box
      color={formatColor(neutral.black)}
      textAlign="left"
      maxWidth="xl"
      py={{ xs: 7, sm: 0 }}
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <VoteButton id={id} status={status} totalVotes={votesTotal} />

        <Typography
          fontWeight={500}
          color={formatColor(neutral.gray10)}
          variant="body1"
        >
          {time}
        </Typography>
      </Box>
      <Box display="flex" columnGap={2} mt={4}>
        <VoteCount
          forOrAgainst="For"
          votes={votersFor.reduce((a, b) => {
            return a + b.votingPower;
          }, 0)}
          totalVotes={votesTotal}
          voters={votersFor}
        />
        <VoteCount
          forOrAgainst="Against"
          votes={votersBad.reduce((a, b) => {
            return a + b.votingPower;
          }, 0)}
          totalVotes={votesTotal}
          voters={votersBad}
        />
      </Box>
    </Box>
  );
};

export default ProposalDetails;
