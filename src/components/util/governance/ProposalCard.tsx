import { Box, Typography } from "@mui/material";
import React from "react";
import { useLight } from "../../../hooks/useLight";
import { blue, formatColor, green, neutral, pink } from "../../../theme";
import { Votes } from "./Votes";
import { Status } from "./Status";

export interface Proposal {
  votes: string;
  title: string;
  yesVotes: string;
  noVotes: string;
  status: string;
  timeLeft: string;
}
export interface ProposalProps {
  proposal: Proposal;
}

export const ProposalCard = (props: ProposalProps) => {
  const { votes, title, yesVotes, noVotes, status, timeLeft } = props.proposal;
  const isLight = useLight()

  return (
    <Box sx={{
      backgroundColor: isLight ? formatColor(neutral.white) : formatColor(neutral.black6),
      borderRadius: 2,
      paddingX: 4,
      paddingY: 3,
    }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography color={formatColor(blue.blue1)}>{votes}</Typography>
          <Box>
            <Typography>{title}</Typography>
            {timeLeft ? <Typography>{timeLeft}</Typography> : <></>}
          </Box>
        </Box>

        <Box>
          <Votes noVotes={noVotes} yesVotes={yesVotes} />
          <Status status={status} />
        </Box>
      </Box>
    </Box>
  );
};
