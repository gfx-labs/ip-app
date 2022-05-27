import { useState } from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { addressShortener } from "../../components/util/text";
import { formatColor, neutral } from "../../theme";
import { useLight } from "../../hooks/useLight";
import { BaseModal } from "../../components/util/modal";

interface Voter {
  address: string;
  votingPower: number;
}

interface VoteCountProps {
  votes: number;
  totalVotes: number;
  voters: Voter[];
  forOrAgainst: string;
}

export const VoteCount = (props: VoteCountProps) => {
  const { votes, totalVotes, voters, forOrAgainst } = props;

  const isLight = useLight();

  const [barColor, setBarColor] = useState("success");
  const [seeAllOpen, setSeeAllOpen] = useState(false);

  const votePercent =
    (votes / totalVotes) * 100 > 100 ? 100 : (votes / totalVotes) * 100;

  const seeAllHandler = () => {
    setSeeAllOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.gray7),
          borderRadius: 2,
          p: 4,
          mb: 2,
        }}
      >
        <Typography color="text.secondary" variant="h3" mb={1}>
          {forOrAgainst}
        </Typography>

        <Typography
          fontWeight={500}
          textAlign="right"
          variant="h3"
          color="text.secondary"
        >
          {votes.toLocaleString()} / {totalVotes.toLocaleString()}
        </Typography>

        <LinearProgress
          color={barColor as any}
          variant="determinate"
          value={votePercent}
          sx={{
            marginY: 2,
            backgroundColor: isLight
              ? formatColor(neutral.gray6)
              : formatColor(neutral.white),
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          backgroundColor: isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.gray7),
          borderRadius: 2,
          px: 4,
          pt: 4,
          pb: 2,
          my: 2,
        }}
      >
        {voters.map((voter, index) => (
          <Box key={index} display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body1" color="text.secondary">
              {addressShortener(voter.address)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {voter.votingPower.toLocaleString()}
            </Typography>
          </Box>
        ))}

        <Button variant="text" onClick={seeAllHandler}>
          See All
        </Button>
      </Box>
      <BaseModal setOpen={setSeeAllOpen} open={seeAllOpen}>
        <Box pt={3}>
          {voters.map((voter, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="body1" color="text.secondary">
                {addressShortener(voter.address)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {voter.votingPower.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </BaseModal>
    </Box>
  );
};
