import { Box, Typography } from "@mui/material";
import React, {useState} from "react";
import { useLight } from "../../../hooks/useLight";
import { blue, formatColor, green, neutral, pink } from "../../../theme";
import { Votes } from "./Votes";
import { Status } from "./Status";
import {Spinner} from "../loading";

import ReactMarkdown from 'react-markdown'

export interface Proposal {
  id: string;
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
  const { id, title, yesVotes, noVotes, status, timeLeft } = props.proposal;
  const isLight = useLight();
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedContent, setExpandedContent] = useState<string | undefined>(undefined)

  const expandCard = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <Box
      onClick={expandCard}
      sx={{
        backgroundColor: isLight
          ? formatColor(neutral.white)
          : formatColor(neutral.black6),
        borderRadius: 2,
        paddingX: { xs: 1, md: 4 },
        paddingY: 3,
        cursor: "pointer",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography
            variant="h3"
            fontWeight={500}
            color={formatColor(blue.blue1)}
            mr={1}
          >
            {id}
          </Typography>
          <Box position="relative" top={4}>
            <Typography variant="h3" fontWeight={500} color="text.secondary">
              {title}
            </Typography>
            {timeLeft ? (
              <Typography variant="body2" color={formatColor(neutral.gray3)}>
                {timeLeft}
              </Typography>
            ) : (
              <Box height="8px"></Box>
            )}
          </Box>
        </Box>

        <Box display="flex">
          <Box display={{ xs: "none", md: "flex" }}>
            <Votes noVotes={noVotes} yesVotes={yesVotes} />
          </Box>
          <Status status={status} />
        </Box>
      </Box>

      { isExpanded ?
      <Box
        sx={{
          marginTop: 3,
        }}
      >
        {expandedContent ? <ReactMarkdown>{expandedContent}</ReactMarkdown> : <Spinner/>}
      </Box> : <></>
      }
    </Box>
  );
};
