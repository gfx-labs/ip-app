import { defaultAbiCoder } from '@ethersproject/abi'
import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppGovernanceContext } from '../components/libs/app-governance-provider/AppGovernanceProvider'
import { useWeb3Context } from '../components/libs/web3-data-provider/Web3Provider'
import getProposals, { Proposal } from '../components/util/api/getProposals'
import { DelegateIPTButton } from '../components/util/button'
import { ProposalCard } from '../components/util/governance/ProposalCard'
import { Spinner } from '../components/util/loading'
import { getUserVotingPower, getUserDelegates } from '../contracts/IPTDelegate'
import { getUserIPTBalance } from '../contracts/IPTDelegate/getUserIPTbalance'
import { BNtoDec } from '../easy/bn'

export const Governance = () => {
  const theme = useTheme()
  const { ethBlock: dataBlock, ethProvider: provider, chainId, currentAccount } = useWeb3Context()
  const { setDelegatedTo, setIptBalance, setCurrentVotes, currentVotes, iptBalance } = useAppGovernanceContext()

  const [proposals, setProposals] = useState<Map<number, Proposal>>(new Map<number, Proposal>([]))

  const [noProposals, setNoProposals] = useState(false)

  useEffect(() => {
    getProposals(chainId)
      .then((proposals) => {
        setProposals(new Map(proposals))
        if (proposals.size === 0) {
          setNoProposals(true)
        }
      })
      .catch((e) => {
        console.error(e)
        setNoProposals(true)
      })
    if (currentAccount && provider) {
      getUserVotingPower(currentAccount, provider).then((res) => {
        const currentVotes = BNtoDec(res)
        setCurrentVotes(currentVotes)
        getUserIPTBalance(currentAccount, provider).then((response) => {
          const iptBalance = BNtoDec(response)
          console.log("user ipt balance", currentAccount, iptBalance)
          setIptBalance(iptBalance)
          getUserDelegates(currentAccount, provider).then((delegatee) => {
            setDelegatedTo(delegatee)
          })
        })
      })
    }
  }, [provider,dataBlock, chainId])

  return (
    <Box
      maxWidth={980}
      pt={{ xs: 7, sm: 0 }}
      pb={{ xs: 1, md: 10 }}
      px={{ xs: 2, md: 10 }}
      minHeight="80vh"
      margin="auto"
      position="relative"
      sx={{
        [theme.breakpoints.down('md')]: {
          mb: 0,
          marginLeft: 'auto',
      },
      }}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" mb={1} columnGap={2} rowGap={1} flexDirection={{ xs: 'column', md: 'row' }}></Box>
        <Box display="flex" alignItems="center">
          <Typography color="text.secondary" variant="body2" whiteSpace="nowrap" mr={1.5}>
            Voting Power:{' '}
            {currentVotes.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <DelegateIPTButton iptBalance={iptBalance} />
        </Box>
      </Box>

      {proposals.size != 0 ? (
        Array.from(proposals.values())
        .sort((a, b) => {
          return Number(a.id) < Number(b.id) ? 1 : -1
        })
        .map((proposal, index) => (
          <Box key={index} mb={2}>
            <ProposalCard proposal={proposal} votingPower={currentVotes} />
          </Box>
        ))
      ) : (
        <Box display="flex" justifyContent="center" mt="30vh">
          {noProposals ? <Box>No Proposals available to show</Box> : <Spinner />}
        </Box>
      )}
    </Box>
  )
}
