import {
  Button,
  ButtonProps,
  CircularProgress,
} from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { neutral, formatColor } from "../../../theme";

interface DisableableModalButtonProps extends ButtonProps {
  text: string;
  loading?: boolean;
}

export const DisableableModalButton = (props: DisableableModalButtonProps) => {
  const { disabled, onClick, text, loading = false } = props;

  const isLight = useLight();

  return (
    <Button
      disabled={disabled || loading}
      onClick={onClick}
      variant="contained"
      sx={{
        width: "100%",
        backgroundColor: isLight
          ? formatColor(neutral.black1)
          : formatColor(neutral.white),
        color: isLight
          ? formatColor(neutral.white)
          : formatColor(neutral.black1),
      }}
    >
      {loading ? <CircularProgress size={20} /> : text}
    </Button>
  );
};
