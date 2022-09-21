import { Box, Link, Skeleton, Typography } from '@mui/material'
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
import { COMMON_CONTRACT_NAMES } from '../../../constants'
import { getAddress } from 'ethers/lib/utils'
import { getProposalIsOptimisitc } from '../../../contracts/GovernorCharlieDelegate/getProposerWhiteListed'
import { proposalTimeRemaining } from './proposalTimeRemaining'
import { getPriorVotes } from '../../../contracts/IPTDelegate/getPriorVotes'

export interface ProposalCardProps {
  proposal: Proposal
  votingPower: number
}

export type IProposalType = '' | 'Standard' | 'Optimistic' | 'Emergency'

// returns the checksummed address if the address is valid, otherwise returns false
const isAddress = (value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export const ProposalCard = (props: ProposalCardProps) => {
  const { dataBlock, provider, currentSigner, currentAccount } =
    useWeb3Context()
  const { votingPower } = props
  const { id, body, endBlock, transactionHash, details, startBlock } =
    props.proposal
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

  const linkIfAddress = (content: string) => {
    if (isAddress(content.trim())) {
      const commonName = COMMON_CONTRACT_NAMES[content] ?? content
      return (
        <Link
          href={`https://etherscan.io/address/${content.trim()}`}
          target="_blank"
        >
          {commonName}
        </Link>
      )
    }
    return <span>{content}</span>
  }

  const [proposal, setProposal] = useState<ProposalInfo>()
  const [status, setStatus] = useState(0)
  const [timeLeft, setTimeLeft] = useState('')
  const [forVotes, setForVotes] = useState(0)
  const [abstainVotes, setAbstainVotes] = useState(0)
  const [againstVotes, setAgainstVotes] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [proposalType, setProposalType] = useState<IProposalType>('')
  const [hasPriorVotes, setHasPriorVotes] = useState(false)

  useEffect(() => {
    const signerOrProvider = currentSigner ? currentSigner : provider

    getProposalInfo(id, signerOrProvider!).then((res) => {
      getProposalIsOptimisitc(res.proposer, signerOrProvider!).then(
        (isWhitelisted) => {
          const pType = isWhitelisted
            ? 'Optimistic'
            : res.emergency
            ? 'Emergency'
            : 'Standard'

          setProposalType(pType)
        }
      )

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
    setIsActive(secs > 0)

    if (bdiff < 0) {
      provider?.getBlock(endBlock).then((res) => {
        const endDate = new Date(res.timestamp * 1000)
        setTimeLeft(`Voting Ended on ${endDate.toLocaleDateString()}`)
      })
      return
    }

    if (proposalType && status && provider) {
      proposalTimeRemaining(
        proposalType,
        startBlock,
        endBlock,
        dataBlock,
        status,
        provider
      ).then((res) => setTimeLeft(res))
    }

    if (status === 1 && currentSigner) {
      getPriorVotes(currentAccount, startBlock, currentSigner).then((res) => {
        if (!res.isZero) {
          setHasPriorVotes(true)
        } else {
          setHasPriorVotes(false)
        }
      })
    }
  }, [dataBlock, proposalType])

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
        paddingTop: 3,
        paddingBottom: 1,
        cursor: 'pointer',
        borderColor: formatColor(pink.pink1),
        borderWidth: 2,
        borderStyle: proposal?.emergency && isActive ? 'solid' : 'none',
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
              <Skeleton
                variant="rectangular"
                width={200}
                height="14px"
                animation="wave"
                sx={{
                  top: -6,
                  position: 'relative',
                  display: 'inline-block',
                }}
              />
            )}
          </Box>
        </Box>

        <Box display="flex">
          <Box display={{ xs: 'none', md: 'flex' }}>
            <Votes noVotes={againstVotes} yesVotes={forVotes} />
          </Box>
          <Box textAlign="center">
            <Status status={status} />
            <Typography color="text.secondary" variant="label2_medium">
              {proposalType}
            </Typography>
          </Box>
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
              <Box>
                {details.map((d, i) => (
                  <Box
                    sx={{
                      wordBreak: 'break-all',
                      mb: 1,
                      fontSize: 16,
                      fontWeight: 400,
                    }}
                    key={i}
                  >
                    {i + 1}: {linkIfAddress(d.target)}.{d.functionSig}(
                    {d.callData.split(',').map((content, i) => {
                      return (
                        <span key={i}>
                          {linkIfAddress(content)}
                          {d.callData.split(',').length - 1 === i ? '' : ','}
                        </span>
                      )
                    })}
                    )
                  </Box>
                ))}
              </Box>
              <Box
                display="flex"
                alignItems={{ xs: 'start', md: 'center' }}
                rowGap={1}
              >
                {status === 1 && (
                  <VoteButton
                    isOptimistic={proposalType === 'Optimistic'}
                    id={id}
                    status={status}
                    totalVotes={totalVotes}
                    votingPower={votingPower}
                    hasPriorVotes={hasPriorVotes}
                  />
                )}
              </Box>

              <ProposalDetails id={id} />
              <Box fontWeight={400}>
                <ReactMarkdown
                  children={expandedContent}
                  components={markdownComponentConfig}
                  remarkPlugins={[remarkGfm]}
                />
              </Box>
              {status === 1 && (
                <VoteButton
                  isOptimistic={proposalType === 'Optimistic'}
                  id={id}
                  status={status}
                  votingPower={votingPower}
                  totalVotes={totalVotes}
                  hasPriorVotes={hasPriorVotes}
                />
              )}
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
