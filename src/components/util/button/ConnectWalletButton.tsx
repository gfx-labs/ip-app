import {
  ButtonProps,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

import { WalletModal } from "../modal";
import { addressShortener } from "../text/";

interface ConnectWalletButtonProps {
  invertLight?: boolean
}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const {invertLight = false} = props;

  const { setIsWalletModalOpen } = useWalletModalContext();

  let isLight = useLight();

  if (invertLight) {
    isLight = !isLight;
  }

  const { connected, disconnectWallet, error, currentAccount } =
    useWeb3Context();

  const StyledConnectButton = (props: ButtonProps) => {
    const { onClick, children, sx } = props;
    return (
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.gray7),
          color: isLight
            ? formatColor(neutral.black)
            : formatColor(neutral.white),
          "&:hover": {
            backgroundColor: isLight
              ? formatColor(neutral.gray5)
              : formatColor(neutral.gray4),
            border: "none",
          },
          ...sx,
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
        <Accordion
          sx={{ borderRadius: "10px !important", boxShadow: "none" }}
          disableGutters
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            sx={{
              padding: 0,
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
            }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <StyledConnectButton>
              <Typography fontWeight={600}>
                {addressShortener(currentAccount)}
              </Typography>
            </StyledConnectButton>
          </AccordionSummary>
          <AccordionDetails sx={{ position: "absolute", px: 0, width: "100%" }}>
            <StyledConnectButton
              onClick={disconnectWallet}
              sx={{ width: "100%", justifyContent: "center" }}
            >
              <Typography variant="h6">Disconnect</Typography>
            </StyledConnectButton>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <StyledConnectButton onClick={() => setIsWalletModalOpen(true)}>
            <Typography variant="h6" whiteSpace="nowrap">Connect wallet</Typography>
          </StyledConnectButton>
          <WalletModal />
        </>
      )}
    </>
  );
};
