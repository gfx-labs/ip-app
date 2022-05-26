import { ModalProps, Typography, Button, Box } from '@mui/material';
import { BaseModal } from '../../components/util/modal';
import { formatColor, neutral } from '../../theme';

type VoteModalProps = {
  open: boolean,
  id: number,
  totalVotes: number,
  setOpen: (val: boolean) => void;
}

export const VoteModal = (props: VoteModalProps) => {
  const {open, setOpen, id, totalVotes } = props;

  return (
    <BaseModal open={open} withCloseButton setOpen={setOpen}>
      <Typography variant="h2">Vote for Proposal {id}</Typography>
      <Box my={2}>

      <Typography variant="body1">{totalVotes.toLocaleString()} Votes</Typography>
      </Box>

      <Button variant="contained" sx={{color:formatColor(neutral.white)}}>Vote</Button>
    </BaseModal>
  )
}
