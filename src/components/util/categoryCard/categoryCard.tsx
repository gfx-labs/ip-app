import { formatColor, neutral } from "../../../theme";
import { Box, BoxProps, Typography } from "@mui/material";
import React, { useState } from "react";

export interface CategoryCardProps extends BoxProps {
    src: string;
    mediaType: "img" | "video";
    hoverTitle: string;
    hoverDescription: string;
}

export const CategoryCard = (props: CategoryCardProps) => {
    const { src, mediaType, hoverTitle, hoverDescription } = props;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            width="100%"
            maxHeight={380}
            maxWidth={380}
            position="relative"
            margin="auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            borderRadius={18}
            overflow="hidden"
        >
            {mediaType === "video" ? (
                <Box
                    component="video"
                    autoPlay
                    loop
                    muted
                    src={src}
                    sx={{
                        width: "100%",
                        maxHeight: 380,
                        maxWidth: 380,
                        objectFit: "cover",
                        filter: "brightness(70%)",
                        height: "100%",
                        display: "block",
                    }}
                />
            ) : (
                <Box
                    component="img"
                    src={src}
                    width="100%"
                    height="100%"
                    maxHeight={380}
                    maxWidth={380}
                    display="block"
                ></Box>
            )}

            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(69, 69, 69, 0.67)",
                    color: formatColor(neutral.white),
                    textAlign: "left",
                    padding: 5,
                    display: isHovered ? "block" : "none",
                }}
            >
                <Typography variant="h4">{hoverTitle}</Typography>
                <Typography variant="body1">{hoverDescription}</Typography>
            </Box>
        </Box>
    );
};
