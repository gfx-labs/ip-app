import { useState } from 'react'
import { Button, Box, Typography } from '@mui/material'
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
        sx={{ height: 43, width: '100%', backgroundColor: 'button.vote' }}
        variant="contained"
        onClick={() => setOpen(true)}
        disabled={status !== 1}
      >
        <Typography variant="body1" lineHeight={1}>
          Vote
        </Typography>
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
