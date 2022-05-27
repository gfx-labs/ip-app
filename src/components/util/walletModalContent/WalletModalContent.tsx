import { Box, Button } from "@mui/material";
import React from "react";
import { WalletType } from "../../libs/web3-data-provider/WalletOptions";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

export const WalletModalContent = () => {
    const { connectWallet } = useWeb3Context();
    return (
        <Box>
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
                Browser wallet
            </Button>

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
                onClick={() => connectWallet(WalletType.WALLET_LINK)}
            >
                Coinbase
            </Button>

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
                onClick={() => connectWallet(WalletType.WALLET_CONNECT)}
            >
                Wallet Connect
            </Button>

            {/* <Button
                variant="outlined"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    mb: "8px",
                }}
                size="large"
                onClick={() => connectWallet(WalletType.FRAME)}
            >
                Frame
            </Button> */}

        </Box>
    );
};


/*
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
                onClick={() => connectWallet(WalletType.TORUS)}
            >
                TORUS
            </Button>
            */