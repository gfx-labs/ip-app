import { formatColor, neutral } from "../theme";
import {
    Box,
    Grid,
    Link as MuiLink,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

import { AppLayout } from "../components/partials/app-layout";
import { Banner } from "../components/util/banner";
import { FadeContainer } from "../components/util/fadeContainer";
import { Link } from "../components/util/link";
import { PageContainer } from "../components/util/pageContainer";
import { Listings } from "../listings";

const IndexPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const positions = Listings.Positions

    return (
        <>
            <Box
                sx={{ marginX: "auto", backgroundColor: formatColor(neutral.white) }}
            >
                <Box
                    textAlign="left"
                    py={{ xs: 7, sm: 8 }}
                    px={3}
                    sx={{
                        backgroundColor: formatColor(neutral.black),
                        height: "100vh",
                        color: formatColor(neutral.white),
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: isMobile ? "center" : "end",
                    }}
                >
                    <Typography variant="h2">Build with us.</Typography>

                    <Box
                        component="img"
                        src="/images/gfxlabs_chain.gif"
                        sx={{
                            position: "relative",
                            bottom: 0,
                            margin: "auto",
                            my: 0,
                            zIndex: 0,
                            opacity: 0.8,
                            width: "100%",
                            maxWidth: 400,
                            [theme.breakpoints.down("md")]: {
                                display: "block",
                                top: 0,
                                maxWidth: 270,
                            },
                        }}
                    ></Box>
                </Box>
                <FadeContainer>
                    <PageContainer
                        containerProps={{
                            paddingY: { xs: 5, md: 15 },
                            maxWidth: 1500,
                            paddingX: { xs: 0, md: 11 },
                        }}
                    >
                        <Typography variant="h3" pl={4}>
                            Careers
                        </Typography>

                        <Grid
                            container
                            display={isMobile ? "none" : "grid"}
                            gridTemplateColumns="3fr 3fr 3fr 1fr"
                            mb={3}
                            mt={4}
                            pl={4}
                            pr={0}
                            color="text.tertiary"
                            fontSize="16px"
                        >
                            <Grid item>Role</Grid>
                            <Grid item>Project</Grid>
                            <Grid item>Type</Grid>
                            <Grid item>Location</Grid>
                        </Grid>

                        <Grid container>
                            {positions.map((career, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    key={index}
                                    marginBottom={{ xs: 0 }}
                                    sx={{
                                        [theme.breakpoints.down("md")]: {
                                            mx: 2,
                                            px: 2,
                                            "&:not(:last-child)": {
                                                borderBottom: `1px solid ${theme.palette.divider}`,
                                            },
                                        },
                                    }}
                                >
                                    <MuiLink
                                        //   component={Link}
                                        key={career.link}
                                        href={career.link}
                                        target="_blank"
                                        //     passHref
                                        color="text.primary"
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "3fr 3fr 3fr 1fr",
                                            justifyContent: "space-between",
                                            p: 4,
                                            pr: 0,

                                            "&:hover": {
                                                background: "rgba(0, 0, 0, 0.04)",
                                                borderRadius: "38px",
                                            },

                                            [theme.breakpoints.down("md")]: {
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: 1,
                                                gridTemplateAreas: `"role role"
                        "project type"
                        "location location"`,
                                                pb: 3,
                                                mb: 0,

                                                px: 0,

                                                "&:hover": {
                                                    background: "white",
                                                    borderRadius: "0",
                                                },
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                            sx={{
                                                [theme.breakpoints.down("md")]: {
                                                    gridArea: "role",
                                                },
                                            }}
                                        >
                                            {career.role}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.tertiary"
                                            sx={{
                                                [theme.breakpoints.down("md")]: {
                                                    gridArea: "project",
                                                },
                                            }}
                                        >
                                            {career.project}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.tertiary"
                                            sx={{
                                                [theme.breakpoints.down("md")]: {
                                                    gridArea: "type",
                                                    textAlign: "end",
                                                },
                                            }}
                                        >
                                            {career.type}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.tertiary"
                                            sx={{
                                                [theme.breakpoints.down("md")]: {
                                                    gridArea: "location",
                                                },
                                            }}
                                        >
                                            {career.location}
                                        </Typography>
                                    </MuiLink>
                                </Grid>
                            ))}
                        </Grid>
                    </PageContainer>
                </FadeContainer>
            </Box>
        </>
    );
};

IndexPage.getLayout = (page: ReactElement) => {
    return <AppLayout>{page}</AppLayout>;
};

export default IndexPage;
