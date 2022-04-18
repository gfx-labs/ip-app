import { Box } from "@mui/material";
import React, { FC, ReactElement, ReactNode } from "react";
import { Fade, FadeProps } from "react-awesome-reveal";

export interface FadeContainer {
    children: ReactNode;
}

export const FadeContainer: any = (props: FadeContainer) => {
    const { children } = props;
    return (<Fade direction="up" triggerOnce>
        <Box>{children}</Box>
    </Fade>)
};
