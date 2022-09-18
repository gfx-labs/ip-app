import { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { formatColor, neutral } from '../../../../theme'
import { VoteCount, Voter } from './VoteCount'
import { useWeb3Context } from '../../../libs/web3-data-provider/Web3Provider'
import { BN } from '../../../../easy/bn'
import VoteButton from '../VoteButton'
import { getProposalVoters } from '../../../../contracts/GovernorCharlieDelegate/getProposalVoters'

export interface ProposalDetailsProps {
  id: string
  status: number
  votingPower: number
  time: string
  isOptimistic: boolean
}

const ProposalDetails: React.FC<ProposalDetailsProps> = (
  props: ProposalDetailsProps
) => {
  const theme = useTheme()
  const { provider, currentSigner } = useWeb3Context()
  const { id, status, votingPower, isOptimistic = false } = props

  const [voters, setVoters] = useState<Map<string, Voter>>(new Map())
  const [votersFor, setVotersFor] = useState<Array<Voter>>([])
  const [votersBad, setVotersBad] = useState<Array<Voter>>([])

  const [votesTotal, setVotesTotal] = useState(0)

  useEffect(() => {
    const signerOrProvider = currentSigner ? currentSigner : provider

    if (signerOrProvider) {
      getProposalVoters(id, signerOrProvider!).then((px) => {
        px.map((p) => {
          voters.set(p.voter, {
            address: p.voter,
            votingPower: p.votes.div(BN('1e16')).toNumber() / 100,
            direction: p.support,
          })
        })
        const vfor: Array<Voter> = []
        const vbad: Array<Voter> = []
        const vpea: Array<Voter> = []
        let total = 0
        voters.forEach((v) => {
          total = total + v.votingPower
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
        setVotesTotal(total)
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
      py={{ xs: 7, sm: 0 }}
      margin="auto"
      position="relative"
      sx={{
        [theme.breakpoints.down('md')]: {
          mb: 0,
          pb: 0,
          pt: 2,
          marginLeft: 'auto',
        },
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'start', md: 'center' }}
        rowGap={1}
      >
        {status === 1 && (
          <VoteButton
          isOptimistic={isOptimistic}
            id={id}
            status={status}
            totalVotes={votesTotal}
            votingPower={votingPower}
          />
        )}

        {/* <Typography color={formatColor(neutral.gray10)} variant="body2_semi">
          {time}
        </Typography> */}
      </Box>
      <Box
        display="flex"
        columnGap={2}
        mt={4}
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <VoteCount
          forOrAgainst="For"
          votes={votersFor.reduce((a, b) => {
            return a + b.votingPower
          }, 0)}
          totalVotes={votesTotal}
          voters={votersFor}
        />
        <VoteCount
          forOrAgainst="Against"
          votes={votersBad.reduce((a, b) => {
            return a + b.votingPower
          }, 0)}
          totalVotes={votesTotal}
          voters={votersBad}
        />
      </Box>
    </Box>
  )
}

export default ProposalDetails
