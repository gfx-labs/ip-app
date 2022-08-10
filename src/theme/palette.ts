import {
  blue,
  disabled,
  formatColor,
  formatGradient,
  gradient,
  green,
  neutral,
} from './colors'
import { PaletteMode, ThemeOptions } from '@mui/material'
import { theme } from '../theme'

declare module '@mui/material/styles/createPalette' {
  export interface MuiPaletteOptions {
    footer: {
      background: string
      color: string
    }

    smallCard: {
      background: string
      color: string
    }

    mobileToolBar: {
      background: string
    }
  }
}

export const getDesignTokens = (mode: PaletteMode) => {
  const getColor = (lightColor: string, darkColor?: string) =>
    mode === 'light' || darkColor === undefined ? lightColor : darkColor

  return {
    ...theme,
    palette: {
      mode,
      primary: {
        main: getColor(formatColor(blue.blue1)),
        light: getColor(formatColor(neutral.white), formatColor(neutral.gray7)),
        dark: getColor(formatColor(neutral.gray7), formatColor(neutral.white)),
      },
      secondary: { main: getColor(formatColor(blue.blue2)) },
      success: { main: getColor(formatColor(green.green1)) },
      text: {
        primary: getColor(
          formatColor(neutral.gray1),
          formatColor(neutral.white)
        ),
        secondary: getColor(formatColor(neutral.gray3)),
      },
      background: {
        default: getColor(
          `linear-gradient(${formatGradient(gradient.bgDefaultLight)})`,
          getColor(formatColor(neutral.gray4))
        ),
        overview: getColor(
          formatColor(neutral.gray5),
          formatColor(neutral.gray7)
        ),
      },
      mobileToolBar: {
        background: getColor(
          formatColor(neutral.white),
          formatColor(neutral.black5)
        ),
      },
      divider: getColor(formatColor(neutral.gray6)),
      footer: {
        background: getColor(
          formatColor(neutral.white),
          formatColor(neutral.gray7)
        ),
        color: getColor(formatColor(neutral.gray3)),
      },
      smallCard: {
        background: getColor(
          formatColor(neutral.gray5),
          formatColor(neutral.gray4)
        ),
        title: getColor(formatColor(neutral.gray3)),
        text: getColor(formatColor(neutral.gray1), formatColor(neutral.white)),
      },
      action: {
        disabledBackground: getColor(formatColor(disabled.disabled1)),
        disabled: getColor(
          formatColor(neutral.white),
          formatColor(neutral.black)
        ),
      },
      misc: {
        whiteBlack: getColor(
          formatColor(neutral.white),
          formatColor(neutral.black)
        ),
        blackWhite: getColor(
          formatColor(neutral.black),
          formatColor(neutral.white)
        ),
      },
    },
  } as ThemeOptions
}
