import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import { formatColor, neutral } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { SwapIcon } from "../../../icons/misc/SwapIcon";
import {
  ModalType,
  useModalContext,
} from "../../../libs/modal-content-provider/ModalContentProvider";
import {
  useVaultDataContext,
  VaultDataProvider,
} from "../../../libs/vault-data-provider/VaultDataProvider";

export const WithdrawCollateralContent = () => {
  const {
    setType,
    collateralToken,
    setCollateralWithdrawAmount,
    collateralWithdrawAmount,
  } = useModalContext();

  const { borrowingPower, accountLiability } = useVaultDataContext();

  const setMax = () => {
    if (collateralToken && collateralToken.vault_amount)
      setCollateralWithdrawAmount(collateralToken.vault_amount.toString());
    else {
      setCollateralWithdrawAmount("0");
    }
  };

  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);
  const [isMoneyValue, setIsMoneyValue] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const numAmountToWithdraw = Number(collateralWithdrawAmount);

  useEffect(() => {
    setDisabled(numAmountToWithdraw <= 0);
  }, [collateralWithdrawAmount]);

  const swapHandler = () => {
    if (!isMoneyValue) {
      setCollateralWithdrawAmount(
        (numAmountToWithdraw * collateralToken.value).toString()
      );
    } else {
      setCollateralWithdrawAmount(
        (numAmountToWithdraw / collateralToken.value).toString()
      );
    }

    setIsMoneyValue(!isMoneyValue);
  };

  const tryWithdrawCollateral = (amount: string) => {
    let tryDecimal = false
    if(amount.endsWith(".")) {
      tryDecimal = true
      amount = amount + "0"
    }
    let newDollarValue = Number(amount);
    let newAmount = Number(amount);
    if (!isMoneyValue) {
      newDollarValue = newDollarValue * collateralToken.value;
    }
    let newResult = borrowingPower - accountLiability - newDollarValue;
    if (newResult < 0) {
      newDollarValue = Math.round((newResult + newDollarValue)*100)/100
      const ltvp =
        (collateralToken.token_LTV ? collateralToken.token_LTV : 100) / 100;
      newAmount =
        Math.round((newDollarValue * 10000) / (collateralToken.value * ltvp)) /
        10000;
        console.log(newAmount, collateralToken.vault_amount!)
    }
    if (newAmount > collateralToken.vault_amount!) {
      newAmount = collateralToken.vault_amount!
      newDollarValue = collateralToken.vault_balance!
    }
    if (!isMoneyValue) {
      if (tryDecimal) {
        setCollateralWithdrawAmount(newAmount.toFixed(0) + ".");
      } else {
        setCollateralWithdrawAmount(newAmount.toString());
      }
    } else {
      setCollateralWithdrawAmount(newDollarValue.toString());
    }
  };

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={formatColor(neutral.gray10)}
        textAlign="right"
      >
        {" "}
        Vault Balance: {collateralToken.vault_amount} {collateralToken.ticker}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={(amount) => tryWithdrawCollateral(amount)}
          placeholder={`0 ${isMoneyValue ? "USD" : collateralToken.ticker}`}
          value={collateralWithdrawAmount}
          isMoneyValue={isMoneyValue}
        />
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
          <Typography
            sx={{
              color: formatColor(neutral.gray3),
              fontSize: 14,
              fontWeight: 600,
              marginLeft: 1,
              whiteSpace: "nowrap",
            }}
          >
            {isMoneyValue
              ? `${collateralWithdrawAmount === "0"
                ? "0"
                : Math.floor(
                  (numAmountToWithdraw * 1000) / collateralToken.value
                ) / 1000
              } ${collateralToken.ticker}`
              : `$${(numAmountToWithdraw * collateralToken.value).toFixed(2)}`}
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
              sx={{
                color: formatColor(neutral.gray3),
                fontSize: 14,
                fontWeight: 600,
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
        <Typography variant="caption">Borrowing Power</Typography>
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
        <Typography variant="caption">$0</Typography>
      </Box>
    </Box>
  );
};
