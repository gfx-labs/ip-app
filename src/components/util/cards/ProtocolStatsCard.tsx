import { Box, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { blue, formatGradient, gradient, formatColor } from "../../../theme";
import { SwapContainer } from "../swap";
import { TitleText } from "../text";
import { useRolodexContext } from "../../../components/libs/rolodex-data-provider/RolodexDataProvider";
import { useTotalSupply } from "../../../hooks/useTotalSupply";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { useReserveRatio } from "../../../hooks/useReserveRatio";
import {Contract} from "ethers";
import {BN} from "../../../easy/bn";

export const ProtocolStatsCard = () => {
  const isLight = useLight();
  const rolodex = useRolodexContext();
  const [totalSupply, setTotalSupply] = useState<string>('');
  const [totalUSDCDeposited, setTotalUSDCDeposited] =
    useState<string>('');
  const [reserveRatio, setReserveRatio] = useState('0')
  const { connected, dataBlock, currentSigner, chainId} = useWeb3Context();
  const { setIsWalletModalOpen } = useWalletModalContext();
  useEffect(() => {
    if (rolodex && rolodex.USDC && rolodex.addressUSDI) {
      rolodex.USDC.balanceOf(rolodex.addressUSDI).then((val)=>{
        setTotalUSDCDeposited(val.div(BN("1e6")).toLocaleString())
      })
      useTotalSupply(rolodex).then(res=>{
        setTotalSupply(res)
      })
      useReserveRatio(rolodex).then(res=>{
        setReserveRatio(res)
      })
    }
  }, [rolodex, dataBlock, chainId]);

  const mintTestUSDC = ()=>{
    if(rolodex && rolodex.addressUSDC && currentSigner){
      const c = new Contract(rolodex.addressUSDC,["function publicMint() external"],rolodex.provider)
      c.connect(currentSigner).publicMint()
    }
  }

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
        <TitleText title="USDi Total Supply" text={Math.round(Number(totalSupply)).toLocaleString()} />
        <TitleText title="USDC in Reserve" text={Math.round(Number(totalUSDCDeposited)).toLocaleString()} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Box
          component="img"
          src="images/reserve_ratio.png"
          width={17}
          height={18}
          marginRight={1}
        />
        <Typography variant="label2" color={formatColor(blue.blue1)}>Reserve Ratio: {reserveRatio}%</Typography>
      </Box>

      <SwapContainer />

    </Box>
  );
};
