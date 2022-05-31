import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "../../util/link";

const nav = [
  {
    title: "Protocol",
    links: [
      { label: "Whitepaper", href: "/static/whitepaper.pdf" },
      { label: "Docs & Guides", href: "/docs" },
    ],
  },
  {
    title: "Governance",
    links: [
      { label: "Overview", href: "/" },
      { label: "USDi", href: "/" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Twitter", href: "https://twitter.com/labsgfx" },
      { label: "Discord", href: "https://discord.gg/W9mjQNTYca" },
      { label: "Github", href: "https://github.com/gfx-labs/ip" },
    ],
  },
];

import { formatColor, neutral } from "../../../theme";
import { useLight } from "../../../hooks/useLight";

export const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      paddingTop={{ xs: 13, sm: 5 }}
      paddingBottom={{ xs: 7, sm: 3 }}
      px={{ xs: 4, md: 4 }}
      sx={{
        backgroundColor: "footer.background",
        color: "footer.color",
      }}
    >
      <DesktopFooter />
    </Box>
  );
};

const DesktopFooter = () => {
  const isLight = useLight()
  const theme = useTheme();
  return (
    <Box
      sx={{
        justifyContent: "space-between",
        maxWidth: 1300,
        margin: "auto",
        backgroundColor: "footer.background",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-evenly", md: "space-evenly" },
          maxWidth: 900,
          margin: "auto",
          [theme.breakpoints.down("md")]: {
            marginBottom: 12,
          },
        }}
      >
        {nav.map((navItem, index) => {
          return (
            <Box
              key={index}
              sx={{
                [theme.breakpoints.down("md")]: {
                  display: navItem.title === "Community" ? "none" : "block",
                },
              }}
            >
              <Typography
                variant="body1"
                fontWeight={700}
                color="text.secondary"
              >
                {navItem.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  marginTop: 2,
                }}
              >
                {navItem.links.map((link, index) => {
                  return (
                    <MuiLink
                      component={Link}
                      key={link.label}
                      to={link.href}
                      variant="h5"
                      color={formatColor(neutral.gray2)}
                      paddingBottom={2}
                      sx={{
                        "&:hover": {
                          color: "text.tertiary",
                        },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column-reverse",
            rowGap: 2,
            alignItems: "center",
          },
        }}
      >
        <Typography variant="body2" color={formatColor(neutral.gray3)}>
          Interest Protocol 2022
        </Typography>
        <Box>
          <Box
            component="img"
            src={`/images/discord_icon_${isLight ? 'black' : 'grey'}.svg`}
            width="24px"
            height="24px"
            marginX={3}
          ></Box>
          <Box
            component="img"
            src={`/images/twitter_bird_icon_${isLight ? 'black' :'grey'}.svg`}
            width="25px"
            height="26px"
            marginX={3}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
