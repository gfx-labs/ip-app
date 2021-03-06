import { Box, Button, Typography, Link, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { WalletType } from "../../libs/web3-data-provider/WalletOptions";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

export const WalletModalContent = () => {
  const { connectWallet, loading } = useWeb3Context();
  const { setIsWalletModalOpen } = useWalletModalContext();
  const [errorConnecting, setErrorConnecting] = useState(false);

  const connectToWallet = async (walletType: WalletType) => {
    try {
      await connectWallet(walletType);

      setIsWalletModalOpen(false);
    } catch (err) {
      console.error(err);
      setErrorConnecting(true);
    }
  };
  return (
    <Box>
      <Typography
        variant="body3"
        position="relative"
        top={-8}
        textAlign="center"
      >
        Connect Wallet
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Button
            variant="outlined"
            sx={{
              justifyContent: "start",
              my: 2,
              pl: 3,
            }}
            size="large"
            onClick={() => connectToWallet(WalletType.INJECTED)}
          >
            <Box
              component="img"
              src="images/metamask.svg"
              width={26}
              mr={2}
            ></Box>{" "}
            Browser wallet
          </Button>

          <Button
            variant="outlined"
            sx={{
              justifyContent: "start",
              mb: 2,
              pl: 3,
            }}
            size="large"
            onClick={() => connectToWallet(WalletType.WALLET_LINK)}
          >
            <Box
              component="img"
              src="images/coinbase.svg"
              width={26}
              mr={2}
            ></Box>
            Coinbase
          </Button>

          <Button
            variant="outlined"
            sx={{
              justifyContent: "start",
              mb: 2,
              pl: 3,
            }}
            size="large"
            onClick={() => connectToWallet(WalletType.WALLET_CONNECT)}
          >
            <Box
              component="img"
              src="images/wallet_connect.svg"
              width={26}
              mr={2}
            ></Box>
            Wallet Connect
          </Button>
          {errorConnecting && (
            <Typography color="error" variant="body2" textAlign="center">
              Error connecting wallet. Please try another wallet.
            </Typography>
          )}
        </Box>
      )}

      <Box mt={0}>
        <Typography variant="label2">
          By connecting to Interest Protocol you agree to GFX Labs'{" "}
          <Link href="#/terms" target="_blank">
            Terms of Use
          </Link>{" "}
          and acknowledge you have read and understand the{" "}
          <Link href="#/whitepaper" target="_blank">
            Interest Protocol Whitepaper.
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
