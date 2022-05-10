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
import { DepositContent } from "./ModalContent/DepositContent";
import { WithdrawContent } from "./ModalContent/WithdrawContent";

export const DepositWithdrawModal = () => {
  const { type, setType } = useModalContext();

  const currType = type === ModalType.Deposit;

  const [tokenName, setTokenName] = useState("WBTC");
  const [tokenValue, setTokenValue] = useState("39900");
  const [tokenWalletBalance, setTokenWalletBalance] = useState("2");
  const [depositAmount, setDepositAmount] = useState("");

  const [tokenVaultBalance, setTokenVaultBalance] = useState("32");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const onSwitch = (val: boolean) => setType(val ? ModalType.Deposit : ModalType.Withdraw);

  return (
    <BaseModal
      open={type === ModalType.Deposit || type === ModalType.Withdraw}
      setOpen={() => {
        setType(null);
      }}
    >
      <BaseSwitch
        option1="Deposit"
        option2="Withdraw"
        onOptionChange={onSwitch}
        defaultIsOption1={currType}
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
          src={`images/${tokenName}.png`}
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

      {currType ? (
        <DepositContent
          tokenName={tokenName}
          tokenValue={tokenValue}
          tokenWalletBalance={tokenWalletBalance}
          depositAmount={depositAmount}
          setDepositAmount={setDepositAmount}
        />
      ) : (
        <WithdrawContent
          tokenName={tokenName}
          tokenValue={tokenValue}
          tokenVaultBalance={tokenVaultBalance}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
        />
      )}
    </BaseModal>
  );
};
