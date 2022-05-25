import { Box, Typography } from "@mui/material";
import { formatColor, neutral } from "../../../theme";
import { useState } from "react";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { DisableableModalButton } from "../button/DisableableModalButton";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { useDepositCollateral } from "../../../hooks/useDeposit";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";
import {locale} from "../../../locale";

export const DepositCollateralConfirmationModal = () => {
  const { type, setType, collateralToken, collateralDepositAmount, setCollateralDepositAmount} =
    useModalContext();
  const { provider, currentAccount } = useWeb3Context();
  const [loading, setLoading] = useState(false);
  const [loadmsg, setLoadmsg] = useState("");
  const { vaultAddress } = useVaultDataContext();
  const handleDepositConfirmationRequest = async () => {
    setLoading(true);
    setLoadmsg(locale("CheckWallet"))
    const attempt = await useDepositCollateral(
      collateralDepositAmount,
      collateralToken.address,
      provider?.getSigner(currentAccount)!,
      vaultAddress!
    );
    setCollateralDepositAmount("")
    setLoadmsg(locale("TransactionPending"))
    await attempt.wait()
    setLoadmsg("")
    setLoading(false);
  };

  const isLight = useLight();

  return (
    <BaseModal
      open={type === ModalType.DepositCollateralConfirmation}
      setOpen={() => {
        setType(ModalType.DepositCollateral);
      }}
    >
      <Typography
        variant="body1"
        fontWeight={600}
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        Confirm Deposit
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
          <Box
            component="img"
            width={36}
            height={36}
            src={`images/${collateralToken.ticker}.svg`}
            alt={collateralToken.ticker}
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="h3" color="text.secondary">
              ${collateralToken.value.toFixed(2)} ({collateralDepositAmount})
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        my={5}
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        <Typography variant="body1" fontWeight={500} mb={1}>
          {collateralToken.name} deposit:
        </Typography>
      </Box>

      <DisableableModalButton
        text="Confirm Deposit"
        disabled={false}
        onClick={handleDepositConfirmationRequest}
        loading={loading}
        load_text={loadmsg}
      />
    </BaseModal>
  );
};
