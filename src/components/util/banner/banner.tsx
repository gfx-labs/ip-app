import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

export interface BannerProps extends BoxProps {
  src?: string;
  posterSrc?: string;
  contentProps?: BoxProps;
}

export const Banner: FC<BannerProps> = (props) => {
  const {
    children,
    src,
    maxWidth = "md",
    contentProps = {},
    sx = {},
    ...rest
  } = props;

  const styleOverride = src
    ? {
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        ...sx,
      }
    : sx;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={{ xs: 8, sm: 10, md: 10, lg: 19, xl: 19 }}
      px={{ xs: 2.5, sm: 5, md: 10 }}
      sx={styleOverride}
      {...rest}
    >
      <Box maxWidth={maxWidth} {...contentProps}>
        {children}
      </Box>
    </Box>
  );
};
