import { Typography, Box, BoxProps, Skeleton } from "@mui/material";
import { formatColor, neutral } from "../../../theme";

type TitleTextProps = {
  title: string;
  text: string | null;
};

export const TitleText = (props: TitleTextProps & BoxProps) => {
  const { title, text } = props;
  console.log(text, "TEXT FOR ", title);
  return (
    <Box {...props}>
      <Typography variant="body1" fontWeight={600} fontSize= {16} color={formatColor(neutral.gray3)} mb={1}>
        {title}
      </Typography>

      {text !== null ? (
        <Typography variant="subtitle1" fontWeight={700} fontSize= {28} color="#374252">
          {text}
        </Typography>
      ) : (
        <Skeleton variant="rectangular" height="28px" animation="wave" />
      )}
    </Box>
  );
};
