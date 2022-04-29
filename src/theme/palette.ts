import { blue, formatColor, green, neutral } from "./colors";
import { PaletteMode, Theme, ThemeOptions } from "@mui/material";
import { theme } from "../theme";


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
            primary: formatColor(neutral.black),
            secondary: formatColor(neutral.white),
          },
          background: {
            default: formatColor(neutral.black4),
          },
          divider: formatColor(neutral.gray6),
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
            default: formatColor(neutral.black4),
          },
          divider: formatColor(neutral.gray6),
        }),
  },
});
