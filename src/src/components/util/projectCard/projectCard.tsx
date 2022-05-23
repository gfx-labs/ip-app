import { formatColor, neutral } from "../../../theme";
import {
    Box,
    Button,
    Link as MuiLink,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";


export interface ProjectProps {
    label: string;
    graphic: string;
    longDescription: string;
    siteLink: string;
}

export const ProjectCard = ({
    project,
    buttonText,
}: {
    project: ProjectProps;
    buttonText: string;
}) => {
    const { label, graphic, longDescription, siteLink } = project;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            display="grid"
            gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
            alignItems="center"
        >
            <Box textAlign="left" maxWidth={400} mt={isMobile ? 3 : 0}>
                <Typography variant="h3" color="text.secondary">
                    {label}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={500}
                    color="text.tertiary"
                    mt={3}
                    mb={5}
                >
                    {longDescription}
                </Typography>
                <MuiLink href={siteLink}>
                    <Button size="large" color="primary" variant="contained">
                        <Typography variant="h5" fontWeight={700}>
                            {buttonText ? buttonText : "Go to Website"}
                        </Typography>
                    </Button>
                </MuiLink>
            </Box>
            <Box
                component="img"
                src={graphic}
                width="100%"
                borderRadius={8}
                sx={{
                    [theme.breakpoints.down("md")]: {
                        gridRow: 1,
                    },
                }}
            ></Box>
        </Box>
    );
};
