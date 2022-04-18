import { formatColor, neutral } from "../theme";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactElement } from "react";

import { AppLayout } from "../components/partials/app-layout";
import {
    CategoryCard,
} from "../components/util/categoryCard/categoryCard";
import { FadeContainer } from "../components/util/fadeContainer";
import { ListWithForwardIcon } from "../components/util/listWithForwardIcon/listwithForwardIcon";
import { PageContainer } from "../components/util/pageContainer";
import { Listings, PositionListing, ProjectListing } from "../listings";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
const CompanyPage = () => {
    const theme = useTheme();
    const { currentAccount } = useWeb3Context()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const projectCategories = Listings.Projects.map((project: ProjectListing) => {
        return { name: project.categoryLabel, link: `/project/${project.category}` };
    });
    const openPositions = Listings.Positions.map((position: PositionListing) => {
        return { name: position.role, link: position.link };
    });

    return (
        <Box
            sx={{
                marginX: "auto",
                backgroundColor: formatColor(neutral.white2),
                position: "relative",
                overflowY: "hidden",
            }}
        >
            <Box
                color={formatColor(neutral.black)}
                textAlign="left"
                maxWidth="xl"
                py={{ xs: 7, sm: 0 }}
                px={{ xs: 3, md: 15 }}
                margin="auto"
                mt={{ xs: 20, md: 31 }}
                height={isMobile ? "auto" : "80vh"}
                position="relative"
                marginBottom={25}
                sx={{
                    mb: 25,
                    [theme.breakpoints.down("md")]: {
                        mb: 16,
                        pl: 3,
                        pb: 0,
                        marginLeft: "auto",
                    },
                }}
            >
                <Typography
                    variant="h2"
                    position="relative"
                    fontWeight={400}
                    mb={3}
                    sx={{
                        [theme.breakpoints.down("md")]: {
                            fontSize: 72,
                        },
                    }}
                >
                    GFX Labs
                </Typography>
                <Typography
                    variant="h4"
                    zIndex={1}
                    position="relative"
                    fontWeight={600}
                    sx={{
                        color: formatColor(neutral.gray1),
                        [theme.breakpoints.down("md")]: {
                            fontSize: 24,
                        },
                    }}
                >
                    Building the future we want to see
                </Typography>

                {currentAccount && <Typography>{currentAccount}</Typography>}

                <PageContainer
                    containerProps={{
                        maxWidth: "1500px",
                        [theme.breakpoints.down("md")]: {},
                    }}
                >
                    <Box
                        display="grid"
                        sx={{
                            justifyContent: "space-between",
                            gridTemplateColumns: "repeat(3, minmax(250px, 380px))",
                            margin: "auto",
                            mt: 20,
                            columnGap: 2,
                            [theme.breakpoints.down("md")]: {
                                gridTemplateColumns: "1fr",
                                rowGap: 4,
                            },
                        }}
                    >
                        <CategoryCard
                            mediaType="video"
                            src="/images/card-rotation.mp4"
                            hoverTitle="Poppie"
                            hoverDescription="A DeFi debit card"
                        />
                        <CategoryCard
                            mediaType="img"
                            src="/images/governance-chain.png"
                            hoverTitle="Governance"
                            hoverDescription="Our contribution to various DAOs and protocols"
                        />
                        <CategoryCard
                            mediaType="img"
                            src="/images/minecraft-ship.png"
                            hoverTitle="Etherlands"
                            hoverDescription="Minecraft server on the blockchain"
                        />
                    </Box>
                </PageContainer>
            </Box>
            <Box sx={{ background: formatColor(neutral.black) }}>
                <FadeContainer>
                    <PageContainer
                        containerProps={{
                            background: formatColor(neutral.black),
                            paddingX: { xs: 2, md: 15 },
                            maxWidth: "1500px",
                            paddingTop: 13,
                            paddingBottom: 5,
                        }}
                    >
                        <Box
                            paddingY={{ xs: 5, md: 10 }}
                            paddingX={{ xs: 4.5, md: 7 }}
                            sx={{
                                backgroundColor: formatColor([...neutral.gray4, 0.8]),
                                borderRadius: "40px",
                            }}
                        >
                            <Typography color="text.secondary" variant="h4" display="inline">
                                GFX labs started in 2021,
                            </Typography>{" "}
                            <Typography color="text.tertiary" variant="h4" display="inline">
                                with the goal to facilitate ownership and improve usability in
                                web3. Since then, we’ve grown to a team of 15 thinkers, problem
                                solvers, creatives and gamers. 🥔🥔🥔
                            </Typography>
                        </Box>
                    </PageContainer>
                </FadeContainer>

                <FadeContainer>
                    <PageContainer
                        containerProps={{
                            background: formatColor(neutral.black),
                            paddingX: { xs: 2, md: 15 },
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                            justifyContent: "space-around",
                            flexWrap: "wrap",
                            columnGap: 4,
                            rowGap: 4,
                            width: "100%",
                            maxWidth: "1500px",
                            paddingBottom: 13,
                        }}
                    >
                        <ListWithForwardIcon
                            list={projectCategories}
                            listTitle="Projects:"
                            seeAllLink="/projects"
                            sx={{
                                backgroundColor: formatColor([...neutral.gray4, 0.9]),
                            }}
                        />
                        <ListWithForwardIcon
                            list={openPositions}
                            listTitle="We're hiring."
                            seeAllLink="/careers"
                            sx={{ backgroundColor: formatColor([...neutral.gray4, 0.9]) }}
                        />
                    </PageContainer>
                </FadeContainer>
            </Box>
        </Box>
    );
};


export default CompanyPage;
