import { blue, formatColor, formatGradient, gradient, green, neutral } from "./colors";
import { PaletteMode, Theme, ThemeOptions, TypeBackground } from "@mui/material";
import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';
import { theme } from "../theme";

declare module "@mui/material/styles/createPalette" {
  export interface MuiPaletteOptions {
    footer: {
      background: string;
      color: string;
    };

    smallCard: {
      background: string;
      color: string;
    }
  }
}


export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  ...theme,
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: formatColor(blue.blue1) },
          secondary: { main: formatColor(blue.blue2) },
          success: { main: formatColor(green.green1) },
          text: {
            primary: formatColor(neutral.gray2),
            secondary: formatColor(neutral.black),
          },
          background: {
            default: `linear-gradient(${formatGradient(gradient.bgDefaultLight)})`,
          },
          divider: formatColor(neutral.gray6),
          footer: {
            background: formatColor(neutral.white),
            color: formatColor(neutral.gray3)
          },
          smallCard: {
            background: formatColor(neutral.gray5),
            title: formatColor(neutral.gray3),
            text: formatColor(neutral.gray1)
          }
        }
      : {
          // palette values for dark mode
          primary: { main: formatColor(blue.blue1) },
          secondary: { main: formatColor(blue.blue2) },
          success: { main: formatColor(green.green1) },
          text: {
            primary: formatColor(neutral.white),
            secondary: formatColor(neutral.white),
          },
          background: {
            default: `linear-gradient(${formatGradient(gradient.bgDefaultDark)})`,
          },
          divider: formatColor(neutral.gray6),
          footer: {
            background: formatColor(neutral.gray7),
            color: formatColor(neutral.white)
          },
          smallCard: {
            background: formatColor(neutral.gray7),
            title: formatColor(neutral.gray3),
            text: formatColor(neutral.white)
          }
        }),
  },
});
