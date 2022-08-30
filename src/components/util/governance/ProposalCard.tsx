import { Box, Link, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { blue, formatColor, neutral, pink } from '../../../theme'
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
import { useLight } from '../../../hooks/useLight'
import { useParams } from 'react-router'
import { useRef } from 'react'

export interface ProposalCardProps {
  proposal: Proposal
  votingPower: number
}

export const ProposalCard = (props: ProposalCardProps) => {
  const { dataBlock, provider, currentSigner } = useWeb3Context()
  const { votingPower } = props
  const { id, body, endBlock, transactionHash } = props.proposal
  const isLight = useLight()
  const [expandedContent, setExpandedContent] = useState<string | undefined>(
    undefined
  )
  const param = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
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
      const abstainVotes = useFormatBNWithDecimals(proposal?.abstainVotes, 18)
      const forVotes = useFormatBNWithDecimals(proposal?.forVotes, 18)
      const againstVotes = useFormatBNWithDecimals(proposal?.againstVotes, 18)

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
      if (hrdiff >= 24) {
        setTimeLeft(`Voting Ended ${Math.floor(hrdiff / 24)} Days ago`)
      } else if (hrdiff > 1)
        setTimeLeft(`Voting Ended ${Math.floor(hrdiff)} Hour(s) ago`)
      else {
        setTimeLeft(`Voting Ended ${Math.floor(hrdiff * 60)} Minute(s) ago`)
      }
      return
    }
    if (hrdiff >= 24) {
      setTimeLeft(`Active for ${Math.floor(hrdiff / 24)} Days`)
    } else if (hrdiff > 1)
      setTimeLeft(`Active for ${Math.floor(hrdiff)} Hour(s)`)
    else {
      setTimeLeft(`Active for ${Math.floor(hrdiff * 60)} Minute(s)`)
    }
  }, [dataBlock])

  useEffect(() => {
    if (param.id === id) {
      setExpandedContent(body)
      setIsExpanded(true)

      setTimeout(() => {
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
      return
    }
    setIsExpanded(false)
  }, [param.id])

  const expandCard = () => {
    setIsExpanded(!isExpanded)
    setExpandedContent(body)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        borderRadius: 2,
        paddingX: { xs: 1, md: 4 },
        paddingY: 3,
        cursor: 'pointer',
        borderColor: formatColor(pink.pink1),
        borderWidth: 2,
        borderStyle: proposal?.emergency ? 'solid' : 'none',
      }}
      ref={ref}
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
            <Box>
              <Typography variant="subtitle2_semi" mr={2}>
                {getTitle(body)}
              </Typography>
            </Box>
            <Link
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                component="img"
                src={`images/etherscan-logo-${isLight ? 'dark' : 'light'}.svg`}
                width="12px"
                height="12px"
                position="relative"
                top={-4}
                mr={1}
              ></Box>
            </Link>
            {timeLeft ? (
              <Typography
                variant="label2_medium"
                color={formatColor(neutral.gray3)}
                position="relative"
                top={-6}
              >
                {timeLeft}
              </Typography>
            ) : (
              <Box></Box>
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
              <Box fontWeight={400}>
                <ReactMarkdown
                  children={expandedContent}
                  components={markdownComponentConfig}
                  remarkPlugins={[remarkGfm]}
                />
              </Box>
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
          padding: 8,
          ...style,
        }}
      >
        {children}
      </table>
    )
  },
  th: ({ node, style, children, ...props }) => {
    return (
      <th
        style={{
          border: '1px solid black',
          padding: 12,
          ...style,
        }}
      >
        {children}
      </th>
    )
  },
  p: ({ node, style, children, ...props }) => {
    return <p style={{ ...style, whiteSpace: 'pre-wrap' }}>{children}</p>
  },
  td: ({ node, style, children, isHeader, ...props }) => {
    if (isHeader) {
      return (
        <th
          style={{
            border: '1px solid black',
            padding: '12px',

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
          padding: 12,
          paddingTop: 8,
          paddingBottom: 8,
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
          padding: 8,
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
