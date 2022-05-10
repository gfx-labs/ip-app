import { TextField, TextFieldProps } from "@mui/material";
import { useState, useEffect } from "react";

const decimalRegexp = /^\d*(?:[.])?\d*$/;
const decimalEnforcer = (nextUserInput: string) => {
  if (nextUserInput === "") {
    return "";
  } else if (nextUserInput === ".") {
    return "0.";
  } else if (decimalRegexp.test(nextUserInput)) {
    return nextUserInput;
  }
  return nextUserInput.slice(0, -1);
};

interface DecimalInputProps {
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
}

export const DecimalInput = (props: DecimalInputProps) => {
  const [numVal, setNumVal] = useState("");

  const { onChange, placeholder, value } = props;

  useEffect(() => {
    onChange(value)
  }, [value]);

  return (
    <TextField
      variant="standard"
      value={value}
      placeholder={placeholder || '0.0'}
      onChange={(e) => {
        onChange(decimalEnforcer(e.target.value));
      }}
    />
  );
};
