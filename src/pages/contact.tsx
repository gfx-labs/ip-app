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

import {
    useNavigate
} from "react-router-dom"

import axios from "axios";
import { ReactElement, useState } from "react";

import { BackwardGreyIcon } from "../components/icons/misc/backwardGrey";
import { AppLayout } from "../components/partials/app-layout";
import { PageContainer } from "../components/util/pageContainer";

const ContactsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("/api/send-contact", { name, email, message });
            navigate("/contact-success");
        } catch (error) {
            console.log("An error occurred. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "85vh",
            }}
        >
            <PageContainer
                containerProps={{
                    pt: { xs: 10, md: 20 },
                    pb: { xs: 9, md: 24 },
                    px: { xs: 2, sm: 15, md: 15, xl: 25 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    color: "text.secondary",
                    maxWidth: "xl",
                }}
            >
                <Typography variant="h3" mb={2} color="text.secondary">
                    Say hi
                </Typography>
                <Box
                    color="secondary"
                    sx={{ color: "text.tertiary", width: "100%", maxWidth: 600 }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.tertiary",
                            marginBottom: 3,
                        }}
                    >
                        Thanks for reaching out.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            justifyContent="space-between"
                            gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
                            columnGap={3}
                            rowGap={2}
                            my={2}
                        >
                            <TextField
                                placeholder="Name"
                                variant="filled"
                                fullWidth
                                onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                                placeholder="Email"
                                variant="filled"
                                fullWidth
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>

                        <TextField
                            multiline
                            variant="filled"
                            maxRows={8}
                            minRows={4}
                            fullWidth
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{
                                "& .MuiFilledInput-root": {
                                    paddingTop: 1,
                                },
                            }}
                        />

                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{
                                paddingX: 3,
                                width: "150px",
                                marginLeft: "auto",
                                marginTop: 3,
                            }}
                        >
                            <Typography variant="h5" fontWeight={700}>
                                Send
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </PageContainer>
        </Box>
    );
};

ContactsPage.getLayout = (page: ReactElement) => {
    return <AppLayout>{page}</AppLayout>;
};

export default ContactsPage;
