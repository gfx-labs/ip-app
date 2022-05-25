import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import { formatColor, neutral } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";

import {
  ModalType,
  useModalContext,
} from "../../../libs/modal-content-provider/ModalContentProvider";
import { useStableCoinsContext } from "../../../libs/stable-coins-provider/StableCoinsProvider";

export const WithdrawUSDCContent = () => {
  const { setType, USDC, updateUSDC } = useModalContext();
  const { USDC: USDCToken } = useStableCoinsContext();

  const setMax = () => {
    if (USDCToken && USDCToken.vault_amount) {
      updateUSDC("amountToWithdraw", USDCToken.vault_amount.toString());
    } else {
      updateUSDC("amountToWithdraw", '0');
    }
  };

  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);
  const [isMoneyValue, setIsMoneyValue] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const numAmountFrom = Number(USDC.amountToWithdraw);

  useEffect(() => {
    setDisabled(numAmountFrom <= 0);
  }, [USDC.amountToWithdraw]);

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={formatColor(neutral.gray10)}
        textAlign="right"
      >
        {" "}
        Vault Balance: {USDCToken.vault_amount || 0} {USDCToken.ticker}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={(amount) => updateUSDC("amountToWithdraw", amount)}
          placeholder={`0 ${isMoneyValue ? "USD" : USDCToken.ticker}`}
          value={USDC.amountToWithdraw}
          isMoneyValue={isMoneyValue}
        />
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
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
        </Box>
      </ModalInputContainer>

      <Box marginTop={2}>
        <DisableableModalButton
          text="Withdraw"
          onClick={() => setType(ModalType.WithdrawUSDCConfirmation)}
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
