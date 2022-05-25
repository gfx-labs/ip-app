import { Box, Typography } from '@mui/material';
import React from 'react'
import { useLight } from '../../../hooks/useLight';

interface Proposal {
  votes: string;
  title: string;
  yesVotes: string;
  noVotes: string;
  status: string;
  timeLeft: string;
}


export const ProposalCard = (props: Proposal) => {
  const {votes, title, yesVotes, noVotes, status, timeLeft} = props;
  const isLight = useLight()
  return (
    <Box sx={{

    }}>
      <Box display="flex">
        <Box>
          <Typography>{votes}</Typography>
          <Box>

          <Typography>{title}</Typography>
          <Typography>{timeLeft}</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
