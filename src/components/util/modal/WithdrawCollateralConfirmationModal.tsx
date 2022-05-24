import { Box, Typography } from "@mui/material";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { DisableableModalButton } from "../button/DisableableModalButton";
import { useWithdrawCollateral } from "../../../hooks/useWithdraw";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";

export const WithdrawCollateralConfirmationModal = () => {
  const { type, setType, withdraw } = useModalContext();
  const rolodex = useRolodexContext();

  const isLight = useLight();

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
            src={`images/${withdraw.token.ticker}.svg`}
            alt={withdraw.token.ticker}
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="h3" color="text.secondary">
              ${withdraw.token.value * Number(withdraw.amountFrom)}
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
          {withdraw.token.name} withdraw: {withdraw.amountFrom}
        </Typography>
      </Box>

      <DisableableModalButton
        text="Confirm Withdraw"
        disabled={false}
        onClick={() => useWithdrawCollateral(withdraw.amountFrom, rolodex!)}
      />
    </BaseModal>
  );
};
