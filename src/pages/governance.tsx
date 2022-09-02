import { defaultAbiCoder } from '@ethersproject/abi'
import { Box, Typography, useTheme, Button } from '@mui/material'
import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import {
  useModalContext,
  ModalType,
} from '../components/libs/modal-content-provider/ModalContentProvider'
import { useWeb3Context } from '../components/libs/web3-data-provider/Web3Provider'
import { ProposalCard } from '../components/util/governance/ProposalCard'
import { BNtoHexNumber } from '../components/util/helpers/BNtoHex'
import { Spinner } from '../components/util/loading'
import { ToolTip } from '../components/util/tooltip/ToolTip'
import { getRecentProposals } from '../contracts/GovernorCharlieDelegate/getRecentProposals'
import { getUserVotingPower } from '../contracts/IPTDelegate'
import { BN } from '../easy/bn'

export interface Proposal {
  body: string
  id: string
  proposer: string
  endBlock: number
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

const TooltipValue = ({
  text,
  mleft = true,
}: {
  text: string
  mleft?: boolean
}) => (
  <Box
    component="span"
    sx={{ ml: mleft ? 1 : 0, fontWeight: 400, color: 'text.secondary' }}
  >
    {text}
  </Box>
)

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
  const { setType } = useModalContext()
  const [proposals, setProposals] = useState<Map<number, Proposal>>(
    new Map<number, Proposal>([])
  )

  const [currentVotes, setCurrentVotes] = useState(0)

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
      })
    }
  }, [provider, dataBlock, chainId])


  return (
    <Box
      maxWidth="xl"
      py={{ xs: 7, sm: 0 }}
      px={{ xs: 2, md: 10 }}
      minHeight="80vh"
      margin="auto"
      position="relative"
      sx={{
        [theme.breakpoints.down('md')]: {
          mb: 0,
          pb: 0,
          marginLeft: 'auto',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          mb={1}
          columnGap={2}
          rowGap={1}
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <ToolTip
            content={
              <>
                <Typography variant="subtitle1" color="text.primary">
                  Standard Voting
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Proposal Threshold:
                  <TooltipValue text="1,000,000" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Quorum Threshold:
                  <TooltipValue text="10,000,000" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Review Period:
                  <TooltipValue text="13140 blocks" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Voting Period:
                  <TooltipValue text="40320 blocks" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Timelock Period:
                  <TooltipValue text="2 days " />
                </Typography>
              </>
            }
            text="Standard"
            text_variant="body2_semi"
          />

          <ToolTip
            content={
              <>
                <Typography variant="subtitle1" color="text.primary">
                  Optimistic Voting
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Proposal Threshold: <br />
                  <TooltipValue mleft={false} text="Governance Whitelist" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Quorum Threshold:
                  <TooltipValue text="2,000,000" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Review Period:
                  <TooltipValue text="25600 blocks" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Voting Period: <TooltipValue text="40320 blocks" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Timelock Period: <TooltipValue text="2 days " />
                </Typography>
              </>
            }
            text="Optimistic"
            text_variant="body2_semi"
          />

          <ToolTip
            content={
              <>
                <Typography variant="subtitle1" color="text.primary">
                  Emergency Voting
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Proposal Threshold: <TooltipValue text="1,000,000" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Quorum Threshold: <TooltipValue text="50,000,000" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Voting Period: <TooltipValue text="6570 blocks" />
                </Typography>{' '}
                <br />
                <Typography variant="body3" whiteSpace="nowrap">
                  Timelock Period: <TooltipValue text="2 days " />
                </Typography>
              </>
            }
            text="Emergency"
            text_variant="body2_semi"
          />
        </Box>

        <Box display="flex" alignItems="center">
          <Typography variant="label2" whiteSpace="nowrap" mr={1}>
            Voting Power:{' '}
            {currentVotes.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <Button
            variant="text"
            sx={{ px: 2 }}
            onClick={() => setType(ModalType.DelegateIPT)}
          >
            Delegate
          </Button>
        </Box>
      </Box>
      {connected?(
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
