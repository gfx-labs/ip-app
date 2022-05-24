import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { formatColor, neutral } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { SwapIcon } from "../../../icons/misc/SwapIcon";
import { ModalType, useModalContext } from "../../../libs/modal-content-provider/ModalContentProvider";

export const DepositCollateralContent = () => {
  const { setType, setCollateralDepositAmount, collateralToken, collateralDepositAmount } = useModalContext();
  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);
  const [isMoneyValue, setIsMoneyValue] = useState(false);
  const toggle = () => setFocus(!focus);

  const setMax = () =>
  setCollateralDepositAmount(collateralToken.wallet_amount);

  useEffect(() => {
    setDisabled(collateralDepositAmount <= 0);
  }, [collateralDepositAmount]);

  const swapHandler = () => {
    if (!isMoneyValue) {
      setCollateralDepositAmount(collateralDepositAmount * collateralToken.value)
      
    } else {
      setCollateralDepositAmount(
        
        collateralDepositAmount / collateralToken.value
      );
    }

    setIsMoneyValue(!isMoneyValue);
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
        Wallet Balance: {collateralToken?.wallet_amount} {collateralToken?.ticker}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={(amount) => setCollateralDepositAmount(Number(amount))}
          placeholder={`0 ${isMoneyValue ? "USD" : collateralToken?.ticker}`}
          value={collateralDepositAmount.toString()}
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
              ? `${
                  collateralDepositAmount === 0
                    ? "0"
                    : collateralDepositAmount / collateralToken?.value
                } ${collateralToken?.ticker}`
              : `$${collateralDepositAmount * collateralToken?.value}`}
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
        <Typography variant="caption">Borrowing Power</Typography>
        <Box
          component="img"
          src="images/up_arrow_blue.png"
          width={10}
          height={12}
          marginX={1}
        />
        <Typography variant="caption">$0</Typography>
      </Box>
    </Box>
  );
};
