import { Box } from "@mui/system";
import { ReactNode, useState } from "react";

import { Footer } from "../footer";
import { TopBar } from "../top-bar";
export interface AppLayoutProps {
    children?: ReactNode;
}

export const AppLayout = (props: AppLayoutProps) => {
    const { children } = props;
    return (
        <Box>
            <TopBar />
            <Box>{children}</Box>
            <Footer />
        </Box>
    );
};
