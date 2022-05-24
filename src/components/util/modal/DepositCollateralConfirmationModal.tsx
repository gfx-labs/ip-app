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

export const DepositCollateralConfirmationModal = () => {
  const { type, setType, collateralToken, collateralDepositAmount } = useModalContext();
  const { provider, currentAccount } = useWeb3Context();
  const [loading, setLoading] = useState(false)
  const { vaultAddress } = useVaultDataContext();
  const handleDepositConfirmationRequest = async () => {
    setLoading(true)

    await useDepositCollateral(
      collateralDepositAmount.toLocaleString(),
      collateralToken.address,
      provider?.getSigner(currentAccount)!,
      vaultAddress!
    );

    setLoading(false)

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
              ${collateralToken.value}
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
          {collateralToken.name} deposit: {collateralDepositAmount}
        </Typography>
      </Box>

      <DisableableModalButton
        text="Confirm Deposit"
        disabled={false}
        onClick={handleDepositConfirmationRequest}
        loading={loading}
      />
    </BaseModal>
  );
};
