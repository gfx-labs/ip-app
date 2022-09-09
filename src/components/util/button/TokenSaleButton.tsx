import { Box, Button, Typography } from '@mui/material'
import { Link } from '../link'

export const TokenSaleButton = () => {
  return (
    <Link to="sale">
      <Button
        sx={{
          color: '#FFFFFF',
          backgroundColor: 'button.token',
          width: 'fit-content',
          px: 2,
        }}
      >
        {' '}
        <Box
          component="img"
          src={`images/star_white.svg`}
          width={22}
          height={22}
          mr={0.5}
        ></Box>
        <Typography variant="label2">IPT Sale</Typography>
      </Button>
    </Link>
  )
}
