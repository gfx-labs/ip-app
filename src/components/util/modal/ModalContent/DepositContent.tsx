import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { formatColor, neutral } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { useRolodexContext } from "../../../libs/rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { SwapIcon } from "../../../icons/misc/SwapIcon";
import { ModalType, useModalContext } from "../../../libs/modal-content-provider/ModalContentProvider";

export const DepositContent = () => {
  const { setType, deposit, updateDeposit } = useModalContext();

  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);
  const [isMoneyValue, setIsMoneyValue] = useState(false);
  const toggle = () => setFocus(!focus);

  const ctx = useWeb3Context();

  const setMax = () =>
    updateDeposit("amountFrom", deposit.token.wallet_balance.toString());

  const numAmountFrom = Number(deposit.amountFrom);

  useEffect(() => {
    setDisabled(numAmountFrom <= 0);
  }, [deposit.amountFrom]);

  const swapHandler = () => {
    if (!isMoneyValue) {
      updateDeposit(
        "amountFrom",
        (numAmountFrom * deposit.token.value).toString()
      );
    } else {
      updateDeposit(
        "amountFrom",
        (numAmountFrom / deposit.token.value).toString()
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
        Wallet Balance: {deposit.token.wallet_balance} {deposit.token.ticker}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={(amount) => updateDeposit("amountFrom", amount)}
          placeholder={`0 ${isMoneyValue ? "USD" : deposit.token.ticker}`}
          value={deposit.amountFrom}
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
                  deposit.amountFrom === "0"
                    ? "0"
                    : numAmountFrom / deposit.token.value
                } ${deposit.token.ticker}`
              : `$${numAmountFrom * deposit.token.value}`}
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
          onClick={() => setType(ModalType.DepositConfirmation)}
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
