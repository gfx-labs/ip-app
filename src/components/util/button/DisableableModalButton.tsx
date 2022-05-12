import { Button, Typography, Box, ButtonProps } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { neutral, formatColor } from "../../../theme";

interface DisableableModalButtonProps extends ButtonProps {
  text: string;
}

export const DisableableModalButton = (props: DisableableModalButtonProps) => {
  const { disabled, onClick, text } = props;

  const isLight = useLight();

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      sx={{
        marginY: 2,
        width: "100%",
        backgroundColor: isLight
          ? formatColor(neutral.black1)
          : formatColor(neutral.white),
        color: isLight
          ? formatColor(neutral.white)
          : formatColor(neutral.black1),
      }}
    >
      {text}
    </Button>
  );
};
