import {
    Box,
    Button,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Link } from "../../util/link";

const nav = [];

import { formatColor, neutral } from "../../../theme";

export const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box
            py={{ xs: 2, sm: 5 }}
            px={{ xs: 2.5, md: 15 }}
            sx={{
                backgroundColor: formatColor(neutral.black),
                color: formatColor(neutral.white),
            }}
        >
            {isMobile ? mobileFooter() : desktopFooter()}
        </Box>
    );
};


const mobileFooter = () => {
    const theme = useTheme();
    return (
        <Box>
        </Box>
    )
}

const desktopFooter = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: 1300,
                margin: "auto",
            }}
        >
        </Box>
    )
}