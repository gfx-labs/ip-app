import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import {
  Proposal,
  ProposalCard,
} from "../components/util/governance/ProposalCard";

export const Governance = () => {
  const theme = useTheme();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      votes: "11",
      title: "Emergency vote for 323811",
      yesVotes: "5",
      noVotes: "9",
      status: "active",
      timeLeft: "30 min",
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
      {proposals.map((proposal, index) => (
        <Box key={index}>
          <ProposalCard proposal={proposal} />
        </Box>
      ))}
    </Box>
  );
};
