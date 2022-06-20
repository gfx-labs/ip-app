import { Box, LinearProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { formatColor, neutral } from '../../../theme'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { ToolTip } from '../tooltip/ToolTip'

export const StatsMeter = () => {
  const [percentBorrowed, setPercentBorrowed] = useState(0)
  const [percentBorrowedGraph, setPercentBorrowedGraph] = useState(0)

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
    <Box>
      <Typography variant="label" color={formatColor(neutral.gray3)}>
        Vault Stats
      </Typography>

      <LinearProgress
        color={barColor as any}
        variant="determinate"
        value={percentBorrowedGraph}
        sx={{
          marginY: 2,
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ToolTip
          content={
            <Typography variant="body3">
              The sum of the vault's collateral discounted by the LTV
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
              The percentage of the vault's borrowing power currently in use
            </Typography>
          }
          text={`USDi Borrowed:  ${percentBorrowed}%`}
          text_variant="label2"
        />
      </Box>
    </Box>
  )
}
