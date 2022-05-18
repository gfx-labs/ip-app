import { Box, Button, Typography, useTheme } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatGradient, gradient, formatColor, neutral } from "../../../theme";
import { SwapContainer } from "../swap";
import { TitleText } from "../text";
import { useRolodexContext } from "../../../components/libs/rolodex-data-provider/rolodexDataProvider";
import { useTotalSupply } from "../../../hooks/useTotalSupply";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { useERC20BalanceOf } from "../../../hooks/useERC20BalanceOf";
import { getTokenFromTicker } from "../../../chain/tokens";

export const ProtocolStatsCard = () => {
  const isLight = useLight();
  const [totalSupply, setTotalSupply] = useState<string | null>(null);
  const [totalUSDCDeposited, setTotalUSDCDeposited] =
    useState<string | null>(null);
  const { connected, chainId } = useWeb3Context();
  const { setIsWalletModalOpen } = useWalletModalContext();
  
  const usdc = getTokenFromTicker(chainId, 'USDC')

  const rolodex = useRolodexContext();

  useEffect(() => {
    if (rolodex) {
      useTotalSupply(rolodex).then((res) => setTotalSupply(res));
      useERC20BalanceOf(rolodex, usdc?.address).then((res) =>
        setTotalUSDCDeposited(res)
      );
    }
  }, [rolodex]);

  return (
    <Box
      sx={{
        padding: { xs: 3, md: 6 },
        backgroundImage: `linear-gradient(${formatGradient(
          isLight ? gradient.gradient1 : gradient.gradient2
        )})`,
        borderRadius: { xs: 5, md: 17 },
      }}
    >
      <Box
        about="Minted and Deposited stats"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 2,
          marginBottom: 4,
        }}
      >
        <TitleText title="USDi Minted" text={totalSupply} />
        <TitleText title="USDC Deposited" text={totalUSDCDeposited} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Box
          component="img"
          src="images/reserve_ratio.png"
          width={17}
          height={18}
          marginRight={1}
        />
        <Typography variant="caption">Reserve Ratio: 52.12%</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <SwapContainer />
      </Box>

      {connected ? (
        <Button variant="contained" sx={{ color: formatColor(neutral.white) }}>
          Deposit
        </Button>
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
