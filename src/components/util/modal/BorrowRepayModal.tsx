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
import { BorrowContent } from "./ModalContent/BorrowContent";
import { RepayContent } from "./ModalContent/RepayContent";

export const BorrowRepayModal = () => {
  const { type, setType } = useModalContext();

  const currType = type === ModalType.Borrow;

  const [tokenName, setTokenName] = useState("WBTC");
  const [tokenValue, setTokenValue] = useState("39900");
  const [tokenWalletBalance, setTokenWalletBalance] = useState("2");
  const [borrowAmount, setBorrowAmount] = useState("");

  const [tokenVaultBalance, setTokenVaultBalance] = useState("32");
  const [repayAmount, setRepayAmount] = useState("");

  const onSwitch = (val: boolean) => setType(val ? ModalType.Borrow : ModalType.Repay);

  return (
    <BaseModal
      open={type === ModalType.Borrow || type === ModalType.Repay}
      setOpen={() => {
        setType(null);
      }}
    >
      <BaseSwitch
        option1="Borrow"
        option2="Repay"
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
        <BorrowContent
          tokenName={tokenName}
          tokenValue={tokenValue}
          tokenWalletBalance={tokenWalletBalance}
          borrowAmount={borrowAmount}
          setBorrowAmount={setBorrowAmount}
        />
      ) : (
        <RepayContent
          tokenName={tokenName}
          tokenValue={tokenValue}
          tokenWalletBalance={tokenWalletBalance}
          repayAmount={repayAmount}
          setRepayAmount={setRepayAmount}
        />
      )}
    </BaseModal>
  );
};
