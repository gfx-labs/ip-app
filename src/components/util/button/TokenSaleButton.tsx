import { Button, Typography } from '@mui/material'
import { useLight } from '../../../hooks/useLight'
import { StarIcon } from '../../icons/misc/StarIcon'
import { Link } from '../link'

export const TokenSaleButton = () => {
  const isLight = useLight()
  const color = isLight ? '#5E64F4' : 'white'
  return (
    <Link to="/sale">
      <Button
        sx={{
          borderColor: color,
          borderWidth: 1,
          borderStyle: 'solid',
          width: 'fit-content',
          px: 2,
          '&:hover': {
            backgroundColor: '#A3A9BA',
          },
        }}
      >
        <StarIcon stroke={color} sx={{ width: 22, height: 22, mr: 1 }} />
        <Typography variant="label2" color={color}>
          IPT Sale
        </Typography>
      </Button>
    </Link>
  )
}
