import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseSwitch } from "../switch";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { DepositUSDCContent } from "./ModalContent/DepositUSDCContent";
import { WithdrawUSDCContent } from "./ModalContent/WithdrawUSDCContent";
import {useVaultDataContext} from "../../libs/vault-data-provider/VaultDataProvider";

export const DepositWithdrawUSDCModal = () => {
  const {token, deposit, withdraw, type, setType } = useModalContext();

  const isDepositType = type === ModalType.DepositUSDC;

  const [tokenName, setTokenName] = useState("");
  const [tokenValue, setTokenValue] = useState("0");
  const [tokenWalletBalance, setTokenWalletBalance] = useState("0");
  const [depositAmount, setDepositAmount] = useState("");

  const [tokenVaultBalance, setTokenVaultBalance] = useState("0");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    if(token){
      setTokenName(token?.ticker)
      setTokenValue(token.value.toLocaleString())
      setTokenWalletBalance(token.wallet_balance.toLocaleString())
      setTokenVaultBalance(token.vault_balance!.toLocaleString())
    }},[token])

  const onSwitch = (val: boolean) => setType(val ? ModalType.DepositUSDC : ModalType.WithdrawUSDC);

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
        <DepositUSDCContent/>
      ) : (
        <WithdrawUSDCContent/>
      )}
    </BaseModal>
  );
};
