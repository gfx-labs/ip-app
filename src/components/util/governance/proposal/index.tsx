import { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { formatColor, neutral } from '../../../../theme'
import { VoteCount, Voter } from './VoteCount'
import { useWeb3Context } from '../../../libs/web3-data-provider/Web3Provider'
import { BNtoDec } from '../../../../easy/bn'
import { getProposalVoters } from '../../../../contracts/GovernorCharlieDelegate/getProposalVoters'
import { IProposalType } from '../ProposalCard'

export interface ProposalDetailsProps {
  id: string
  proposalType?: IProposalType
}

const totalVotesDependentOnType = (proposalType: IProposalType) => {
  switch (proposalType) {
    case 'optimistic':
      return { for: 0, against: 2500000 }
    case 'emergency':
      return { for: 10000000, against: 10000000 }
    case 'standard':
      return { for: 10000000, against: 10000000 }
  }
}

const ProposalDetails: React.FC<ProposalDetailsProps> = ({
  id,
  proposalType = 'standard',
}: ProposalDetailsProps) => {
  const theme = useTheme()
  const { provider, currentSigner } = useWeb3Context()

  const voters: Map<string, Voter> = new Map()
  const [votersFor, setVotersFor] = useState<Array<Voter>>([])
  const [votersBad, setVotersBad] = useState<Array<Voter>>([])

  const votesTotal = totalVotesDependentOnType(proposalType)

  useEffect(() => {
    const signerOrProvider = currentSigner ? currentSigner : provider

    if (signerOrProvider) {
      getProposalVoters(id, signerOrProvider!).then((px) => {
        px.map((p) => {
          voters.set(p.voter, {
            address: p.voter,
            votingPower: BNtoDec(p.votes),
            direction: p.support,
          })
        })
        const vfor: Array<Voter> = []
        const vbad: Array<Voter> = []
        const vpea: Array<Voter> = []
        voters.forEach((v) => {
          switch (v.direction) {
            case 0:
              vbad.push(v)
              break
            case 1:
              vfor.push(v)
              break
            case 2:
              vpea.push(v)
              break
          }
        })
        setVotersFor(vfor)
        setVotersBad(vbad)
      })
    }
  }, [provider])

  return (
    <Box
      color={formatColor(neutral.black)}
      textAlign="left"
      maxWidth="xl"
      margin="auto"
      position="relative"
      sx={{
        [theme.breakpoints.down('md')]: {
          mb: 0,
          marginLeft: 'auto',
        },
      }}
    >
      <Box
        display="flex"
        columnGap={2}
        mt={3}
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <VoteCount
          forOrAgainst="For"
          votes={votersFor.reduce((a, b) => (a += b.votingPower), 0)}
          totalVotes={votesTotal.for}
          voters={votersFor}
        />
        <VoteCount
          forOrAgainst="Against"
          votes={votersBad.reduce((a, b) => (a += b.votingPower), 0)}
          totalVotes={votesTotal.against}
          voters={votersBad}
        />
      </Box>
    </Box>
  )
}

export default ProposalDetails
