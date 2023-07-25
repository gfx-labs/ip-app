import { GOV_PROPOSAL_VOTE_CAST_EVENTS} from '../../../constants'
import axios from 'axios'
import { VITE_ANALYTICS_URL } from '../../../config'

export interface ProposalVoteCastEvent {
  Block: number
  Transaction: string
  TransactionIndex: number
  Voter: string
  ProposalId: number
  Support: number // 1 = for, 0 = against, 2 = abstain
  Votes: string
  Reason: string
}

const getProposalVoteCastEvents = async (url: string) => {
  try {
    const proposalsUrl = `${VITE_ANALYTICS_URL(url)}${GOV_PROPOSAL_VOTE_CAST_EVENTS}`

    const response = await axios.get(proposalsUrl)
    return response.data as ProposalVoteCastEvent[]
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export default getProposalVoteCastEvents
