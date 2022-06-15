import { useState } from 'react'
import { Button, Box } from '@mui/material'
import { VoteModal } from './proposal/VoteModal'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'

interface VoteButtonProps {
  status: number
  id: string
  totalVotes: number
  votingPower: number
}

const VoteButton = (props: VoteButtonProps) => {
  const { status, id, totalVotes, votingPower } = props

  const [open, setOpen] = useState(false)

  const { currentSigner } = useWeb3Context()
  return (
    <Box>
      {' '}
      <Button
        sx={{ height: 43 }}
        variant="contained"
        onClick={() => setOpen(true)}
        disabled={status !== 1}
      >
        Vote
      </Button>
      <VoteModal
        open={open}
        setOpen={setOpen}
        id={id}
        totalVotes={totalVotes}
        votingPower={votingPower}
        signer={currentSigner!}
      />
    </Box>
  )
}

export default VoteButton
