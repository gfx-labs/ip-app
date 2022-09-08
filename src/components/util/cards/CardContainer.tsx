import { Box, BoxProps } from '@mui/material'
import { useLight } from '../../../hooks/useLight'

export const CardContainer = ({ children }: BoxProps) => {
  const isLight = useLight()
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'card.background',
        borderRadius: 2.5,
        boxShadow: isLight ? '0px 4px 4px 0px rgba(0,0,0, 0.04)' : 'none',
      }}
    >
      {children}
    </Box>
  )
}
