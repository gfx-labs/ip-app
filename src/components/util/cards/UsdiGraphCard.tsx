import { Box, Typography, useTheme } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatGradient, formatColor, neutral, gradient } from "../../../theme";
import * as d3 from 'd3'
import MultilineChart, {Observation} from "./UsdiGraphGraph";
import {useRolodexContext} from "../../libs/rolodex-data-provider/RolodexDataProvider";
import {useCallback, useEffect, useState} from "react";
import {BN} from "../../../easy/bn";
import {useWeb3Context} from "../../libs/web3-data-provider/Web3Provider";
import {Spinner, WithSpinner} from "../loading";
import {InterestEventEvent} from "../../../chain/contracts/lending/VaultController";
import {DonationEvent} from "../../../chain/contracts/USDI";

export const UsdiGraphCard = () => {
  const isLight = useLight();
  const theme = useTheme();
  const rolodex = useRolodexContext();
  const {dataBlock, provider} = useWeb3Context()

  const [data, setData] = useState<Map<number, Observation>>(new Map<number, Observation>())

  const [chart, setChart] = useState<JSX.Element | undefined>(undefined)

  const [lastRate, setLastRate] = useState(0)
  const [lastPaid, setLastPaid] = useState(0)
  const [lastBlock, setLastBlock] = useState(0)
  const [lastTime, setLastTime] = useState("")

  const [queryLimit, setQueryLimit] = useState(0)
  const HISTORY_MAX = 10
  const [queryHistory, setQueryHistory] = useState(0)

  const addData = async (o:Observation)=>{
    if(!o.timestamp){
      await provider?.getBlock(o.block).then((b)=>{
        o.timestamp = b.timestamp * 1000
      })
    }
    if(data.has(o.block)){
      let n = data.get(o.block)
      if(o.interestPaid && n){
        n.interestPaid = o.interestPaid
      }
      if(o.interestRate && n) {
        n.interestRate = o.interestRate
      }
      o = n!
    }
    data.set(o.block, o)
  }

  const temp = new Map<number, Observation>()
  const addInterestEvents = (xs:InterestEventEvent[]) =>{
    xs.forEach((event:InterestEventEvent) =>{
      if(!temp.has(event.blockNumber)) {
        temp.set(event.blockNumber, {block:event.blockNumber})
      }
      temp.get(event.blockNumber)!.interestRate = event.args[2].div(BN("1e14")).toNumber()/100
    })
  }
  const addDonateEvents = (xs:DonationEvent[]) =>{
    xs.forEach((event:DonationEvent) =>{
      if(!temp.has(event.blockNumber)) {
        temp.set(event.blockNumber, {block:event.blockNumber})
      }
      temp.get(event.blockNumber)!.interestPaid = event.args[1].div(BN("1e14")).toNumber()/10000
    })
  }

  useEffect(()=>{
    const startBlock = ((queryLimit == 0) ? undefined : dataBlock - queryLimit)
    if(rolodex && rolodex.VC && queryLimit == 0){
      const getRates = rolodex.VC.queryFilter(rolodex.VC.filters.InterestEvent(), startBlock, dataBlock).then(addInterestEvents)
      const getPays = rolodex.USDI.queryFilter(rolodex.USDI.filters.Donation(), startBlock, dataBlock).then(addDonateEvents)
      Promise.all([getRates, getPays]).then(()=>{
        for(const [k, v] of temp.entries()) {
          addData(v)
        }
        temp.clear()
      }).catch((e)=>{
        if(e.data && e.data.message) {
          const msg = e.data.message as string
          if(msg.includes("limited")) {
            setQueryLimit(8000)
            return
          }
        }
        console.log("error getting data", e)
      })
    }
  },[rolodex, dataBlock])

  useEffect(()=>{
    if(rolodex && rolodex.VC && queryLimit > 0 && queryHistory < HISTORY_MAX ){
      const from = dataBlock - (1+queryHistory) * queryLimit
      const to = dataBlock - queryHistory * queryLimit
      console.log(from,to)
      const getRates = rolodex.VC.queryFilter(
        rolodex.VC.filters.InterestEvent(),
        from,to
      ).then(addInterestEvents)
      const getPays = rolodex.USDI.queryFilter(
        rolodex.USDI.filters.Donation(),
        from,to
      ).then(addDonateEvents)
      Promise.all([getRates, getPays]).then(()=>{
        for(const [k, v] of temp.entries()) {
          addData(v)
        }
        setQueryHistory(queryHistory + 1)
        temp.clear()
      }).catch((e)=>{
        setQueryHistory(HISTORY_MAX)
        if(e.data && e.data.message) {
          const msg = e.data.message as string
          if(msg.includes("limited")) {
            if(queryLimit > 100) {
              setQueryLimit(queryLimit / 2)
            }else{
              setQueryLimit(-1)
            }
            return
          }
        }
        console.log("error getting smaller data with max", e, queryHistory)
      })
    }
  },[rolodex, dataBlock, queryHistory, queryLimit])






  useEffect(()=>{
    if(data.size > 4) {
      setChart(<MultilineChart
        datamap={data}
        width={400}
        height={200}
        margin={{top:20,right:5,bottom:30,left:0}}
        setLastRate={setLastRate}
        setLastPaid={setLastPaid}
        setLastTime={setLastTime}
        setLastBlock={setLastBlock}
      />)
    }
  },[data.size])


  return (
    <Box
      sx={{
        paddingX: {xs: 3, md: 6},
      paddingY: {xs: 6, md: 6},
      paddingBottom: {xs: 2, md: 2},
      backgroundImage: `linear-gradient(${formatGradient(
        isLight ? gradient.gradient1 : gradient.gradient2
      )})`,
      borderRadius: {xs: 5, md: 17},
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{marginTop: -1}}>
          <Box sx={{ display: "flex", alignItems: "center", }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                background: "#6929F0",
                borderRadius: 0.5,
                marginRight: 1,
              }}
            ></Box>{" "}
            <GraphTypography text={`Interest Rate (${lastRate}%)`} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                background: "#AFEABC",
                borderRadius: 0.5,
                marginRight: 1,
              }}
            ></Box>{" "}
            <GraphTypography text={`Interest Paid ($${lastPaid})`} />
          </Box>
        </Box>
        <Box sx={{marginTop: -1}}>
          <Box display="flex" sx={{
            display: 'flex',
            [theme.breakpoints.down('md')]:{
              flexDirection: 'column',
              rowGap: 1,
              marginTop: -1
            }
            }}>
            <GraphTypography text={`Block #${lastBlock}`}/>
          </Box>
          <Box display="flex" sx={{
            display: 'flex',
            [theme.breakpoints.down('md')]:{
              flexDirection: 'column',
              rowGap: 1,
              marginTop: -1
            }
            }}>
            <GraphTypography text={`${lastTime}`}/>
          </Box>
        </Box>
      </Box>
      <Box>
        <WithSpinner val={chart}/>
      </Box>
    </Box>
  );
};

const GraphTypography = ({ text }: { text: string }) => (
  <Typography
    variant="body2"
    fontWeight={600}
    color={formatColor(neutral.gray3)}
  >
    {text}
  </Typography>
);
