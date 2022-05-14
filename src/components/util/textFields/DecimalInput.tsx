import { TextField, TextFieldProps } from "@mui/material";
import { useState, useEffect } from "react";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";

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
  onFocus?: () => void;
  onBlur?: () => void;
}

export const DecimalInput = (props: DecimalInputProps) => {
  const { onChange, placeholder, value, onFocus, onBlur } = props;

  const isLight = useLight()


  return (
    <TextField
      onFocus={onFocus}
      onBlur={onBlur}
      variant="standard"
      value={value}
      placeholder={placeholder || '0.0'}
      onChange={(e) => {
        onChange(decimalEnforcer(e.target.value));
      }}
      sx={{
        '.MuiInputBase-input': {
          fontWeight: 700,
          color: isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      }}
    />
  );
};
