import { useState } from 'react'
import { Box, Button, Checkbox, Typography } from '@mui/material'
import { blue, neutral, formatColor } from '../../../theme'
import CheckBoxIcon from '../../icons/misc/CheckBoxIcon'
import CheckBoxIconOutline from '../../icons/misc/CheckBoxIconOutline'

const CheckboxButton = (props: { onChange?: (v: boolean) => void }) => {
  const { onChange } = props
  const [checked, setChecked] = useState(true);
  const changeChecked = () => {
    setChecked(!checked)
    if (onChange) {
      onChange(!checked)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: 0,
        '&:hover': {
          '& path': {
            fill: formatColor(blue.blue1),
          },
          '& .MuiButton-root': {
            color: formatColor(blue.blue1),
          }
        },
      }}
    >
      <Checkbox 
        checked={checked}
        onChange={changeChecked}
        checkedIcon={<CheckBoxIcon />}
        icon={<CheckBoxIconOutline />}
        sx={{ width:24, height: 24, p: 0 }}
      />
      <Button
        variant="text"
        disableTouchRipple
        sx={{
          width: 'fit-content',
          height: 'fit-content',
          p: 0,
          color: checked ? formatColor(blue.blue1) : formatColor(neutral.gray3),
        }}
        onClick={changeChecked}
      >
        <Typography variant="body3" >Stake</Typography>
      </Button>
    </Box>
  )
}

export default CheckboxButton