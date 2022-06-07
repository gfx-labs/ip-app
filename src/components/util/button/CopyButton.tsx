import { Box, Button, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";

import { CopyIcon } from "../../icons/misc/CopyIcon";

export const CopyButton = ({ text, copy }: { text: string; copy?: string }) => {
  const isLight = useLight();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  const copyText = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (copy) {
      navigator.clipboard.writeText(copy);
    } else {
      navigator.clipboard.writeText(text);
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <>
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
        <Typography
          variant="label"
          color="text.primary"
          sx={{ position: "relative", top: 1 }}
        >
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
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {}}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{
            p: 2,
          }}
        >
          Copied to Clipboard
        </Typography>
      </Popover>
    </>
  );
};
