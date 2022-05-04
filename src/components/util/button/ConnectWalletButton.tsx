import { ButtonProps, Button, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

import { WalletModal } from "../modal";
import { addressShortener } from "../text/";

export const ConnectWalletButton = () => {
  const { setIsWalletModalOpen } = useWalletModalContext();

  const isLight = useLight();

  const { connected, disconnectWallet, error, currentAccount } =
    useWeb3Context();

  const StyledConnectButton = (props: ButtonProps) => {
    const { onClick, children } = props;
    return (
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "fit-content",
          backgroundColor: isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.gray7),
          color: isLight
            ? formatColor(neutral.black)
            : formatColor(neutral.white),
          "&:hover": {
            backgroundColor: formatColor(neutral.gray5),
            border: "none",
          },
        }}
        size="medium"
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      {connected ? (
        <StyledConnectButton onClick={disconnectWallet}>
          <Typography fontWeight={600}>
            {addressShortener(currentAccount)}
          </Typography>
        </StyledConnectButton>
      ) : (
        <>
          <StyledConnectButton onClick={() => setIsWalletModalOpen(true)}>
            <Typography>Connect wallet</Typography>
          </StyledConnectButton>
          <WalletModal />
        </>
      )}
    </>
  );
};
