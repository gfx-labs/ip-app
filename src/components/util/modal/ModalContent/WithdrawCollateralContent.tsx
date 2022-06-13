import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { round } from "../../../../easy/bn";

import { blue, formatColor, neutral } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { SwapIcon } from "../../../icons/misc/SwapIcon";
import {
  ModalType,
  useModalContext,
} from "../../../libs/modal-content-provider/ModalContentProvider";
import { useVaultDataContext } from "../../../libs/vault-data-provider/VaultDataProvider";
import { useLight } from "../../../../hooks/useLight";

export const WithdrawCollateralContent = () => {
  const {
    setType,
    collateralToken,
    setCollateralWithdrawAmount,
    collateralWithdrawAmount,
  } = useModalContext();

  const isLight = useLight();
  const { borrowingPower, accountLiability, tokens } = useVaultDataContext();

  const [inputAmount, setInputAmount] = useState("0");

  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);
  const [isMoneyValue, setIsMoneyValue] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [newBorrowingPower, setNewBorrowingPower] = useState(0);
  const ltv = tokens![collateralToken.ticker].token_LTV || 0;

  useEffect(() => {
    setDisabled(Number(inputAmount) <= 0);
    if (isMoneyValue) {
      setCollateralWithdrawAmount(
        (Number(inputAmount) / collateralToken.value).toString()
      );

      setNewBorrowingPower(borrowingPower - Number(inputAmount) * (ltv / 100));
    } else {
      setCollateralWithdrawAmount(inputAmount);
      setNewBorrowingPower(
        borrowingPower -
          Number(inputAmount) * collateralToken.value * (ltv / 100)
      );
    }
  }, [inputAmount]);

  const swapHandler = () => {
    if (!isMoneyValue) {
      setInputAmount(
        round(Number(inputAmount) * collateralToken.value, 5).toString()
      );
    } else {
      setInputAmount(
        round(Number(inputAmount) / collateralToken.value, 2).toString()
      );
    }
    setIsMoneyValue(!isMoneyValue);
  };

  const trySetInputAmount = (amount: string) => {
    setInputAmount(amount);
  };

  const setMax = () => {
    console.log("click");
    if (collateralToken && collateralToken.vault_amount) {
      //allowed to withdraw
      let a2s = borrowingPower - accountLiability;
      console.log(borrowingPower, accountLiability, a2s);
      if (a2s >= 0) {
        console.log("> 0");

        const tv = collateralToken.vault_amount * collateralToken.value;
        console.log(tv, a2s);
        if (tv < a2s) {
          if (isMoneyValue) {
            setInputAmount(tv.toString());
          } else {
            setInputAmount(collateralToken.vault_amount.toString());
          }
        } else {
          console.log("< 0");
          if (isMoneyValue) {
            setInputAmount((a2s / (ltv / 100)).toString());
          } else {
            setInputAmount(
              round(a2s / collateralToken.value / (ltv / 100), 4).toString()
            );
          }
        }
      }
    } else {
      setInputAmount("0");
    }
  };

  return (
    <Box>
      <Box textAlign="right" mb={1}>
        <Typography variant="label2" color={formatColor(neutral.gray3)}>
          Vault Balance: {collateralToken.vault_amount} {collateralToken.ticker}
        </Typography>
      </Box>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={trySetInputAmount}
          placeholder={`0 ${isMoneyValue ? "USD" : collateralToken.ticker}`}
          value={inputAmount}
          isMoneyValue={isMoneyValue}
        />
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
          <Typography
            variant="body3"
            sx={{
              color: formatColor(neutral.gray3),
              marginLeft: 1,
              whiteSpace: "nowrap",
            }}
          >
            {isMoneyValue
              ? `${
                  inputAmount === "0"
                    ? "0"
                    : round(Number(inputAmount) / collateralToken.value, 6)
                } ${collateralToken.ticker}`
              : `$${(
                  Number(inputAmount) * collateralToken.value
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </Typography>

          <Button
            onClick={setMax}
            sx={{
              minWidth: "auto",

              height: 30,
              paddingY: 2,
              paddingX: 1,
              "&:hover": {
                backgroundColor: "transparent",
                ".MuiTypography-root.MuiTypography-body1": {
                  color: formatColor(neutral.gray1),
                },
              },
            }}
          >
            <Typography
              variant="body3"
              color={formatColor(neutral.gray3)}
              sx={{
                "&:hover": {
                  color: isLight
                    ? formatColor(neutral.gray1)
                    : formatColor(neutral.white),
                },
              }}
            >
              Max
            </Typography>
          </Button>

          <Button
            sx={{
              minWidth: "auto",
              borderRadius: "50%",
              width: 30,
              height: 30,
              paddingY: 0,
              paddingX: 2,
            }}
            onClick={swapHandler}
          >
            <SwapIcon sx={{ width: 30, height: 30 }} />
          </Button>
        </Box>
      </ModalInputContainer>

      <Box marginTop={2}>
        <DisableableModalButton
          text="Withdraw"
          onClick={() => setType(ModalType.WithdrawCollateralConfirmation)}
          disabled={disabled}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      >
        <Typography variant="label2" color={formatColor(blue.blue1)}>
          Borrowing Power
        </Typography>
        <Box
          component="img"
          src="images/up_arrow_blue.png"
          width={10}
          height={12}
          marginX={1}
          sx={{
            transform: "rotate(180deg)",
          }}
        />
        <Typography variant="label2" color={formatColor(blue.blue1)}>
          ${newBorrowingPower.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};
