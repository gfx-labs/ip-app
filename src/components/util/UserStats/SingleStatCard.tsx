import { Box, SxProps } from '@mui/material'
import React from 'react'
import { formatColor, neutral } from '../../../theme'

export const SingleStatCard = ({
  children,
  sx,
}: {
  children: React.ReactElement
  sx?: SxProps
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'smallCard.background',
        borderRadius: 3,
        paddingY: 2,
        paddingLeft: { xs: 2, md: 3 },
        paddingRight: { xs: 2, md: 3 },
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
