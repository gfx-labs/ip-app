import { Box } from "@mui/material";
import React from "react";
import { useLight } from "../../../hooks/useLight";
import { green, formatColor, blue, neutral, pink } from "../../../theme";

type bgColor = string;
type fontColor = string;

const StatusContainerColor = (status: string): [bgColor, fontColor] => {
  const isLight = useLight();

  switch (status) {
    case "active":
      if (isLight) {
        return [formatColor(green.green2), formatColor(green.green3)];
      }
      return [formatColor(green.green4), formatColor(green.green3)];
    case "successful":
      if (isLight) {
        return [formatColor(green.green5), formatColor(green.green2)];
      }
      return [formatColor(green.green4), formatColor(green.green2)];

    case "pending":
      if (isLight) {
        return [formatColor(blue.blue9), formatColor(blue.blue15)];
      }
      return [formatColor(blue.blue16), formatColor(blue.blue15)];

    case "cancelled":
      if (isLight) {
        return [formatColor(neutral.gray5), formatColor(neutral.gray10)];
      }
      return [formatColor(green.green6), formatColor(blue.blue3)];

    case "queued":
      if (isLight) {
        return [formatColor(neutral.gray5), formatColor(neutral.gray10)];
      }
      return [formatColor(green.green6), formatColor(blue.blue3)];

    case "defeated":
      if (isLight) {
        return [formatColor(pink.pink2), formatColor(pink.pink1)];
      }
      return [formatColor(pink.pink3), formatColor(pink.pink1)];

    case "executed":
      if (isLight) {
        return [formatColor(green.green5), formatColor(green.green2)];
      }
      return [formatColor(green.green4), formatColor(green.green2)];

    case "expired":
      if (isLight) {
        return [formatColor(neutral.gray5), formatColor(neutral.gray10)];
      }
      return [formatColor(green.green6), formatColor(blue.blue3)];

    default:
      if (isLight) {
        return [formatColor(neutral.gray5), formatColor(neutral.gray10)];
      }
      return [formatColor(green.green6), formatColor(blue.blue3)];
  }
};

const StatusContainer = ({ status }: { status: string }) => {
  const colors = StatusContainerColor(status);

  return (
    <Box
      sx={{
        backgroundColor: colors[0],
        color: colors[1],
      }}
    >
      {status}
    </Box>
  );
};

export const Status = ({ status }: { status: string }) => {
  return (
    <Box>
      <StatusContainer status={status} />
    </Box>
  );
};
