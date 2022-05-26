import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { DisableableModalButton } from "../button/DisableableModalButton";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { useWithdrawUSDC } from "../../../hooks/useWithdraw";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import {useWeb3Context} from "../../libs/web3-data-provider/Web3Provider";
import {BN} from "../../../easy/bn";
import {locale} from "../../../locale";

export const WithdrawUSDCConfirmationModal = () => {
  const { type, setType, USDC } = useModalContext();
  const rolodex = useRolodexContext()
  const [loading, setLoading] = useState(false)
  const [loadmsg, setLoadmsg] = useState("");
  const { provider, currentAccount , currentSigner } = useWeb3Context();
  const isLight = useLight();


  const handleWithdrawUSDC = async () => {
    let withdrawAmount = BN(USDC.amountToWithdraw)
    const formattedUSDCAmount = withdrawAmount.mul(1e6)
    if(rolodex) {
      setLoading(true)
      try {
        setLoadmsg(locale("CheckWallet"))
        const txn = await rolodex.USDI.connect(currentSigner!).withdraw(formattedUSDCAmount)
        setLoadmsg(locale("TransactionPending"))
        await txn?.wait()
      }catch(e){
        console.log(e)
      }
      setLoading(false)
    }
  };

  return (
    <BaseModal
      open={type === ModalType.WithdrawUSDCConfirmation}
      setOpen={() => {
        setType(null);
      }}
    >
      <Typography
        variant="body1"
        fontWeight={600}
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        Confirm Withdraw
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          mt: 3,
          py: 2,
          borderRadius: "10px",
          columnGap: 4,
          backgroundColor: isLight
            ? formatColor(neutral.gray5)
            : formatColor(neutral.gray7),
        }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="h3" color="text.secondary">
              {'$'+USDC.amountToWithdraw}
            </Typography>
          </Box>

          <Box
            component="img"
            width={36}
            height={36}
            src={`images/USDI.svg`}
            alt="USDI"
            marginLeft={3}
          ></Box>
        </Box>

        <ForwardIcon sx={{width: 15, height: 15}} strokecolor={formatColor(neutral.gray3)}/>

        <Box display="flex" alignItems="center">
          <Box
            component="img"
            width={36}
            height={36}
            src={`images/${USDC.token.ticker}.svg`}
            alt={USDC.token.ticker}
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="h3" color="text.secondary">
              {'$'+USDC.amountToWithdraw}
            </Typography>
          </Box>
        </Box>

      </Box>

      <Box>
        <Typography
          variant="body1"
          color={formatColor(neutral.gray3)}
          fontStyle="italic"
          fontWeight={500}
          textAlign="center"
        >
          1 {USDC.token.ticker} = 1 USDi ($1){" "}
        </Typography>
      </Box>

      <Box
        my={5}
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        <Typography variant="body1" fontWeight={500} mb={1}>
          USDI to withdraw: {USDC.amountToWithdraw}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          USDC to receive: {USDC.amountToWithdraw}
        </Typography>
      </Box>

      <DisableableModalButton
        text="Confirm Withdraw"
        disabled={false}
        onClick={handleWithdrawUSDC}
        loading={loading}
        load_text={loadmsg}
      />
    </BaseModal>
  );
};
