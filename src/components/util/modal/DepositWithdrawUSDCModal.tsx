import { Box, Typography } from "@mui/material";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseSwitch } from "../switch";
import { BaseModal } from "./BaseModal";
import { DepositUSDCContent } from "./ModalContent/DepositUSDCContent";
import { WithdrawUSDCContent } from "./ModalContent/WithdrawUSDCContent";

export const DepositWithdrawUSDCModal = () => {
  const { type, setType } = useModalContext();

  const isDepositType = type === ModalType.DepositUSDC;

  const onSwitch = (val: boolean) =>
    setType(val ? ModalType.DepositUSDC : ModalType.WithdrawUSDC);

  return (
    <BaseModal
      open={type === ModalType.DepositUSDC || type === ModalType.WithdrawUSDC}
      setOpen={() => {
        setType(null);
      }}
    >
      <BaseSwitch
        option1="Deposit"
        option2="Withdraw"
        onOptionChange={onSwitch}
        defaultIsOption1={isDepositType}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <Box
          component="img"
          width={80}
          height={80}
          src={`images/USDC.svg`}
          alt="USDC.svg"
        ></Box>
        <Box>
          <Typography variant="body1" color={formatColor(neutral.gray3)}>
            1 USDC
          </Typography>
          <Typography variant="h3" color="text.primary" mb={1}>
            $1
          </Typography>
        </Box>
      </Box>

      {isDepositType ? <DepositUSDCContent /> : <WithdrawUSDCContent />}
    </BaseModal>
  );
};
