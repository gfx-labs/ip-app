import { Box, IconButton } from "@mui/material";
import { ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BackwardGreyIcon } from "../../components/icons/misc/backwardGrey";
import { AppLayout } from "../../components/partials/app-layout";
import { FadeContainer } from "../../components/util/fadeContainer";
import { PageContainer } from "../../components/util/pageContainer";
import { ProjectCard } from "../../components/util/projectCard/projectCard";
import { Listings, ProjectListing } from "../../listings";

const ProjectPage = () => {
    const args = useParams()
    const projects = Listings.Projects.filter((x: ProjectListing) => {
        return x.category === (args.name as string)
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (projects.length === 0) {
            navigate("/projects");
        }
    }, [navigate, projects]);

    return (
        <Box
            sx={{
                marginX: "auto",
                minHeight: "90vh",
            }}
        >
            <FadeContainer>
                <PageContainer
                    containerProps={{
                        paddingY: { xs: 10, md: 25 },
                    }}
                >
                    {projects &&
                        projects.map((project: any, index: any) => {
                            const goToTwitter =
                                project.category === "governance" ? "Go To Twitter" : "";
                            return (
                                <ProjectCard
                                    project={project}
                                    key={index}
                                    buttonText={goToTwitter}
                                />
                            );
                        })}
                </PageContainer>
            </FadeContainer>
        </Box>
    );
};

export default ProjectPage;
