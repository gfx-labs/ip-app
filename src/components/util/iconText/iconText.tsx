import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

import { FadeContainer } from "../fadeContainer";

export interface IconTextContainer {
    src: string;
    alt: string;
    text: string;
}

export const IconText: FC<IconTextContainer> = (props) => {
    const { src, alt, text } = props;

    return (
        <Box
            sx={{
                textAlign: "center",
                mb: 4,
            }}
        >
            <FadeContainer>
                <img src={src} alt={alt} width={250} height={250} />
            </FadeContainer>
            <Typography variant="h3" whiteSpace="break-spaces">
                {text}
            </Typography>
        </Box>
    );
};
