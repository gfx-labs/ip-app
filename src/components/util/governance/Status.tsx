import { Box, Typography } from "@mui/material";
import React from "react";
import { useLight } from "../../../hooks/useLight";
import { green, formatColor, blue, neutral, pink } from "../../../theme";

type bgColor = string;
type fontColor = string;

const StatusContainerColor = (status: string): [bgColor, fontColor] => {
  const isLight = useLight();

  switch (status) {
    case "active":
      return isLight
        ? [formatColor([...green.green2, 0.15]), formatColor(green.green3)]
        : [formatColor(green.green4), formatColor(green.green3)];

    case "successful":
      return isLight
        ? [formatColor(green.green5), formatColor(green.green2)]
        : [formatColor(green.green4), formatColor(green.green2)];

    case "pending":
      return isLight
        ? [formatColor(blue.blue9), formatColor(blue.blue15)]
        : [formatColor(blue.blue16), formatColor(blue.blue15)];

    case "cancelled":
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)];

    case "queued":
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)];

    case "defeated":
      return isLight
        ? [formatColor(pink.pink2), formatColor(pink.pink1)]
        : [formatColor(pink.pink3), formatColor(pink.pink1)];

    case "executed":
      return isLight
        ? [formatColor(green.green5), formatColor(green.green2)]
        : [formatColor(green.green4), formatColor(green.green2)];

    case "expired":
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)];

    default:
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)];
  }
};

const StatusContainer = ({ status }: { status: string }) => {
  const colors = StatusContainerColor(status);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 38,
        width: {xs: 84, md: 108},
        backgroundColor: colors[0],
        color: colors[1],
        borderRadius: 1,
      }}
    >
      <Typography variant="body1">{status}</Typography>
    </Box>
  );
};

export const Status = ({ status }: { status: string }) => {
  return (
    <Box display="flex" alignItems="center">
      <StatusContainer status={status} />
    </Box>
  );
};
