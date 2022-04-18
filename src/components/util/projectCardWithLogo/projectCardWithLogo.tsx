import { formatColor, neutral } from "../../../theme";
import {
    Box,
    Button,
    IconButton,
    Link as MuiLink,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import { Link } from "../link";
import { ForwardGreyIcon } from "../../icons/misc/forwardGrey";

export interface ProjectProps {
    label: string;
    logo: string;
    shortDescription: string;
    link: string;
}

export const ProjectCardWithLogo = ({ project }: { project: ProjectProps }) => {
    const { label, logo, shortDescription, link } = project;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <MuiLink href={link}>
            <Box
                display="flex"
                flexDirection="column"
                color="text.tertiary"
                sx={{
                    borderRadius: 14,
                    backgroundColor: formatColor(neutral.black),
                    textAlign: "center",
                    px: 2,
                    pt: 6,
                    pb: 4,
                    transition: "0.2s ease",
                    "&:hover": {
                        transform: "translateY(-10px)",
                    },
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    width="100%"
                    borderRadius={8}
                    maxWidth={isMobile ? 150 : 200}
                    marginX="auto"
                    marginBottom={isMobile ? 2 : 4}
                ></Box>
                <Typography
                    sx={{ textTransform: "lowercase" }}
                    fontWeight={600}
                    variant="body1"
                    marginBottom={isMobile ? 1 : 2}
                >
                    {label}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={600}
                    fontSize={isMobile ? 16 : 20}
                    marginBottom={isMobile ? 1 : 2}
                >
                    {shortDescription}
                </Typography>

                <IconButton
                    sx={{
                        color: "transparent",
                        position: "relative",
                    }}
                >
                    <ForwardGreyIcon sx={{ width: 40, height: 40 }} />
                </IconButton>
            </Box>
        </MuiLink>
    );
};
