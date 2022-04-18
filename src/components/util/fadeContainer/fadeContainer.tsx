import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { Fade } from "react-awesome-reveal";

export interface FadeContainer {
    children: ReactNode;
}

export const FadeContainer: FC<FadeContainer> = (props) => {
    const { children } = props;

    return (
        <Fade direction="up" triggerOnce>
            <Box>{children}</Box>
        </Fade>
    );
};
