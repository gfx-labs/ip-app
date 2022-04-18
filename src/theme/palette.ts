import { blue, formatColor, green, neutral } from "./colors";
import { theme } from "../theme";
import { Theme } from "@mui/material";
export const getDesignTokens = () => ({
    ...theme,
    palette: {
        // palette values for light mode
        primary: { main: formatColor(blue.blue1) },
        secondary: { main: formatColor(blue.blue2) },
        success: { main: formatColor(green.green1) },
        text: {
            primary: formatColor(neutral.black),
            secondary: formatColor(neutral.white),
            tertiary: formatColor(neutral.gray1),
            footer: formatColor(neutral.white),
            textCardCaption: formatColor(neutral.black3),
        },
        background: {
            default: formatColor(neutral.black4),
            secondary: formatColor(neutral.gray2),
            tertiary: formatColor(neutral.gray2),
            quad: formatColor(neutral.black1),
            card: formatColor(neutral.gray4),
            apply: formatColor(blue.blue3),
            dialog: formatColor(neutral.white),
        },
        divider: formatColor(neutral.gray6),
    },
});
