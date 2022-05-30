import { useState } from "react";
import { Button, Box } from "@mui/material";
import { formatColor, neutral } from "../../../theme";
import { VoteModal } from "./proposal/VoteModal";

interface VoteButtonProps {
  status: string;
  id: string;
  totalVotes: number;
}

const VoteButton = (props: VoteButtonProps) => {
  const { status, id, totalVotes } = props;

  const [open, setOpen] = useState(false);
  return (
    <Box>
      {" "}
      <Button
        sx={{ color: formatColor(neutral.white), height: 43 }}
        variant="contained"
        onClick={() => setOpen(true)}
        disabled={status === "Ended"}
      >
        Vote
      </Button>
      <VoteModal
        open={open}
        setOpen={setOpen}
        id={id}
        totalVotes={totalVotes}
      />
    </Box>
  );
};

export default VoteButton;
