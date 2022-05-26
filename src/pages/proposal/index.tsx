import { Routes, Route, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import { ForwardIcon } from "../../components/icons/misc/ForwardIcon";
import { formatColor, neutral, blue } from "../../theme";
import { useLight } from "../../hooks/useLight";
import { Status } from "../../components/util/governance/Status";
import { VoteCount } from "./VoteCount";

const Proposal: React.FC = () => {
  const theme = useTheme();
  const isLight = useLight();

  const id = 9;
  const title = "Vote to Integrate Omniwop into Protocol";
  const status = "active";
  const time = "Voting ended on March 25, 2020";

  const  voteHandler = () => {

  }

  const voters = [
    {
      address: "0x00992D294752D54492b3893415f63B3F82Eb3778",
      votingPower: 3123123132,
    },
    {
      address: "0x00992D294752D54492b3893415f63B3F82Eb3778",
      votingPower: 313132,
    },
    {
      address: "0x00992D294752D54492b3893415f63B3F82Eb3778",
      votingPower: 3123132,
    },
    {
      address: "0x00992D294752D54492b3893415f63B3F82Eb3778",
      votingPower: 123123132,
    },
    {
      address: "0x00992D294752D54492b3893415f63B3F82Eb3778",
      votingPower: 23123132,
    },
    {
      address: "0x00992D294752D54492b3893415f63B3F82Eb3778",
      votingPower: 3123132,
    },
  ];

  return (
    <Box
      color={formatColor(neutral.black)}
      textAlign="left"
      maxWidth="xl"
      py={{ xs: 7, sm: 0 }}
      px={{ xs: 2, md: 10 }}
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
      <ForwardIcon
        sx={{ width: 18, height: 14, transform: "rotate(180deg)", mb: 1 }}
        strokecolor={
          isLight ? formatColor(neutral.black) : formatColor(neutral.white)
        }
      />

      <Box display="flex" alignItems="center">
        <Typography
          variant="h3"
          fontWeight={500}
          color={formatColor(blue.blue1)}
          mr={1}
        >
          {id}
        </Typography>

        <Typography variant="h3" fontWeight={500} color="text.secondary">
          {title}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="end">
        <Status status={status} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          sx={{ width: 133, color: formatColor(neutral.white), height: 43 }}
          variant="contained"
          onClick={voteHandler}
        >
          Vote
        </Button>

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
          votes={2324242342}
          totalVotes={3242342342}
          voters={voters}
        />
        <VoteCount
          forOrAgainst="Against"
          votes={1324242342}
          totalVotes={3242342342}
          voters={voters}
        />
      </Box>
    </Box>
  );
};

export default Proposal;
