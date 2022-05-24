import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseSwitch } from "../switch";
import { BaseModal } from "./BaseModal";
import { DepositCollateralContent } from "./ModalContent/DepositCollateralContent";
import { WithdrawCollateralContent } from "./ModalContent/WithdrawCollateralContent";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";

export const DepositWithdrawCollateralModal = () => {
  const { token, deposit, withdraw, type, setType } = useModalContext();

  const isDepositType = type === ModalType.DepositCollateral;

  const [tokenName, setTokenName] = useState("");
  const [tokenValue, setTokenValue] = useState("0");
  const [tokenWalletBalance, setTokenWalletBalance] = useState("0");
  const [depositAmount, setDepositAmount] = useState("");

  const [tokenVaultBalance, setTokenVaultBalance] = useState("0");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    if (token) {
      setTokenName(token?.ticker);
      setTokenValue(token.value.toLocaleString());
      setTokenWalletBalance(token.wallet_balance.toLocaleString());
      setTokenVaultBalance(token.vault_balance!.toLocaleString());
    }
  }, [token]);

  const onSwitch = (val: boolean) =>
    setType(val ? ModalType.DepositCollateral : ModalType.WithdrawCollateral);

  return (
    <BaseModal
      open={
        type === ModalType.DepositCollateral ||
        type === ModalType.WithdrawCollateral
      }
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
          src={`images/${tokenName}.svg`}
          alt={tokenName}
        ></Box>
        <Box>
          <Typography variant="body1" color={formatColor(neutral.gray3)}>
            1 {tokenName}
          </Typography>
          <Typography variant="h3" color="text.secondary" mb={1}>
            ${tokenValue}
          </Typography>
        </Box>
      </Box>

      {isDepositType ? (
        <DepositCollateralContent />
      ) : (
        <WithdrawCollateralContent />
      )}
    </BaseModal>
  );
};
