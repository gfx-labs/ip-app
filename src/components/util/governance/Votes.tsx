import { Box, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral, green, pink } from "../../../theme";
import { ArrowDownIcon } from "../../icons/misc/ArrowDownIcon";
import { ArrowUpIcon } from "../../icons/misc/ArrowUpIcon";

export const Votes = ({
  noVotes,
  yesVotes,
}: {
  noVotes: string;
  yesVotes: string;
}) => {
  const isLight = useLight();

  const no = Number(noVotes);
  const yes = Number(yesVotes);

  let upStrokeColor;
  let downStrokeColor;

  if (no === 0 && yes === 0) {
    if (isLight) {
      upStrokeColor = formatColor(neutral.gray1);
      downStrokeColor = formatColor(neutral.gray1);
    } else {
      upStrokeColor = formatColor(neutral.white);
      downStrokeColor = formatColor(neutral.white);
    }
  } else if (yes > no) {
    upStrokeColor = formatColor(green.green2);
    downStrokeColor = formatColor(pink.pink1);
  }

  return (
    <Box display="flex" flexWrap="nowrap">
      <Box display="flex">
        <ArrowUpIcon strokecolor={upStrokeColor} />{" "}
        <Typography>{yes}</Typography>
      </Box>
      <Box display="flex">
        <ArrowDownIcon strokecolor={downStrokeColor} />{" "}
        <Typography>{no}</Typography>
      </Box>
    </Box>
  );
};
