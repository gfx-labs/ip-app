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
      { label: "Whitepaper", href: "/whitepaper" },
      { label: "Docs & Guides", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Developer", href: "https://github.com/gfx-labs/ip-contracts" },
      { label: "Contact", href: "https://discord.gg/s9Wja2tb6k" },
      { label: "Terms of Use", href: "/terms" },
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
  const isLight = useLight();
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
                      target="_blank"
                      key={link.label}
                      to={link.href}
                      variant="body3"
                      color={formatColor(neutral.gray2)}
                      paddingBottom={1}
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
          mt: 4,
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
          <MuiLink
            component={Link}
            to="https://discord.gg/s9Wja2tb6k"
            target="_blank"
            paddingBottom={2}
          >
            <Box
              component="img"
              src={`images/discord_icon_${isLight ? "black" : "grey"}.svg`}
              width="24px"
              height="24px"
              marginX={3}
            ></Box>
          </MuiLink>
          <MuiLink
            component={Link}
            to="https://twitter.com/labsgfx"
            target="_blank"
            paddingBottom={2}
          >
            <Box
              component="img"
              src={`images/twitter_bird_icon_${
                isLight ? "black" : "grey"
              }.svg`}
              width="25px"
              height="26px"
              marginX={3}
            ></Box>
          </MuiLink>
          <MuiLink
            component={Link}
            to="https://medium.com/interest-protocol"
            target="_blank"
            paddingBottom={2}
          >
            <Box
              component="img"
              src={`images/medium_icon_${isLight ? "black" : "grey"}.svg`}
              width="24px"
              height="24px"
              marginX={3}
            ></Box>
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};
