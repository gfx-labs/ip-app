import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { ToolTipInfoIcon } from "../components/icons/misc/ToolTipInfoIcon";
import {
  Proposal,
  ProposalCard,
} from "../components/util/governance/ProposalCard";
import { GovernanceToolTip } from "../components/util/tooltip/GovernanceToolTip";

export const Governance = () => {
  const theme = useTheme();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "11",
      title: "Emergency vote for 323811",
      yesVotes: "5",
      noVotes: "9",
      status: "active",
      timeLeft: "30 min",
    },
    {
      id: "111",
      title: "Emergency vote for 323811",
      yesVotes: "15",
      noVotes: "9",
      status: "pending",
      timeLeft: "",
    },
    {
      id: "19",
      title: "Emergency vote for 323811",
      yesVotes: "9",
      noVotes: "9",
      status: "suspended",
      timeLeft: "expired",
    },
  ]);
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
      <Box display="flex" mb={3} columnGap={2} rowGap={1} flexDirection={{xs: 'column', md: 'row'}}>
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

      {proposals.map((proposal, index) => (
        <Box key={index} mb={2}>
          <ProposalCard proposal={proposal} />
        </Box>
      ))}
    </Box>
  );
};
