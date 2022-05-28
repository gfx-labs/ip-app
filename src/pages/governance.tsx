import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { ToolTipInfoIcon } from "../components/icons/misc/ToolTipInfoIcon";
import {useWeb3Context} from "../components/libs/web3-data-provider/Web3Provider";
import {
  ProposalCard,
} from "../components/util/governance/ProposalCard";
import {Spinner} from "../components/util/loading";
import { GovernanceToolTip } from "../components/util/tooltip/GovernanceToolTip";
import {getRecentProposals, useProposalCount, useProposalInfo} from "../hooks/useGovernance";


export interface Proposal {
  id: string;
  proposer: string;
  body: string;
  endBlock: number;
}

export const Governance = () => {
  const theme = useTheme();
  const {dataBlock, provider, chainId} = useWeb3Context()
  const [proposals, setProposals] = useState<Map<number,Proposal>>(new Map<number, Proposal>([]))
  useEffect(()=>{
    if(provider) {
      getRecentProposals(provider).then((pl)=>{
        pl.forEach((val)=>{
          proposals.set(val.args.id.toNumber(),{
            id: val.args.id.toString(),
            proposer: val.args.proposer,
            body: val.args.description,
            endBlock: val.args.endBlock.toNumber(),
          })
        })
        setProposals(new Map(proposals))
      }).catch((e)=>{
        console.log("failed to load proposal info", e)
      })
    }
  },[provider, dataBlock, chainId])

  return (
    <Box
      maxWidth="xl"
      py={{ xs: 7, sm: 0 }}
      px={{ xs: 2, md: 10 }}
      minHeight="80vh"
      margin="auto"
      position="relative"
      sx={{
        [theme.breakpoints.down("md")]: {
          mb: 0,
          pb: 0,
          marginLeft: "auto",
      },
      }}
    >
      <Box display="flex" mb={3} columnGap={2} rowGap={1} flexDirection={{xs: 'column', md: 'row'}}>
        <GovernanceToolTip
          title={
            <>
              <Typography variant="h3">Voting</Typography> <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Threshold: 40,000,000
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Qurourum Threshold: 20,000,000
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Voting Period: 5 days
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Timelock Period: 15 seconds
              </Typography>
            </>
          }
          text="Proposal Voting"
        />

        <GovernanceToolTip
          title={
            <>
              <Typography variant="h3">Emergency Voting</Typography> <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Voting Period: 1 day
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Qurourum Threshold: 20,000,000
              </Typography>{" "}
              <br />
              <Typography variant="body1" whiteSpace="nowrap">
                Timelock Period: 15 seconds
              </Typography>
            </>
          }
          text="Emergency Voting"
        />
      </Box>


      { proposals.size != 0 ?
        Array.from(proposals.values()).sort((a, b)=>{
        return Number(a.id) < Number(b.id) ? 1 : -1
      }).map((proposal, index) => (
        <Box key={index} mb={2}>
          <ProposalCard proposal={proposal} />
        </Box>
      )): <Spinner/>
      }
    </Box>
  );
};
