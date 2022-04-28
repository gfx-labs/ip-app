import { Typography, Box } from "@mui/material";
import { formatColor, neutral } from "../../../theme";

type TitleTextProps = {
  title: string;
  text: string;
};

export const TitleText = (props: TitleTextProps) => {
  const { title, text } = props;

  return (
    <Box>
      <Typography variant="body1" color={formatColor(neutral.gray3)} mb={1}>{title}</Typography>
      
      <Typography variant="subtitle1">{text}</Typography>
    </Box>
  );
};
