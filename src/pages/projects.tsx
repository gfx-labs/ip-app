import { formatColor, neutral } from "../theme";
import {
    Box,
    Button,
    Grid,
    IconButton,
    Link as MuiLink,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { ReactElement } from "react";
import { BackwardGreyIcon } from "../components/icons/misc/backwardGrey";
import { AppLayout } from "../components/partials/app-layout";
import { FadeContainer } from "../components/util/fadeContainer";
import { PageContainer } from "../components/util/pageContainer";
import { ProjectCard } from "../components/util/projectCard/projectCard";
import { Listings, ProjectListing } from "../listings";
import { useNavigate } from "react-router-dom"

const ProjectsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const projects = Listings.Projects
    return (
        <Box
            sx={{
                marginX: "auto",
                backgroundColor: formatColor(neutral.black),
            }}
        >
            <PageContainer
                containerProps={{
                    pt: { xs: 10, md: 15 },
                    pb: { xs: 1 },
                    px: isMobile ? 3 : 15,
                    flexWrap: "wrap",
                    rowGap: 8,
                    maxWidth: "1500px",
                }}
            >
                {projects.map((project: ProjectListing, index: any) => {
                    const goToTwitter =
                        project.category === "governance" ? "Go To Twitter" : "";
                    return (
                        <Box key={index} py={isMobile ? 12 : 23.6} px={0}>
                            <FadeContainer>
                                <ProjectCard project={project} buttonText={goToTwitter} />
                            </FadeContainer>
                        </Box>
                    );
                })}
            </PageContainer>
        </Box>
    );
};

ProjectsPage.getLayout = (page: ReactElement) => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProjectsPage;
