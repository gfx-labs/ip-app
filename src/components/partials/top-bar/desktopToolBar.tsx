import { formatColor, neutral } from "../../../theme";
import { Box, Link as MuiLink, Toolbar, Button, Typography } from "@mui/material";
import React, { MouseEvent, useRef, useState } from "react";

import { Link } from "../../util/link";
import { WalletType } from "../../libs/web3-data-provider/WalletOptions";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { ConnectWalletButton } from '../../util/button'
import { BaseSwitch } from "../../util/switch";

const nav = [
    { label: "Dashboard", pathname: "dashboard" },
    { label: "Docs", pathname: "docs" },
];

export const DesktopToolBar = () => {
    const { connectWallet, connected, disconnectWallet, error } = useWeb3Context();
    //desktop menu config
    return (
        <Toolbar>
            <Link to="./" role="heading" aria-level={1}>
                <Box
                    component="img"
                    src="images/usdi.svg"
                    width={85}
                    height={99}
                ></Box>
            </Link>
            <Box display="flex" ml={6}>
                    <BaseSwitch option1="App" option2="Governance" onOptionChange={console.log}/>
                <Box display="flex" alignItems="center">
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
                            size="medium"
                            onClick={disconnectWallet}
                        >
                            <Typography>Disconnect wallet</Typography>
                        </Button>
                    ) : <ConnectWalletButton />}
                </Box>
            </Box>
            <Box display="flex" mr={-1} ml="auto">
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

                <BaseSwitch option1="light" option2="dark" onOptionChange={console.log}/>

            </Box>
        </Toolbar>
    );
};
