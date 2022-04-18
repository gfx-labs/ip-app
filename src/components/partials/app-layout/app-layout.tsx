import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import {
    AnimatePresence,
    domAnimation,
    LazyMotion,
    motion,
} from "framer-motion";
import { ReactNode, useState } from "react";

import { Footer } from "../footer";
import { TopBar } from "../top-bar";
export interface AppLayoutProps {
    children?: ReactNode;
}

export const AppLayout = (props: AppLayoutProps) => {
    const { children } = props;

    const startIndex = 0;
    const [exitBefore, setExitBefore] = useState(false);
    return (
        <Box>
            <TopBar />
            {/* <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter={!exitBefore}>
          <motion.div
            className="page-wrap"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {
                opacity: 0,
                left: "-100%",
                scale: 0.6,
              },
              animate: {
                opacity: 1,
                left: 0,
                scale: 1,
              },
              exit: {
                opacity: 0,
                left: "100%",
                scale: 0.6,
              },
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <Box>{children}</Box>
          </motion.div>
        </AnimatePresence>
      </LazyMotion> */}
            <Box>{children}</Box>
            <Footer />
        </Box>
    );
};
