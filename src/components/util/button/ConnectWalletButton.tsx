import { Button, Typography } from "@mui/material";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { WalletModal } from "../modal";

export const ConnectWalletButton = () => {
    const { setIsWalletModalOpen } = useWalletModalContext();
    return (
        <>
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
                onClick={() => setIsWalletModalOpen(true)
                }>
                <Typography>Connect wallet</Typography>
            </Button>
            <WalletModal />
        </>
    );
};
