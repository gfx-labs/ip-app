import { Typography, Button, Box } from "@mui/material";
import { BaseModal } from "../../modal";
import { formatColor, neutral, pink } from "../../../../theme";
import {
  useCastVote,
  getGovernorContract,
} from "../../../../hooks/useGovernance";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";
import { JsonRpcSigner } from "@ethersproject/providers";
import { useModalContext } from "../../../libs/modal-content-provider/ModalContentProvider";
import { ContractReceipt } from "ethers";
import { useState } from "react";

type VoteModalProps = {
  open: boolean;
  id: string;
  totalVotes: number;
  setOpen: (val: boolean) => void;
  signer: JsonRpcSigner;
};

export const VoteModal: React.FC<VoteModalProps> = (props: VoteModalProps) => {
  const { open, setOpen, id, totalVotes, signer } = props;
  const { updateTransactionState } = useModalContext();
  const [error, setError] = useState("");

  const useCastVote = async (id: string, vote: number) => {
    try {
      const contract = getGovernorContract(signer);

      const castVoteTransaction = await contract.castVote(id, vote);

      updateTransactionState(castVoteTransaction);

      const voteReceipt = await castVoteTransaction.wait();

      updateTransactionState(voteReceipt);
      setOpen(false);
      return voteReceipt;
    } catch (err) {
      const error = err as ContractReceipt;

      setError(JSON.parse(JSON.stringify(error)).reason);
      updateTransactionState(error);
    }
  };

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
        onClick={() => useCastVote(id, 1)}
      >
        Yes
      </Button>

      <Button
        variant="contained"
        sx={{
          color: formatColor(neutral.white),
          my: 2,
        }}
        onClick={() => useCastVote(id, 0)}
      >
        No
      </Button>

      <Button
        variant="contained"
        sx={{ color: formatColor(neutral.white) }}
        onClick={() => useCastVote(id, 2)}
      >
        Abstain
      </Button>
      {error.length > 1 ? (
        <Box textAlign="center" mt={2}>
          <Typography variant="body3" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <Box></Box>
      )}
    </BaseModal>
  );
};
