import { Box, useTheme, Button } from "@mui/material";
import {useEffect} from 'react';

import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { useSwapTokenContext } from "../../libs/swap-token-provider/SwapTokenProvider";
import { TokenSelect } from "./TokenSelect";
import { useTokenAmountInput } from "./useTokenAmountInput";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { SupportedTokens } from "../../../chain/tokens";
import { useModalContext,ModalType } from "../../libs/modal-content-provider/ModalContentProvider";

export const SwapContainer = () => {
  const isLight = useLight();

  const theme = useTheme();

  const [token1, token2, swapTokenPositions] = useSwapTokenContext();
  const { setIsWalletModalOpen } = useWalletModalContext();
  const { setType, updateDeposit, updateWithdraw } = useModalContext();
  
  const { connected } = useWeb3Context();

  const [
    token1Amount,
    setToken1Amount,
    token2Amount,
    setToken2Amount,
    swapTokenAmount,
  ] = useTokenAmountInput();

  const swapTokens = () => {
    swapTokenAmount();
    swapTokenPositions();
  };

  useEffect(() => {
    updateDeposit('amountFrom', token1Amount)
    updateWithdraw('amountFrom', token1Amount)
  }, [token1Amount])
  
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: 2,
          rowGap: 1,
          mb: 2,
          position: "relative",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        }}
      >
        <TokenSelect
          token={token1}
          tokenAmount={token1Amount}
          setTokenAmount={setToken1Amount}
        />

        <Button
          sx={{
            padding: 0,
            minWidth: "auto",
            backgroundColor: isLight
              ? formatColor(neutral.gray6)
              : formatColor(neutral.gray7),
            position: "absolute",
            width: 42,
            height: 30,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: isLight
              ? formatColor(neutral.gray6)
              : formatColor(neutral.gray8),
          }}
          onClick={swapTokens}
        >
          <ForwardIcon
            strokecolor={
              isLight ? formatColor(neutral.black) : formatColor(neutral.white)
            }
            sx={{
              width: 14,
              height: 13,
              [theme.breakpoints.down("md")]: {
                transform: "rotate(90deg)",
              },
            }}
          />
        </Button>

        <TokenSelect
          token={token2}
          tokenAmount={token2Amount}
          setTokenAmount={setToken2Amount}
        />
      </Box>

      {connected ? (
        token1.ticker === SupportedTokens.USDC ? (
          <Button
            variant="contained"
            sx={{ color: formatColor(neutral.white) }}
            onClick={() => setType(ModalType.DepositConfirmation)}
          >
            Deposit
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ color: formatColor(neutral.white) }}
            disabled={!token1.balance}
            onClick={() => setType(ModalType.WithdrawConfirmation)}
          >
            Withdraw
          </Button>
        )
      ) : (
        <Button
          variant="contained"
          onClick={() => setIsWalletModalOpen(true)}
          sx={{ color: formatColor(neutral.white) }}
        >
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};
