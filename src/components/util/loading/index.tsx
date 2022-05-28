import {CircularProgress, CircularProgressPropsColorOverrides, LinearProgress, Typography} from "@mui/material";
import {FC, useEffect, useState} from "react";


export const ProgressLine = () => {
  return <LinearProgress color="secondary"/>
}

export const Spinner = () => {
  return <CircularProgress color="secondary"/>
}

export const Dots = () => {
  const [stage, setStage] = useState(0)
  useEffect(()=>{
    setTimeout(()=>{setStage(stage > 3 ? 0 : stage + 1)}, 1000)
  },[stage])

  return <Typography>{".".repeat(stage)}</Typography>

}

export const Loads = (props:{def: any, val:any, e?:any}) => {
  let {val, e, def} = props
  if(val) {
    return e ? e : val
  }
  return def
}

export const WithSpinner = (props:{val:any, e?:any}) => {
  return Loads({def:Spinner(), ...props})
}

export const WithDots = (props:{val:any, e?:any}) => {
  return Loads({def:Dots(), ...props})
}
