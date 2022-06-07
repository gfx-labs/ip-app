import { Typography, Button, Box } from "@mui/material";
import { BaseModal } from "../../modal";
import { formatColor, neutral, pink } from "../../../../theme";
import { useCastVote } from "../../../../hooks/useGovernance";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";
import {JsonRpcSigner} from "@ethersproject/providers";

type VoteModalProps = {
  open: boolean;
  id: string;
  totalVotes: number;
  setOpen: (val: boolean) => void;
  signer: JsonRpcSigner
};

export const VoteModal:React.FC<VoteModalProps> = (props: VoteModalProps) => {
  const { open, setOpen, id, totalVotes, signer} = props;
  const currentSigner = signer

  return (
    <BaseModal open={open} withCloseButton setOpen={setOpen}>
      <Typography variant="h2">Vote for Proposal {id}</Typography>
      <Box my={2}>
        <Typography variant="body1">
          {totalVotes.toLocaleString()} Votes
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ color: formatColor(neutral.white) }}
        onClick={() => useCastVote(id, 1, currentSigner!)}
      >
        Yes
      </Button>

      <Button
        variant="contained"
        sx={{
          color: formatColor(neutral.white),
          my: 2,
        }}
        onClick={() => useCastVote(id, 0, currentSigner!)}
      >
        No
      </Button>

      <Button
        variant="contained"
        sx={{ color: formatColor(neutral.white) }}
        onClick={() => useCastVote(id, 2, currentSigner!)}
      >
        Abstain
      </Button>
    </BaseModal>
  );
};
