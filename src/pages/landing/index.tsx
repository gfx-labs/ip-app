import {
  AppBar,
  Button,
  Icon,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { keyframes } from "@emotion/react";
import Cookies from "universal-cookie";
import { ForwardIcon } from "../../components/icons/misc/ForwardIcon";
import { formatColor, neutral, blue } from "../../theme";
import { Cards } from "./cards";
import { Community } from "./community";
import { Fractional } from "./fractional";
import { Highlights } from "./highlights";
import { Splash } from "./splash";
import { Values } from "./values";
import { Footer } from "../../components/partials/footer";
import { MenuIcon } from "../../components/icons/misc/menuIcon";

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const TopBar: React.FC<{ sx?: any }> = (props?: { sx?: any }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const navMenuButtonRef = useRef<HTMLButtonElement>(null);

  let isLight = theme.palette.mode === "light";
  const cookies = new Cookies();
  let nav = useNavigate();
  const toApp = () => {
    cookies.set("first-visit", "not");
    nav("/", { replace: true });
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        paddingTop: { xs: 1, md: 5 },
        paddingX: isMobile ? 1 : 2,
        width: "100%",
        margin: "auto",
        paddingBottom: 5,
        left: 0,
        right: 0,
        ...props?.sx,
      }}
    >
      {isMobile ? (
        <>
          <Toolbar
            sx={{
              marginTop: 3,

              justifyContent: {
                xs: "space-between",
              },
            }}
          >
            <Link href="/" aria-level={1}>
              <Box
                component="img"
                src="images/ip_green.svg"
                width={{ xs: 25, md: 50 }}
                height={{ xs: 25, md: 50 }}
              ></Box>
            </Link>

            <Box display="flex">
              <Button
                ref={navMenuButtonRef}
                sx={{
                  p: 1,
                  display: "flex",
                  minWidth: "auto",
                }}
                variant="text"
                color="secondary"
                onClick={() => setNavMenuOpen(true)}
              >
                <MenuIcon sx={{ width: 32, height: 32 }} />
              </Button>
            </Box>

            <SwipeableDrawer
              open={navMenuOpen}
              anchor="right"
              onClose={() => {
                setNavMenuOpen(false);
              }}
              onOpen={() => {
                setNavMenuOpen(true);
              }}
              PaperProps={{
                elevation: 12,
                sx: {
                  py: 8,
                  px: 4,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "mobileToolBar.background",
                  backgroundImage: "none",
                  display: "flex",
                  justifyContent: "start",
                },
              }}
              sx={{}}
              disableBackdropTransition={!iOS}
              disableDiscovery={iOS}
              transitionDuration={500}
            >
              <Button
                onClick={() => {
                  setNavMenuOpen(false);
                }}
                sx={{
                  display: "flex",
                  alignSelf: "start",
                  height: 23,
                  width: "auto",
                  marginBottom: 5,
                  minWidth: 14,
                  padding: 0,
                  alignItems: "start",
                }}
              >
                <ForwardIcon
                  strokecolor={
                    isLight
                      ? formatColor(neutral.black)
                      : formatColor(neutral.white)
                  }
                />
              </Button>

              <Box sx={{ gap: 4 }} display="flex" flexDirection="column">
                <Button
                  variant="text"
                  onClick={toApp}
                  sx={{ color: "inherit", justifyContent: "start", mb: -1 }}
                  disableRipple
                >
                  <Typography
                    variant="body3"
                    color={formatColor(neutral.white)}
                  >
                    App
                  </Typography>
                </Button>
                <Link href="whitepaper.pdf">
                  <Typography
                    variant="body3"
                    color={formatColor(neutral.white)}
                  >
                    Whitepaper
                  </Typography>
                </Link>
                <Link href="#/docs">
                  <Typography
                    variant="body3"
                    color={formatColor(neutral.white)}
                  >
                    Docs
                  </Typography>
                </Link>
                <Link href="https://gfx.cafe/ip/contracts" target="_blank">
                  <Typography
                    variant="body3"
                    color={formatColor(neutral.white)}
                  >
                    Git
                  </Typography>
                </Link>
                {
                  <Typography
                  variant="body3"
                    sx={{
                      color: formatColor(neutral.white)
                    }}
                  >
                    <Link href="#/whitelist" sx={{ color: "inherit" }}>
                      Sale
                    </Link>
                  </Typography>
                }
              </Box>
            </SwipeableDrawer>
          </Toolbar>
        </>
      ) : (
        <Toolbar sx={{}}>
          <Box
            component="img"
            src="images/ip_green.svg"
            width={{ xs: 25, md: 50 }}
            height={{ xs: 25, md: 50 }}
          ></Box>
          <Box sx={{ gap: 5 }} display="flex" ml={5}>
            <Typography
              sx={{
                color: formatColor(neutral.gray2),
                display: "flex",
                zIndex: 10,
                variant: "body3",
                alignItems: "center",
              }}
            >
              <Link href="#/whitepaper" sx={{ color: "inherit" }}>
                Whitepaper
              </Link>
            </Typography>
            <Typography
              sx={{
                color: formatColor(neutral.gray2),
                display: "flex",
                variant: "body3",
                alignItems: "center",
              }}
            >
              <Link href="#/docs" sx={{ color: "inherit" }}>
                Docs
              </Link>
            </Typography>
            <Typography
              sx={{
                color: formatColor(neutral.gray2),
                display: "flex",
                variant: "body3",
                alignItems: "center",
              }}
            >
              <Link
                href="https://gfx.cafe/ip/contracts"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                Git
              </Link>
            </Typography>
            {
              <Typography
                sx={{
                  color: formatColor(neutral.gray2),
                  display: "flex",
                  variant: "body3",
                  alignItems: "center",
                }}
              >
                <Link href="#/whitelist" sx={{ color: "inherit" }}>
                  Sale
                </Link>
              </Typography>
            }
          </Box>

          <Box sx={{ gap: 0 }} display="absolute" mr={0} ml="auto">
            <Button
              onClick={toApp}
              variant="cta"
              sx={{
                color: formatColor(neutral.white),
                backgroundColor: formatColor(blue.blue1),
                padding: 3,
                paddingLeft: 3,
                paddingRight: 3,
                "&:hover": {
                  backgroundColor: formatColor(blue.blue10),
                  backgroundImage: "none",
                },
              }}
            >
              Launch App ➝
            </Button>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
};

const LandingPage: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
      console.log(scrollTop, document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <>
      <Box
        sx={{
          marginX: "auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TopBar
          sx={{
            transition: "top 0.6s",
            top:
              scrollTop < 30 ||
              scrollTop >
                document.documentElement.scrollHeight - window.innerHeight - 30
                ? "0"
                : -160,
            backgroundColor:
              scrollTop < 50 ? "transparent" : formatColor(neutral.white),
          }}
        />

        <Splash />
        <Cards />
        <Fractional />
        <Highlights />
        <Values />
        <Community />
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
