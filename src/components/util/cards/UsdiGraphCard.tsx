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


  const addData = async (o:Observation)=>{
    if(!o.timestamp){
      provider?.getBlock(o.block).then((b)=>{
        o.timestamp = b.timestamp * 1000
        data.set(o.block, o)
      })
    }else{
      data.set(o.block, o)
    }
  }

  useEffect(()=>{
    const temp = new Map<number, Observation>()
    if(rolodex && rolodex.VC){
      rolodex.VC.queryFilter(rolodex.VC.filters.InterestEvent()).then((events)=>{
        events.forEach((event) =>{
          if(!temp.has(event.blockNumber)) {
            temp.set(event.blockNumber, {block:event.blockNumber})
          }
          temp.get(event.blockNumber)!.interestRate = event.args[2].div(BN("1e16")).toNumber()
        })
      }).then(async ()=>{
        return rolodex.USDI.queryFilter(rolodex.USDI.filters.Donation()).then((events)=>{
          events.forEach((event) =>{
            if(!temp.has(event.blockNumber)) {
              temp.set(event.blockNumber, {block:event.blockNumber})
            }
            temp.get(event.blockNumber)!.interestPaid = event.args[1].div(BN("1e16")).toNumber()/100
          })
        }).then(()=>{
          for(const [k, v] of temp.entries()) {
            addData(v)
          }
        })

      })    }
  },[rolodex, dataBlock])

  useEffect(()=>{
    if(data.size > 4) {
      setChart(<MultilineChart
        datamap={data}
        width={400}
        height={200}
        margin={{top:10,right:40,bottom:30,left:50}}
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
        <Box display="flex" sx={{
          display: 'flex',
          [theme.breakpoints.down('md')]:{
            flexDirection: 'column',
            rowGap: 1,
            marginTop: -1
          }
          }}>
          <GraphTypography text={`${lastTime}`} />
          <GraphTypography text={`${lastBlock}`} />
        </Box>

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
            <GraphTypography text={`Interest Earned (${lastRate}%)`} />
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
