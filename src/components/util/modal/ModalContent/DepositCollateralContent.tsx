import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { formatColor, neutral, blue } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { SwapIcon } from "../../../icons/misc/SwapIcon";
import {
  ModalType,
  useModalContext,
} from "../../../libs/modal-content-provider/ModalContentProvider";
import { useLight } from "../../../../hooks/useLight";

export const DepositCollateralContent = () => {
  const {
    setType,
    setCollateralDepositAmount,
    collateralToken,
    collateralDepositAmount,
  } = useModalContext();
  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);
  const [isMoneyValue, setIsMoneyValue] = useState(false);
  const toggle = () => setFocus(!focus);
  const isLight = useLight()

  const setMax = () =>
    setCollateralDepositAmount(collateralToken.wallet_amount!.toString());

  useEffect(() => {
    setDisabled(Number(collateralDepositAmount) <= 0);
  }, [collateralDepositAmount]);

  const swapHandler = () => {
    if (!isMoneyValue) {
      setCollateralDepositAmount(
        (
          Math.round(
            (Number(collateralDepositAmount) / collateralToken.value) * 100
          ) / 100
        ).toString()
      );
    } else {
      setCollateralDepositAmount(
        (
          Math.round(
            (Number(collateralDepositAmount) / collateralToken.value) * 100
          ) / 100
        ).toString()
      );
    }
    setIsMoneyValue(!isMoneyValue);
  };

  return (
    <Box>
      <Box textAlign="right" mb={1}>
        <Typography variant="label2" color={formatColor(neutral.gray3)}>
          {" "}
          Wallet Balance: {collateralToken?.wallet_amount!.toFixed(2)}{" "}
          {collateralToken?.ticker}
        </Typography>
      </Box>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={(amount) => setCollateralDepositAmount(amount)}
          placeholder={`0 ${isMoneyValue ? "USD" : collateralToken?.ticker}`}
          value={collateralDepositAmount}
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
                  collateralDepositAmount === "0"
                    ? "0"
                    : (
                        Number(collateralDepositAmount) / collateralToken?.value
                      ).toFixed(8)
                } ${collateralToken?.ticker}`
              : `$${(
                  Number(collateralDepositAmount) * collateralToken?.value
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
          text="Deposit"
          disabled={disabled}
          onClick={() => setType(ModalType.DepositCollateralConfirmation)}
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
        />
        <Typography variant="label2" color={formatColor(blue.blue1)}>
          $0
        </Typography>
      </Box>
    </Box>
  );
};
