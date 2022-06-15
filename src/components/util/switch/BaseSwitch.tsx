import React, { useState } from 'react'
import {
  SwitchProps,
  Box,
  Typography,
  useTheme,
} from '@mui/material'

import { formatColor, neutral, blue } from '../../../theme'
interface BaseSwitchProps extends SwitchProps {
  option1: string | React.ReactElement
  option2: string | React.ReactElement
  onOptionChange: (arg0: boolean) => void
  defaultIsOption1?: boolean
}

export const BaseSwitch = (props: BaseSwitchProps) => {
  const {
    option1,
    option2,
    onOptionChange,
    defaultIsOption1 = true,
  } = props
  const [option, setOption] = useState(() => {
    if (defaultIsOption1) {
      return option1
    }
    return option2
  })

  const [isOption1, setIsOption1] = useState(
    defaultIsOption1
  )
  const theme = useTheme()

  const longerLength =
    typeof option1 === 'string' &&
    typeof option2 === 'string'
      ? option1.length > option2.length
        ? option1.length
        : option2.length
      : 3.5

  const calculateWidth = () => `${longerLength * 12}px`

  const calculateContainerWidth = () =>
    `${longerLength * 24 + 12}px`

  const OptionBox = ({
    option,
    isSelected,
  }: {
    option: string | React.ReactElement
    isSelected: boolean
  }) => (
    <Box
      sx={{
        width: calculateWidth(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {typeof option === 'string' ? (
        <Typography
          variant="label2"
          sx={{
            color: isSelected
              ? formatColor(neutral.gray1)
              : formatColor(neutral.gray3),
            display: 'flex',
            zIndex: 10,
            alignItems: 'center',
          }}
        >
          {option}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            maxHeight: 15,
            position: 'relative',
            zIndex: 10,
          }}
        >
          {option}
        </Box>
      )}
    </Box>
  )

  const toggleHandler = () => {
    if (isOption1) {
      setOption(option2)
    } else {
      setOption(option1)
    }

    setIsOption1(!isOption1)

    onOptionChange(!isOption1)
  }

  let isLight = theme.palette.mode === 'light'

  return (
    <Box
      sx={{
        width: calculateContainerWidth(),
        backgroundColor: isLight
          ? formatColor(neutral.gray5)
          : formatColor(neutral.gray4),
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        textAlign: 'center',
        position: 'relative',
        height: '48px',
        paddingX: '6px',
        cursor: 'pointer',
      }}
      onClick={toggleHandler}
    >
      <OptionBox option={option1} isSelected={isOption1} />
      <OptionBox option={option2} isSelected={!isOption1} />

      <Box
        className={isOption1 ? 'option1' : 'option2'}
        sx={{
          width: calculateWidth(),
          backgroundColor: formatColor(neutral.white),
          color: formatColor(neutral.black),
          borderRadius: 2,
          height: '36px',
          marginY: '6px',
          position: 'absolute',
          animationName: 'slide',
          animationDuration: '1s',
          transition: '.4s',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&.option2': {
            transform: 'translateX(100%)',
          },
          '& path': {
            stroke: 'black',
          },
        }}
      >
        <Typography
          variant="body1"
          color={formatColor(neutral.black)}
          sx={{ display: 'flex', alignItems: 'center' }}
        ></Typography>
      </Box>
    </Box>
  )
}
