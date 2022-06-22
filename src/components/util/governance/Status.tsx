import { Box, Typography } from '@mui/material'
import { useLight } from '../../../hooks/useLight'
import { green, formatColor, blue, neutral, pink } from '../../../theme'

type bgColor = string
type fontColor = string

const statuses: { [key: number]: string } = {
  0: 'Pending',
  1: 'Active',
  2: 'Cancelled',
  3: 'Defeated',
  4: 'Succeeded',
  5: 'Queued',
  6: 'Expired',
  7: 'Executed',
}

const StatusContainerColor = (status: number): [bgColor, fontColor] => {
  const isLight = useLight()

  switch (status) {
    // Pending
    case 0:
      return isLight
        ? [formatColor(blue.blue9), formatColor(blue.blue15)]
        : [formatColor(blue.blue16), formatColor(blue.blue15)]

    // Active
    case 1:
      return isLight
        ? [formatColor([...green.green2, 0.15]), formatColor(green.green3)]
        : [formatColor(green.green4), formatColor(green.green3)]

    // Canceled
    case 2:
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)]

    // Defeated
    case 3:
      return isLight
        ? [formatColor(pink.pink2), formatColor(pink.pink1)]
        : [formatColor(pink.pink3), formatColor(pink.pink1)]

    // Succeeded
    case 4:
      return isLight
        ? [formatColor(green.green5), formatColor(green.green2)]
        : [formatColor(green.green4), formatColor(green.green2)]

    // Queued
    case 5:
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)]

    // Expired
    case 6:
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)]

    // Executed
    case 7:
      return isLight
        ? [formatColor(green.green5), formatColor(green.green2)]
        : [formatColor(green.green4), formatColor(green.green2)]

    default:
      return isLight
        ? [formatColor(neutral.gray5), formatColor(neutral.gray10)]
        : [formatColor(green.green6), formatColor(blue.blue3)]
  }
}

const StatusContainer = ({ status }: { status: number }) => {
  const colors = StatusContainerColor(status)
  const statusText: string = statuses[status as number]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 38,
        px: 2,
        width: 108,
        backgroundColor: colors[0],
        color: colors[1],
        borderRadius: 1,
      }}
    >
      <Typography variant="body3">{statusText}</Typography>
    </Box>
  )
}

export const Status = ({ status }: { status: number }) => {
  return (
    <Box display="flex" alignItems="center">
      <StatusContainer status={status} />
    </Box>
  )
}
