import {
  Box,
  LinearProgress,
  CircularProgress,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useLight } from '../../../hooks/useLight'
import { formatColor, formatGradient, neutral, gradient } from '../../../theme'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { ToolTip } from '../tooltip/ToolTip'

export const StatsMeter = () => {
  const [percentBorrowed, setPercentBorrowed] = useState(0)
  const [percentBorrowedGraph, setPercentBorrowedGraph] = useState(0)
  const isLight = useLight()
  const [barColor, setBarColor] = useState('success')

  const { borrowingPower, accountLiability } = useVaultDataContext()

  useEffect(() => {
    if (borrowingPower && accountLiability) {
      const borrowPercent = Math.floor(
        100 * (accountLiability / borrowingPower)
      )

      setPercentBorrowed(borrowPercent)

      // limits graph value to 100%
      setPercentBorrowedGraph(borrowPercent > 100 ? 100 : borrowPercent)
    }
  }, [borrowingPower, accountLiability])

  useEffect(() => {
    if (percentBorrowed > 80) {
      setBarColor('error')
    }
  }, [percentBorrowed])

  return (
    <Box
      sx={{
        paddingX: { xs: 3, md: 6 },
        paddingY: { xs: 6, md: 4 },
        backgroundImage: `linear-gradient(${formatGradient(
          isLight ? gradient.gradient1 : gradient.gradient2
        )})`,
        borderRadius: { xs: 5, md: 17 },
      }}
    >
      <Box>
        <Typography variant="label" color={formatColor(neutral.gray3)}>
          Borrowing Power
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <CircularProgress
          color={barColor as any}
          variant="determinate"
          thickness={5}
          value={percentBorrowedGraph}
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
          size={200}
        />

        <CircularProgress
          variant="determinate"
          value={100}
          thickness={5}
          size={200}
          sx={{
            position: 'absolute',

            '& svg': {
              color: 'white',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToolTip
          content={
            <Typography variant="body3">
              Maximum amount that your vault can borrow, calculated by the sum
              of collateral values discounted by the LTV
            </Typography>
          }
          text={`Borrowing Power: ${Math.round(
            borrowingPower
          ).toLocaleString()} USDi
          `}
          text_variant="label2"
        />

        <ToolTip
          content={
            <Typography variant="body3">
              USDi Borrowed / Borrowing Power
            </Typography>
          }
          text={`Percentage Used:  ${percentBorrowed}%`}
          text_variant="label2"
        />
      </Box>
    </Box>
  )
}
