import { TextField } from "@mui/material";
import {useState} from "react";

const decimalRegexp = /^\d*(?:[.])?\d*$/;
const decimalEnforcer = (nextUserInput: string) => {
  console.log("hi", nextUserInput);
  if (nextUserInput === "") {
    return "";
  } else if (nextUserInput === ".") {
    return "0.";
  } else if (decimalRegexp.test(nextUserInput)) {
    return nextUserInput;
  }  return nextUserInput.slice(0, -1); 
};

export const DecimalInput = () => {
  const [numVal, setNumVal] = useState('')

  return (
    <TextField
      variant="standard"
      value={numVal}
      placeholder="0.0"
      onChange={(e) => {
        console.log(e)
        setNumVal(decimalEnforcer(e.target.value));
      }}
    />
  );
};
