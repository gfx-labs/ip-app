import {
    Box,
    Button,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "../../util/link";

const nav = [
    {
        label: "Etherlands",
        pathname: "https://etherlands.com",
    },
    {
        label: "Poppie",
        pathname: "https://poppie.io",
    },
    {
        label: "Governance",
        pathname: "https://twitter.com/labsGFX",
    },
    {
        label: "Careers",
        pathname: "https://cryptocurrencyjobs.co/startups/gfx-labs/",
        target: "_blank",
    },
    {
        label: "Contact",
        pathname: "/contact",
    },
    {
        label: "Twitter",
        pathname: "https://twitter.com/poppiefi",
        target: "_blank",
    },
];

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
            <Grid
                container
                display="grid"
                gridTemplateColumns="repeat(2, min-content)"
            >
                {nav.map(({ label, pathname }, index) => {
                    return (
                        <Grid
                            item
                            key={index}
                            sx={{
                                "&.MuiGrid-item": {
                                    paddingTop: 0,
                                },
                                [theme.breakpoints.down("md")]: {
                                    width: "50%",
                                },
                            }}
                        >
                            <Button
                                key={pathname}
                                //component={Link}
                                href={pathname}
                                sx={{ pl: 0, display: "block" }}
                                variant="solidText"
                            >
                                <Typography
                                    color="text.footer"
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    {label}
                                </Typography>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
            <Box
                pb={1}
                alignSelf="end"
                textAlign="end"
                sx={{
                    "&:hover": {
                        color: "text.tertiary",
                    },
                }}
            >
                <Button
                    // component={Link}
                    href="/"
                    sx={{
                        px: 0,
                        display: "block",
                    }}
                    variant="solidText"
                >
                    <Typography
                        color="text.footer"
                        variant="h5"
                        fontWeight="600"
                        whiteSpace="nowrap"
                    >
                        2021 GFX Labs
                    </Typography>
                </Button>
            </Box>
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
            <Grid
                container
                display="grid"
                gridTemplateColumns="repeat(3, min-content)"
                sx={{
                    margin: "auto",
                    [theme.breakpoints.down("md")]: {
                        alignItems: "flex-start",
                    },
                }}
            >
                {nav.slice(0, 3).map(({ label, pathname }, index) => {
                    return (
                        <Grid
                            item
                            key={index}
                            sx={{
                                "&.MuiGrid-item": {
                                    paddingTop: 0,
                                    paddingRight: 5,
                                },
                                [theme.breakpoints.down("md")]: {
                                    width: "50%",
                                },
                            }}
                        >
                            <Button
                                key={pathname}
                                //  component={Link}
                                href={pathname}
                                sx={{
                                    px: 0,
                                    display: "block",
                                }}
                                variant="solidText"
                            >
                                <Typography
                                    color="text.footer"
                                    variant="h5"
                                    fontWeight="400"
                                >
                                    {label}
                                </Typography>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
            <Box textAlign="center">
                <Button
                    //       component={Link}
                    href="/"
                    sx={{
                        px: 0,
                        display: "block",
                    }}
                    variant="solidText"
                >
                    <Typography
                        color="text.footer"
                        variant="h5"
                        fontWeight="400"
                        whiteSpace="nowrap"
                    >
                        2021 GFX Labs
                    </Typography>
                </Button>
            </Box>
            <Grid
                container
                display="grid"
                gridTemplateColumns="repeat(3, min-content)"
                justifyContent="end"
            >
                {nav.slice(3, 6).map(({ label, pathname }, index) => {
                    return (
                        <Grid
                            item
                            key={index}
                            sx={{
                                "&.MuiGrid-item": {
                                    paddingTop: 0,
                                    paddingLeft: 5,
                                },
                                [theme.breakpoints.down("md")]: {
                                    width: "50%",
                                },
                            }}
                        >
                            <Button
                                key={pathname}
                                //              component={Link}
                                href={pathname}
                                sx={{
                                    px: 0,
                                    display: "block",
                                }}
                                variant="solidText"
                            >
                                <Typography
                                    color="text.footer"
                                    variant="h5"
                                    fontWeight="400"
                                >
                                    {label}
                                </Typography>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    )
}