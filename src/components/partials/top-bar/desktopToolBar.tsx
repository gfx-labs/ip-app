import { formatColor, neutral } from "../../../theme";
import { Box, Link as MuiLink, Toolbar, Button } from "@mui/material";
import React, { MouseEvent, useRef, useState } from "react";

import { Link } from "../../util/link";
import { WalletType } from "../../libs/web3-data-provider/WalletOptions";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { ConnectWalletButton } from '../../util/button'

const nav = [
    { label: "Projects", pathname: "/projects" },
    { label: "Careers", pathname: "/careers" },
    { label: "Contact", pathname: "/contact" },
];

export const DesktopToolBar = () => {
    const { connectWallet, connected, disconnectWallet, error } = useWeb3Context();
    //desktop menu config
    return (
        <Toolbar>
            <Link to="/" role="heading" aria-level={1}>
                <Box
                    component="img"
                    src="images/GFX_Logo.svg"
                    width={85}
                    height={99}
                ></Box>
            </Link>

            <Box display="flex" mr={-1} ml="auto">
                <ConnectWalletButton />

                <span>Status: {connected ? '🟢' : error ? '🔴' : '🟠'}</span>
                {connected ? (
                    <Button
                        variant="outlined"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            mb: "8px",
                        }}
                        size="large"
                        onClick={disconnectWallet}
                    >
                        Disconnect Wallet
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            mb: "8px",
                        }}
                        size="large"
                        onClick={() => connectWallet(WalletType.INJECTED)}
                    >
                        Connect browser wallet
                    </Button>
                )}

                <Box
                    mx={3}
                    display={{ xs: "none", sm: "flex", alignItems: "center" }}
                    role="nav"
                >
                    {nav.map(({ label, pathname }) => {
                        return (
                            <span key={label}>
                                <MuiLink
                                    component={Link}
                                    key={pathname}
                                    to={pathname}
                                    variant="h5"
                                    color={formatColor(neutral.gray1)}
                                    paddingBottom={1}
                                    marginLeft={5}
                                    sx={{
                                        "&:hover": {
                                            color: "text.tertiary",
                                        },
                                    }}
                                >
                                    {label}
                                </MuiLink>
                            </span>
                        );
                    })}
                </Box>
            </Box>
        </Toolbar>
    );
};
