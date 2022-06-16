import { Box, Link, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useLight } from '../../../hooks/useLight'
import { blue, formatColor, neutral, pink, theme } from '../../../theme'
import { Votes } from './Votes'
import { Status } from './Status'
import { Spinner } from '../loading'

import ReactMarkdown from 'react-markdown'
import { NormalComponents } from 'react-markdown/lib/complex-types'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import remarkGfm from 'remark-gfm'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import ProposalDetails from './proposal'
import { Proposal } from '../../../pages/governance'
import { useFormatBNWithDecimals } from '../../../hooks/useFormatBNWithDecimals'
import VoteButton from './VoteButton'
import {
  getProposalInfo,
  ProposalInfo,
  getProposalState,
} from '../../../contracts/GovernorCharlieDelegate'

export interface ProposalCardProps {
  proposal: Proposal
  votingPower: number
}

export const ProposalCard = (props: ProposalCardProps) => {
  const { dataBlock, provider, currentSigner } = useWeb3Context()
  const { votingPower } = props
  const { id, proposer, body, endBlock } = props.proposal

  const isLight = useLight()
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedContent, setExpandedContent] = useState<string | undefined>(
    undefined
  )

  const getTitle = (body: string) => {
    const splitBody = body.split('\n')
    let title = splitBody.find((n) => n[0] === '#')
    if (title !== undefined) {
      title = title.substring(1)
    } else {
      title = splitBody[0].replace(/[#]/g, '')
    }

    return title
  }
  const [proposal, setProposal] = useState<ProposalInfo>()

  const [status, setStatus] = useState(0)

  const [timeLeft, setTimeLeft] = useState('')
  const [forVotes, setForVotes] = useState(0)
  const [abstainVotes, setAbstainVotes] = useState(0)
  const [againstVotes, setAgainstVotes] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)
  useEffect(() => {
    const signerOrProvider = currentSigner ? currentSigner : provider

    getProposalInfo(id, signerOrProvider!).then((res) => {
      setProposal(res)
    })

    getProposalState(id, signerOrProvider!).then((res) => {
      setStatus(res)
    })
  }, [id])

  useEffect(() => {
    if (proposal) {
      const abstainVotes = useMemo(
        () => useFormatBNWithDecimals(proposal?.abstainVotes, 18),
        [proposal?.abstainVotes]
      )
      const forVotes = useMemo(
        () => useFormatBNWithDecimals(proposal?.forVotes, 18),
        [proposal?.forVotes]
      )
      const againstVotes = useMemo(
        () => useFormatBNWithDecimals(proposal?.againstVotes, 18),
        [proposal?.againstVotes]
      )
      const totalVotes = abstainVotes + forVotes + againstVotes
      setAbstainVotes(abstainVotes)
      setAgainstVotes(againstVotes)
      setForVotes(forVotes)
      setTotalVotes(totalVotes)
    }
  }, [proposal])

  useEffect(() => {
    const bdiff = endBlock - dataBlock
    const secs = bdiff * 13.5
    const hrdiff = Math.abs(Math.round((100 * secs) / (60 * 60)) / 100)
    if (bdiff < 0) {
      setTimeLeft(`Voting Ended ${hrdiff} Hour(s) ago`)
      return
    }
    setTimeLeft(`Active for ${hrdiff} Hour(s)`)
  }, [dataBlock])

  const expandCard = () => {
    setIsExpanded(!isExpanded)
    setExpandedContent(body)
  }

  return (
    <Box
      sx={{
        backgroundColor: isLight
          ? formatColor(neutral.white)
          : formatColor(neutral.gray7),
        borderRadius: 2,
        paddingX: { xs: 1, md: 4 },
        paddingY: 3,
        cursor: 'pointer',
        borderColor: formatColor(pink.pink1),
        borderWidth: 2,
        borderStyle: proposal?.emergency ? 'solid' : 'none',
      }}
    >
      <Box onClick={expandCard} display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="start">
          <Typography
            variant="subtitle2_semi"
            color={formatColor(blue.blue1)}
            mr={2}
          >
            {id}
          </Typography>
          <Box position="relative">
            <Typography display="block" variant="subtitle2_semi">
              {getTitle(body)}
            </Typography>
            {timeLeft ? (
              <Typography
                variant="label2_medium"
                color={formatColor(neutral.gray3)}
                position="relative"
                top={-10}
              >
                {timeLeft}
              </Typography>
            ) : (
              <Box height="8px"></Box>
            )}
          </Box>
        </Box>

        <Box display="flex">
          <Box display={{ xs: 'none', md: 'flex' }}>
            <Votes noVotes={againstVotes} yesVotes={forVotes} />
          </Box>
          <Status status={status} />
        </Box>
      </Box>

      {isExpanded ? (
        <Box
          sx={{
            marginTop: 3,
            cursor: 'auto',
          }}
        >
          {expandedContent ? (
            <Box>
              <ProposalDetails
                id={id}
                status={status}
                votingPower={votingPower}
                time={timeLeft}
              />
              <ReactMarkdown
                children={expandedContent}
                components={markdownComponentConfig}
                remarkPlugins={[remarkGfm]}
              />
              <VoteButton
                id={id}
                status={status}
                votingPower={votingPower}
                totalVotes={totalVotes}
              />
            </Box>
          ) : (
            <Spinner />
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  )
}

const markdownComponentConfig: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  a: ({ node, style, children, ...props }) => {
    return (
      <Link
        {...props}
        style={{
          ...style,
        }}
      >
        {children}
      </Link>
    )
  },
  table: ({ node, style, children, ...props }) => {
    return (
      <table
        {...props}
        style={{
          borderRadius: 10,
          backgroundColor: '#fcfcfc',
          color: '#303030',
          border: '1px solid black',
          borderCollapse: 'collapse',
          ...style,
        }}
      >
        {children}
      </table>
    )
  },
  td: ({ node, style, children, isHeader, ...props }) => {
    if (isHeader) {
      return (
        <th
          style={{
            border: '1px solid black',
            padding: '2px',
            paddingRight: '4px',
            paddingLeft: '4px',
            ...style,
          }}
        >
          {children}
        </th>
      )
    }
    return (
      <td
        style={{
          border: '1px solid black',
          padding: '2px',
          paddingRight: '4px',
          paddingLeft: '4px',
          ...style,
        }}
      >
        {children}
      </td>
    )
  },
  tr: ({ node, style, children, isHeader, ...props }) => {
    return (
      <tr
        {...props}
        style={{
          border: '1px solid black',
          ...style,
        }}
      >
        {children}
      </tr>
    )
  },
  img: ({ node, ...props }) => {
    return (
      <img
        {...props}
        style={{
          width: '25%',
        }}
      ></img>
    )
  },
  pre: ({ node, ...props }) => {
    return (
      <pre
        {...props}
        style={{
          border: '1px solid #CCCCCC',
          borderRadius: 3,
          backgroundColor: '#fafafa',
          color: '#303030',
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          margin: '1em 0',
          overflow: 'auto',
          padding: '6px 10px',
        }}
      ></pre>
    )
  },
  code: ({ node, inline, className, children, ...props }) => {
    return (
      <code
        className={className}
        {...props}
        style={{
          fontFamily: 'monospace',
          borderRadius: 3,
          backgroundColor: '#fafafa',
          color: '#303030',
          border: inline ? '1px solid #EAEAEA' : 'none',
        }}
      >
        {children}
      </code>
    )
  },
}
