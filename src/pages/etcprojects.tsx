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
import { ForwardGreyIcon } from "../components/icons/misc/forwardGrey";
import { AppLayout } from "../components/partials/app-layout";
import { FadeContainer } from "../components/util/fadeContainer";
import { PageContainer } from "../components/util/pageContainer";
import { ProjectCardWithLogo } from "../components/util/projectCardWithLogo";
import { useNavigate } from "react-router-dom";
import { Listings, ProjectListing } from "../listings";

const ProjectsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const poppie = Listings.Projects.filter((x: ProjectListing) => { return x.name == "poppie" }).pop()
    const etherlands = Listings.Projects.filter((x: ProjectListing) => { return x.name == "etherlands" }).pop()
    const governance = Listings.Projects.filter((x: ProjectListing) => { return x.name == "governance" }).pop()

    return (
        <Box sx={{ backgroundColor: "background.quad" }}>
            <FadeContainer>
                <PageContainer
                    containerProps={{
                        pt: { xs: 15, md: 20 },
                        pb: { xs: 4, md: 17 },
                        px: { xs: 2, md: 10 },
                    }}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr 1fr"}
                        columnGap={3}
                        rowGap={4}
                    >
                        <ProjectCardWithLogo project={poppie!} />
                        <ProjectCardWithLogo project={etherlands!} />
                        <ProjectCardWithLogo project={governance!} />
                    </Box>
                </PageContainer>
            </FadeContainer>
        </Box>
    );
};

ProjectsPage.getLayout = (page: ReactElement) => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProjectsPage;
