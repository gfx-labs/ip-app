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
            paddingTop={{ xs: 2, sm: 5 }}
            paddingBottom={{ xs: 2, sm: 5 }}
            px={{ xs: 2.5, md: 15 }}
            sx={{
                backgroundColor: 'footer.background',
                color: 'footer.color',
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
                backgroundColor: 'footer.background'
            }}
        >
            awiuehfoawuefuawhfou
        </Box>
    )
}