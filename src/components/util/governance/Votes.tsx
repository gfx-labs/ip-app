import { Box, Typography } from '@mui/material'
import { useLight } from '../../../hooks/useLight'
import { formatColor, neutral, green, pink } from '../../../theme'
import { ThumbsUpIcon } from '../../icons/misc/ThumbsUpIcon'

export const Votes = ({
  noVotes,
  yesVotes,
}: {
  noVotes: number
  yesVotes: number
}) => {
  const isLight = useLight()

  let upStrokeColor
  let downStrokeColor

  if (noVotes === 0 && yesVotes === 0) {
    if (isLight) {
      upStrokeColor = formatColor(neutral.gray1)
      downStrokeColor = formatColor(neutral.gray1)
    } else {
      upStrokeColor = formatColor(neutral.white)
      downStrokeColor = formatColor(neutral.white)
    }
  } else if (yesVotes > noVotes) {
    upStrokeColor = formatColor(green.green2)
    downStrokeColor = formatColor(pink.pink1)
  } else if (noVotes > yesVotes) {
    upStrokeColor = formatColor(pink.pink1)
    downStrokeColor = formatColor(green.green2)
  } else {
    upStrokeColor = formatColor(green.green2)
    downStrokeColor = formatColor(green.green2)
  }

  return (
    <Box display="flex" flexWrap="nowrap" marginX={7}>
      <Box display="flex" alignItems="center" marginX={1}>
        <ThumbsUpIcon
          strokecolor={formatColor(green.green2)}
          sx={{ width: 16, height: '100%', mr: 1 }}
        />
        <Typography color={formatColor(green.green2)} variant="label2_light">
          {yesVotes.toLocaleString()}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginX={1}>
        <ThumbsUpIcon
          strokecolor={formatColor(pink.pink1)}
          sx={{ width: 16, height: '100%', mr: 1, transform: 'rotate(180deg)' }}
        />
        <Typography color={formatColor(pink.pink1)} variant="label2_light">
          {noVotes.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  )
}
