import { Typography, Button, Box } from '@mui/material'
import { BaseModal } from '../../modal'
import { formatColor, neutral } from '../../../../theme'
import { JsonRpcSigner } from '@ethersproject/providers'
import { useModalContext } from '../../../libs/modal-content-provider/ModalContentProvider'
import { ContractReceipt } from 'ethers'
import { useState } from 'react'
import { castVote } from '../../../../contracts/GovernorCharlieDelegate'

type VoteModalProps = {
  open: boolean
  id: string
  totalVotes: number
  votingPower: number
  setOpen: (val: boolean) => void
  signer: JsonRpcSigner
  isOptimistic: boolean
}

export const VoteModal: React.FC<VoteModalProps> = (props: VoteModalProps) => {
  const { open, setOpen, id, totalVotes, signer, votingPower, isOptimistic = false } = props
  const { updateTransactionState } = useModalContext()
  const [error, setError] = useState('')

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

      setError(JSON.parse(JSON.stringify(error)).message)
      updateTransactionState(error)
    }
  }

  return (
    <BaseModal open={open} withCloseButton setOpen={setOpen}>
      <Typography variant="h6_semi">Vote for Proposal {id} {isOptimistic ? '- Optimistic' : ''}</Typography>
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
        sx={{ color: formatColor(neutral.white), display: isOptimistic ? 'none' : 'block' }}
        onClick={() => castVoteHandler(1)}
      >
        For
      </Button>

      <Button
        variant="contained"
        sx={{
          backgroundColor: 'misc.blackWhite',
          color: 'misc.whiteBlack',
          my: 2,
        }}
        onClick={() => castVoteHandler(0)}
      >
        Against
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
