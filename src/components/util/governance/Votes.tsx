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
  } else if (no > yes) {
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
          sx={{ width: 10, height: 16, mr: 1 }}
        />
        <Typography>{yes}</Typography>
      </Box>
      <Box display="flex" alignItems="center" marginX={2}>
        <ArrowDownIcon
          strokecolor={downStrokeColor}
          sx={{ width: 10, height: 16, mr: 1 }}
        />
        <Typography>{no}</Typography>
      </Box>
    </Box>
  );
};
