import { formatColor, neutral } from "../../../theme";
import {
    Box,
    BoxProps,
    Grid,
    IconButton,
    Link as MuiLink,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { ReactNode } from "react";

import { ForwardIcon } from "../../icons/misc/ForwardIcon";

import { Link } from "../link"

export interface Item {
    name: string;
    link: string;
}

export interface ListWithForwardIconProps extends BoxProps {
    list: Item[];
    listTitle: ReactNode;
    seeAllLink: string;
}

export const ListWithForwardIcon = (props: ListWithForwardIconProps) => {
    const { list, listTitle, seeAllLink, sx = {} } = props;
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "background.card",
                borderRadius: "40px",
                padding: 7,
                px: 3,
                [theme.breakpoints.down("md")]: {
                    p: 3,
                    py: 6,
                },
                ...sx,
            }}
        >
            <Box display="flex" justifyContent="space-between">
                {typeof listTitle === "string" ? (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        mb={8}
                        display="inline-block"
                        fontWeight={600}
                        ml={4}
                        sx={{
                            [theme.breakpoints.down("md")]: {
                                ml: 2,
                            },
                        }}
                    >
                        {listTitle}
                    </Typography>
                ) : (
                    <Box>{listTitle}</Box>
                )}
            </Box>

            <Grid container direction="column">
                {list.slice(0, 3).map((item, index) => (
                    <Grid
                        item
                        xs={12}
                        key={index}
                        sx={{
                            mb: 5,

                            [theme.breakpoints.down("md")]: {},
                        }}
                    >
                        <MuiLink
                            component={Link}
                            key={item.link}
                            to={item.link}
                            color="text.secondary"
                            sx={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "space-between",
                                px: 4,
                                py: 2,
                                "&:hover": {
                                    background: "rgba(0, 0, 0, 0.3)",
                                    borderRadius: "38px",
                                    color: "text.secondary",
                                },

                                [theme.breakpoints.down("md")]: {
                                    px: 2,
                                },
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{
                                    textTransform: "capitalize",
                                    display: "inline-block",
                                    mr: 5,
                                }}
                            >
                                {item.name}
                            </Typography>
                            <IconButton
                                sx={{
                                    color: "transparent",
                                    padding: 0,
                                }}
                            >
                                <ForwardIcon strokecolor="black"/>
                            </IconButton>
                        </MuiLink>
                    </Grid>
                ))}
                <MuiLink
                    component={Link}
                    to={seeAllLink}
                    replace
                    color="text.tertiary"
                >
                    <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                            textAlign: "end",
                            mr: 4,
                            mt: 2,
                            [theme.breakpoints.down("md")]: {
                                mt: 0,
                            },
                        }}
                    >
                        See all
                    </Typography>
                </MuiLink>
            </Grid>
        </Box>
    );
};
