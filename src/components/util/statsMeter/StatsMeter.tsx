import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { formatColor, neutral } from '../../../theme'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { CardContainer } from '../cards/CardContainer'
import { ToolTip } from '../tooltip/ToolTip'

export const StatsMeter = () => {
  const [barColor, setBarColor] = useState('#50D66D')

  const { borrowingPower, accountLiability } = useVaultDataContext()

  const percentBorrowedCalc = useMemo(() => {
    if (borrowingPower && accountLiability) {
      let borrowPercent = 0
      if (Number(borrowingPower) !== 0) {
        borrowPercent = Math.floor(
          100 * (Number(accountLiability) / Number(borrowingPower)))
      }

      return {
        borrowPercent,
        borrowPercentGraph: borrowPercent > 100 ? 100 : borrowPercent,
      }
    }
    return {
      borrowPercent: 0,
      borrowPercentGraph: 0,
    }
  }, [borrowingPower, accountLiability])

  useEffect(() => {
    if (percentBorrowedCalc?.borrowPercent > 80) {
      setBarColor('red')
    } else {
      setBarColor('#50D66D')
    }
  }, [percentBorrowedCalc])

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
            paddingY: { xs: 4, lg: 0 },
          }}
        >
          <CircularProgress
            variant="determinate"
            thickness={3}
            value={percentBorrowedCalc.borrowPercentGraph}
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
            thickness={3}
            size={190}
            sx={{
              position: 'absolute',

              '& svg': {
                color: formatColor(neutral.gray5),
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column-reverse', lg: 'row' },
          }}
        >
          <ToolTip
            content={
              <Typography variant="body3">
                Maximum amount that your vault can borrow, calculated by the sum
                of collateral values discounted by the LTV
              </Typography>
            }
            text={`Borrowing Power: ${Math.round(Number(borrowingPower)).toLocaleString()} USDi
          `}
            text_variant="label_semi"
          />

          <ToolTip
            content={
              <Typography variant="body3">
                USDi Borrowed / Borrowing Power
              </Typography>
            }
            text={`USDi Borrowed:  ${percentBorrowedCalc.borrowPercent}%`}
            text_variant="label_semi"
          />
        </Box>
      </Box>
    </CardContainer>
  )
}
