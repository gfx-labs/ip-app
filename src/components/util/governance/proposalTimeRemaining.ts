import { JsonRpcProvider } from '@ethersproject/providers'
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

export const proposalTimeRemaining = async (
  proposalType: Exclude<IProposalType, ''>,
  startingBlock: number,
  endingBlock: number,
  currentBlock: number,
  status: number,
  provider: JsonRpcProvider
) => {
  let blocksRemaining
  if (status === 0) {
    blocksRemaining = startingBlock - currentBlock

    return `Time remaining in review: ${getTimeRemaining(blocksRemaining)}`
  } else if (status === 1) {
    blocksRemaining = endingBlock - currentBlock

    return `Time remaining in voting: ${getTimeRemaining(blocksRemaining)}`
  } else if (status === 5) {
    const endingBlockTime = await provider.getBlock(endingBlock).then((res) => {
      const currentTimestamp = Date.now()
      const currentDate = new Date(res.timestamp)
      // console.log(currentDate)
      // milliseconds in 2 days
      const timelockPeriod = 172800
      return `Time remaining in queue: ${getTimeRemaining(
        (res.timestamp + timelockPeriod - currentTimestamp) / 13.5
      )}`
    })
    return endingBlockTime
  }
}

const getTimeRemaining = (blockDiff: number) => {
  const secs = blockDiff * 13.5

  const hrdiff = Math.abs(Math.round((100 * secs) / (60 * 60)) / 100)

  if (hrdiff >= 24) {
    return `${Math.floor(hrdiff / 24)} days`
  } else if (hrdiff > 1) {
    return `${Math.floor(hrdiff)} hours`
  } else {
    return `${Math.floor(hrdiff * 60)} minute(s)`
  }
}
