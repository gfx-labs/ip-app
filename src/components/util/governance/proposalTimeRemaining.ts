import { IProposalType } from './ProposalCard'

const proposalTimes = {
  standard: {
    pending: 13140,
    voting: 40320,
  },
  emergency: {
    pending: null,
    voting: 6570,
  },
  optimistic: {
    pending: 25600,
    voting: 40320,
  },
} as {
  [K in Exclude<IProposalType, ''>]: { pending: number | null; voting: number }
}

export const proposalTimeRemaining = (
  proposalType: Exclude<IProposalType, ''>,
  startingBlock: number,
  endingBlock: number,
  currentBlock: number
) => {
  const proposalPeriods = proposalTimes[proposalType]

  const blockDiff = currentBlock - startingBlock
  let blocksRemaining
  const votingPeriod = proposalPeriods.voting + (proposalPeriods.pending || 0)
  if (proposalPeriods.pending && blockDiff < proposalPeriods.pending) {
    blocksRemaining = proposalPeriods.pending - blockDiff
  } else if (blockDiff < votingPeriod) {
    blocksRemaining = votingPeriod - blockDiff
  } else {
    blocksRemaining = endingBlock - currentBlock
  }

  return getTimeRemaining(blocksRemaining)
}

const getTimeRemaining = (blockDiff: number) => {
  const secs = blockDiff * 13.5

  const hrdiff = Math.abs(Math.round((100 * secs) / (60 * 60)) / 100)

  if (hrdiff >= 24) {
    return `Time Remaining: ${Math.floor(hrdiff / 24)} days`
  } else if (hrdiff > 1) {
    return `Time Remaining: ${Math.floor(hrdiff)} hours`
  } else {
    return `Time Remaining: ${Math.floor(hrdiff * 60)} minute(s)`
  }
}
