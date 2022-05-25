import {
  Button,
  ButtonProps,
  CircularProgress,
} from "@mui/material";
import {Box} from "@mui/system";
import {useState} from "react";
import { useLight } from "../../../hooks/useLight";
import { neutral, formatColor, disabled as dis } from "../../../theme";

import "./button.css"
interface DisableableModalButtonProps extends ButtonProps {
  text: string;
  load_text?: string;
  loading?: boolean;
  shaking?: boolean;
}

export const DisableableModalButton = (props: DisableableModalButtonProps) => {
  const { disabled, onClick, text, load_text = "",shaking = false, loading = false } = props;
  const isLight = useLight();

  let themeBackgroundColor = isLight? formatColor(neutral.black1): formatColor(neutral.white)
  let themeColor= isLight? formatColor(neutral.white): formatColor(neutral.black1)
  return (
    <Button
      className={shaking ? "shaking" : "still"}
      disabled={disabled || loading}
      onClick={onClick}
      variant="contained"
      sx={{
        width: "100%",
        backgroundColor: themeBackgroundColor,
        color: themeColor,
      }}
    >
      {loading ? <><CircularProgress size={20} /> <Box sx={{marginLeft: 2}}>{load_text}</Box></> : text}
    </Button>
  );
};
