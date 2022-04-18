import { Button, Typography } from "@mui/material";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { WalletModal } from "../modal";

export const ConnectWalletButton = () => {
  const { setIsWalletModalOpen } = useWalletModalContext();

  return (
    <>
      <Button onClick={() => setIsWalletModalOpen(true)}>
        <Typography>Connect wallet</Typography>
      </Button>
      <WalletModal />
    </>
  );
};
