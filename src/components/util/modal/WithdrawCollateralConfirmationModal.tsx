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
import { useWithdrawCollateral } from "../../../hooks/useWithdraw";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";

export const WithdrawCollateralConfirmationModal = () => {
  const { type, setType, collateralToken, collateralWithdrawAmount } =
    useModalContext();
  const { provider, currentAccount } = useWeb3Context();
  const { vaultAddress } = useVaultDataContext();
  const [loading, setLoading] = useState(false);
  const isLight = useLight();

  const handleCollateralWithdraw = async () => {
    setLoading(true);

    await useWithdrawCollateral(
      collateralWithdrawAmount,
      collateralToken.address,
      vaultAddress!,
      provider!.getSigner(currentAccount!)
    );
    setLoading(false);
  };

  return (
    <BaseModal
      open={type === ModalType.WithdrawCollateralConfirmation}
      setOpen={() => {
        setType(ModalType.WithdrawCollateral);
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
              ${collateralToken.value * Number(collateralWithdrawAmount)}
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
          {collateralToken.name} withdraw: {collateralWithdrawAmount}
        </Typography>
      </Box>

      <DisableableModalButton
        text="Confirm Withdraw"
        disabled={false}
        onClick={handleCollateralWithdraw}
        loading={loading}
      />
    </BaseModal>
  );
};
