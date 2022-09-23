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
import { CardContainer } from '../cards/CardContainer'
import { ToolTip } from '../tooltip/ToolTip'

export const StatsMeter = () => {
  const [percentBorrowed, setPercentBorrowed] = useState(0)
  const [percentBorrowedGraph, setPercentBorrowedGraph] = useState(0)
  const isLight = useLight()
  const [barColor, setBarColor] = useState('#50D66D')

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
      setBarColor('red')
    }
  }, [percentBorrowed])

  return (
    <CardContainer>
      <Box padding={{ xs: 2, md: 3 }}>
        <Box lineHeight={0}>
          <Typography variant="body1" color="text.primary">
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
            variant="determinate"
            thickness={5}
            value={percentBorrowedGraph}
            sx={{
              position: 'relative',
              zIndex: 2,
              color: barColor,
            }}
            size={190}
          />

          <CircularProgress
            variant="determinate"
            value={100}
            thickness={5}
            size={190}
            sx={{
              position: 'absolute',

              '& svg': {
                color: formatColor(neutral.gray5),
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
            text={`USDi Borrowed:  ${percentBorrowed}%`}
            text_variant="label2"
          />
        </Box>
      </Box>
    </CardContainer>
  )
}
