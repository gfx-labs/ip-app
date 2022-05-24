import {CircularProgress, CircularProgressPropsColorOverrides, LinearProgress} from "@mui/material";
import {FC} from "react";


export const ProgressLine = () => {
  return <LinearProgress color="secondary"/>
}

export const Spinner = () => {
  return <CircularProgress color="secondary"/>
}
