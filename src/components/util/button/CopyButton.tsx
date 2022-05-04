import { Box, Button, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";

import { CopyIcon } from "../../icons/misc/CopyIcon";

export const CopyButton = ({ text, copy }: { text: string; copy?: string }) => {
  const isLight = useLight();

  const copyText = () => {
    if (copy) {
      navigator.clipboard.writeText(copy);
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={copyText}
      sx={
        isLight
          ? {
              backgroundColor: formatColor(neutral.white),
              color: formatColor(neutral.black),
            }
          : {
              backgroundColor: formatColor(neutral.gray7),
              color: formatColor(neutral.white),
              
            }
      }
    >
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {text}
      </Typography>{" "}
      <CopyIcon
        sx={{
          width: "19px",
          marginLeft: 1,
        }}
        islight={isLight.toString()}
      />
    </Button>
  );
};
