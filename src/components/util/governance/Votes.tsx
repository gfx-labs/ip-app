import { Box, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral, green, pink } from "../../../theme";
import { ArrowDownIcon } from "../../icons/misc/ArrowDownIcon";
import { ArrowUpIcon } from "../../icons/misc/ArrowUpIcon";

export const Votes = ({
  noVotes,
  yesVotes,
}: {
  noVotes: number;
  yesVotes: number;
}) => {
  const isLight = useLight();

  let upStrokeColor;
  let downStrokeColor;

  if (noVotes === 0 && yesVotes === 0) {
    if (isLight) {
      upStrokeColor = formatColor(neutral.gray1);
      downStrokeColor = formatColor(neutral.gray1);
    } else {
      upStrokeColor = formatColor(neutral.white);
      downStrokeColor = formatColor(neutral.white);
    }
  } else if (yesVotes > noVotes) {
    upStrokeColor = formatColor(green.green2);
    downStrokeColor = formatColor(pink.pink1);
  } else if (noVotes > yesVotes) {
    upStrokeColor = formatColor(pink.pink1);
    downStrokeColor = formatColor(green.green2);
  } else {
    upStrokeColor = formatColor(green.green2);
    downStrokeColor = formatColor(green.green2);
  }

  return (
    <Box display="flex" flexWrap="nowrap" marginX={3}>
      <Box display="flex" alignItems="center" marginX={2}>
        <ArrowUpIcon
          strokecolor={upStrokeColor}
          sx={{ width: 10, height: 12, mr: 1 }}
        />
        <Typography variant="label2">{yesVotes.toLocaleString()}</Typography>
      </Box>
      <Box display="flex" alignItems="center" marginX={2}>
        <ArrowDownIcon
          strokecolor={downStrokeColor}
          sx={{ width: 10, height: 12, mr: 1 }}
        />
        <Typography variant="label2">{noVotes.toLocaleString()}</Typography>
      </Box>
    </Box>
  );
};
