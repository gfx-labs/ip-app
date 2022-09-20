import { useState } from 'react'
import { Button, Box, Typography } from '@mui/material'
import { VoteModal } from './proposal/VoteModal'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { useModalContext, ModalType } from '../../libs/modal-content-provider/ModalContentProvider'
import { useAppGovernanceContext } from '../../libs/app-governance-provider/AppGovernanceProvider'

interface VoteButtonProps {
  status: number
  id: string
  totalVotes: number
  votingPower: number
  isOptimistic: boolean
}

const VoteButton = (props: VoteButtonProps) => {
  const { id, totalVotes, votingPower, isOptimistic } = props

  const [open, setOpen] = useState(false)

  const { currentSigner } = useWeb3Context()
  const {setType } = useModalContext()
  const {needsToDelegate} = useAppGovernanceContext()

  const handleVoteClick = () => {
    if(needsToDelegate) {
      setType(ModalType.DelegateIPT)
    } else {
      setOpen(true)
    }
  }

  return (
    <Box>
      {' '}
      <Button
        sx={{ height: 43, width: '100%', backgroundColor: 'button.vote' }}
        variant="contained"
        onClick={handleVoteClick}
        disabled={votingPower <= 0 && !needsToDelegate }
      >
        <Typography variant="body1" lineHeight={1}>
          Vote
        </Typography>
      </Button>
      <VoteModal
        isOptimistic={isOptimistic}
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
