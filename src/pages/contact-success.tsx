import { formatColor, neutral } from "../theme";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    Link as MuiLink,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { ReactElement } from "react";

import { BackwardGreyIcon } from "../components/icons/misc/backwardGrey";
import { AppLayout } from "../components/partials/app-layout";
import { PageContainer } from "../components/util/pageContainer";
import { useNavigate } from "react-router-dom";

const ContactSuccessPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "90vh",
                }}
            >
                <PageContainer
                    containerProps={{
                        pt: { xs: 10, md: 15 },
                        pb: { xs: 9, md: 24 },
                        px: { xs: 2, md: 10, xl: 15 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        color: "text.secondary",
                        maxWidth: "xl",
                    }}
                >
                    <IconButton
                        sx={{
                            color: "transparent",
                            position: "relative",
                            ml: -1,
                            mb: 4,
                        }}
                        onClick={() => navigate("/")}
                    >
                        <BackwardGreyIcon sx={{ width: 30, height: 30 }} />
                    </IconButton>

                    <Typography variant="h3" ml={10} color="text.tertiary">
                        We&apos;ll be in touch soon.
                    </Typography>
                </PageContainer>
            </Box>
        </>
    );
};

ContactSuccessPage.getLayout = (page: ReactElement) => {
    return <AppLayout>{page}</AppLayout>;
};

export default ContactSuccessPage;
