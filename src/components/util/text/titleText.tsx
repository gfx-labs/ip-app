import { Typography, Box, BoxProps } from "@mui/material";
import { formatColor, neutral } from "../../../theme";

type TitleTextProps = {
  title: string;
  text: string;
};

export const TitleText = (props: TitleTextProps & BoxProps) => {
  const { title, text } = props;

  return (
    <Box {...props}>
      <Typography variant="body1" color={formatColor(neutral.gray3)} mb={1}>{title}</Typography>
      
      <Typography variant="subtitle1" color="text.primary">{text}</Typography>
    </Box>
  );
};
