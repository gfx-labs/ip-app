import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { formatColor, neutral } from '../../../theme'
import { ToolTipInfoIcon } from '../../icons/misc/ToolTipInfoIcon'

const BaseToolTipContainer = styled(({ className, ...props }: TooltipProps) => {
  return (
    <Tooltip
      arrow
      sx={{ cursor: 'pointer' }}
      {...props}
      classes={{ popper: className }}
    />
  )
})(({ theme }) => {
  const isLight = theme.palette.mode === 'light'
  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: isLight
        ? formatColor(neutral.white)
        : formatColor(neutral.black5),
      color: isLight ? formatColor(neutral.black5) : formatColor(neutral.white),
      borderRadius: '20px',
      padding: '24px',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: isLight ? formatColor(neutral.white) : formatColor(neutral.black5),
    },
  }
})

export const ProposalToolTip = (props: {
  content: TooltipProps['title']
  text: string
  text_variant?: 'body1' | 'body2' | 'body2_semi' | 'label2'
}) => {
  const { content, text } = props

  return (
    <BaseToolTipContainer title={content}>
      <Typography variant="label2" color="text.secondary" whiteSpace="nowrap">
        {text}
      </Typography>
    </BaseToolTipContainer>
  )
}
