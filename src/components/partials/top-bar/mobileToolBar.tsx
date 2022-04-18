import {
    Box,
    Button,
    Link as MuiLink,
    SwipeableDrawer,
    Toolbar,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { MenuIcon } from "../../icons/misc/menuIcon";
import { Link } from "../../util/link";

const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

const mobileNav = [
    { label: "projects", pathname: "/projects" },
    { label: "careers", pathname: "/careers" },
    { label: "contact", pathname: "/contact" },
];

export const MobileToolBar = () => {
    // mobile menu config
    const [navMenuOpen, setNavMenuOpen] = useState(false);
    const navMenuButtonRef = useRef<HTMLButtonElement>(null);

    const dispatch = useDispatch();

    return (
        <Toolbar
            sx={{
                px: 1.5,
                justifyContent: {
                    xs: "space-between",
                },
            }}
        >
            <MuiLink
                component={Link}
                to="/"
                role="heading"
                aria-level={1}
                display="flex"
            >
                <Box
                    component="img"
                    src="/images/GFX_Logo.svg"
                    width={45}
                    height={45}
                ></Box>
            </MuiLink>

            <Button
                ref={navMenuButtonRef}
                sx={{
                    py: 1,
                    display: "flex",
                }}
                variant="text"
                onClick={() => setNavMenuOpen(true)}
            >
                <MenuIcon sx={{ width: 24, height: 24 }} />
            </Button>

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
                        py: "10px",
                        pt: 11,
                        height: "100%",
                        width: "100%",
                        backgroundColor: "background.quad",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                    },
                }}
                sx={{}}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                transitionDuration={500}
            >
                {mobileNav.map(({ label, pathname }) => {
                    return (
                        <MuiLink
                            component={Link}
                            key={pathname}
                            to={pathname}
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ px: 3, mb: 3, fontWeight: 700 }}
                            onClick={() => setNavMenuOpen(false)}
                        >
                            {label}
                        </MuiLink>
                    );
                })}

                <Button
                    onClick={() => {
                        setNavMenuOpen(false);
                    }}
                >
                    <Box
                        component="img"
                        src="/images/close_x.svg"
                        height={20}
                        width={20}
                        sx={{
                            mt: 20,
                        }}
                    ></Box>
                </Button>
            </SwipeableDrawer>
        </Toolbar>
    );
};
