import { Typography, Button, Box } from '@mui/material'
import { BaseModal } from '../../modal'
import { formatColor, neutral } from '../../../../theme'
import { JsonRpcSigner } from '@ethersproject/providers'
import { useModalContext } from '../../../libs/modal-content-provider/ModalContentProvider'
import { ContractReceipt } from 'ethers'
import { useState } from 'react'
import { useLight } from '../../../../hooks/useLight'
import { castVote } from '../../../../contracts/GovernorCharlieDelegate'

type VoteModalProps = {
  open: boolean
  id: string
  totalVotes: number
  votingPower: number
  setOpen: (val: boolean) => void
  signer: JsonRpcSigner
}

export const VoteModal: React.FC<VoteModalProps> = (props: VoteModalProps) => {
  const { open, setOpen, id, totalVotes, signer, votingPower } = props
  const { updateTransactionState } = useModalContext()
  const [error, setError] = useState('')
  const isLight = useLight()

  const castVoteHandler = async (vote: number) => {
    try {
      const castVoteTransaction = await castVote(id, vote, signer)

      updateTransactionState(castVoteTransaction)

      const voteReceipt = await castVoteTransaction.wait()

      updateTransactionState(voteReceipt)
      setOpen(false)
      return voteReceipt
    } catch (err) {
      const error = err as ContractReceipt

      setError(JSON.parse(JSON.stringify(error)).reason)
      updateTransactionState(error)
    }
  }

  return (
    <BaseModal open={open} withCloseButton setOpen={setOpen}>
      <Typography variant="h6_semi">Vote for Proposal {id}</Typography>
      <Box mt={1}>
        <Typography variant="label2_medium">
          {totalVotes.toLocaleString()} Votes Submitted
        </Typography>
      </Box>

      <Box my={2}>
        <Typography variant="body3">
          Your voting power: {votingPower.toLocaleString()}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ color: formatColor(neutral.white) }}
        onClick={() => castVoteHandler(1)}
      >
        Yes
      </Button>

      <Button
        variant="contained"
        sx={{
          backgroundColor: isLight
            ? formatColor(neutral.black)
            : formatColor(neutral.white),
          color: isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.black),
          my: 2,
        }}
        onClick={() => castVoteHandler(0)}
      >
        No
      </Button>

      <Button
        variant="text"
        sx={{ color: 'text.primary', paddingRight: 0 }}
        onClick={() => castVoteHandler(2)}
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
  )
}
