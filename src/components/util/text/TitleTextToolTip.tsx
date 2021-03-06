import { Typography, Box, BoxProps, Skeleton } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { ToolTip } from '../tooltip/ToolTip'
export interface TitleTextProps extends BoxProps {
  title: string
  text: string | null
  tooltipContent: string
}

export const TitleTextToolTip = (props: TitleTextProps) => {
  const { title, text, tooltipContent } = props
  return (
    <Box {...props}>
      <Box mb={0.5}>
        <ToolTip
          content={<Typography variant="body3">{tooltipContent}</Typography>}
          text={title}
          text_variant="label2"
        />
      </Box>
      {text !== null ? (
        <Typography variant="subtitle1" color="text.primary">
          {text}
        </Typography>
      ) : (
        <Skeleton variant="rectangular" height="28px" animation="wave" />
      )}
    </Box>
  )
}
