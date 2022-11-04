import { defaultAbiCoder } from '@ethersproject/abi'
import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppGovernanceContext } from '../components/libs/app-governance-provider/AppGovernanceProvider'
import { useWeb3Context } from '../components/libs/web3-data-provider/Web3Provider'
import { DelegateIPTButton } from '../components/util/button'
import { ProposalCard } from '../components/util/governance/ProposalCard'
import { Spinner } from '../components/util/loading'
import { getRecentProposals } from '../contracts/GovernorCharlieDelegate/getRecentProposals'
import { getUserVotingPower } from '../contracts/IPTDelegate'
import { getUserIPTBalance } from '../contracts/IPTDelegate/getUserIPTbalance'
import { BN } from '../easy/bn'

export interface Proposal {
  body: string
  id: string
  proposer: string
  endBlock: number
  startBlock: number
  transactionHash: string
  details: ProposalDetails[]
}

export interface ProposalDetails {
  target: string
  functionSig: string
  callData: string
}
const FOUR_BYTES_DIR: { [sig: string]: string } = {
  '0x5ef2c7f0': 'setSubnodeRecord(bytes32,bytes32,address,address,uint64)',
  '0x10f13a8c': 'setText(bytes32,string,string)',
  '0xb4720477': 'sendMessageToChild(address,bytes)',
}

const getProposalDetails = (details: any): ProposalDetails[] => {
  const proposalDetails = []

  for (let i = 0; i < details.targets.length; i++) {
    const signature = details.signatures[i]
    let calldata = details.calldatas[i]
    let name: string
    let types: string

    if (signature === '') {
      const fourbyte = calldata.slice(0, 10)
      const sig = FOUR_BYTES_DIR[fourbyte] ?? 'UNKNOWN()'
      if (!sig) throw new Error('Missing four byte sig')
      ;[name, types] = sig.substring(0, sig.length - 1).split('(')
      calldata = `0x${calldata.slice(10)}`
    } else {
      ;[name, types] = signature.substring(0, signature.length - 1).split('(')
    }
    const decoded = defaultAbiCoder.decode(types.split(','), calldata)

    proposalDetails.push({
      target: details.targets[i],
      functionSig: name,
      callData: decoded.join(', '),
    })
  }

  return proposalDetails
}

export const Governance = () => {
  const theme = useTheme()
  const {
    dataBlock,
    provider,
    chainId,
    connected,
    currentAccount,
    currentSigner,
    signerOrProvider,
  } = useWeb3Context()
  const {
    setNeedsToDelegate,
    setIptBalance,
    setCurrentVotes,
    currentVotes,
    iptBalance,
  } = useAppGovernanceContext()

  const [proposals, setProposals] = useState<Map<number, Proposal>>(
    new Map<number, Proposal>([])
  )

  const [noProposals, setNoProposals] = useState(false)

  useEffect(() => {
    if (signerOrProvider) {
      getRecentProposals(signerOrProvider)
        .then((pl) => {
          pl.forEach((val) => {
            proposals.set(val.args.id.toNumber(), {
              id: val.args.id.toString(),
              proposer: val.args.proposer,
              body: val.args.description,
              endBlock: val.args.endBlock.toNumber(),
              startBlock: val.args.startBlock.toNumber(),
              transactionHash: val.transactionHash,
              details: getProposalDetails(val.args),
            })
          })
          setProposals(new Map(proposals))
        })
        .catch((e) => {
          console.log('failed to load proposal info', e)
          setNoProposals(true)
        })
    }
    if (currentAccount && currentSigner) {
      getUserVotingPower(currentAccount, currentSigner!).then((res) => {
        const currentVotes = res.div(BN('1e16')).toNumber() / 100
        setCurrentVotes(currentVotes)

        if (currentVotes <= 0) {
          getUserIPTBalance(currentAccount, currentSigner!).then((response) => {
            const iptBalance = response.div(BN('1e16')).toNumber() / 100

            setNeedsToDelegate(iptBalance > 0)
            setIptBalance(iptBalance)
          })
        }
      })
    }
  }, [provider, dataBlock, chainId])

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
        <Box
          display="flex"
          mb={1}
          columnGap={2}
          rowGap={1}
          flexDirection={{ xs: 'column', md: 'row' }}
        ></Box>

        <Box display="flex" alignItems="center">
          <Typography
            color="text.secondary"
            variant="body2"
            whiteSpace="nowrap"
            mr={1.5}
          >
            Voting Power:{' '}
            {currentVotes.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <DelegateIPTButton iptBalance={iptBalance} />
        </Box>
      </Box>
      {connected ? (
        proposals.size != 0 ? (
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
            {noProposals ? (
              <Box>No Proposals available to show</Box>
            ) : (
              <Spinner />
            )}
          </Box>
        )
      ) : (
        <Box display="flex" justifyContent="center" mt="30vh">
          <Box>Please Connect a Wallet</Box>
        </Box>
      )}
    </Box>
  )
}
