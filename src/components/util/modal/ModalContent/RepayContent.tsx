import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";

interface RepayContent {
  tokenName: string;
  tokenValue: string;
  tokenWalletBalance: string;
  repayAmount: string;
  setRepayAmount: (e: string) => void;
}

export const RepayContent = (props: RepayContent) => {
  const {
    tokenName,
    tokenWalletBalance,
    tokenValue,
    setRepayAmount,
    repayAmount,
  } = props;

  const isLight = useLight();

  const setMax = () => setRepayAmount(tokenWalletBalance);

  const [disabled, setDisabled] = useState(true);

  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);

  useEffect(() => {
    setDisabled(Number(repayAmount) < 1);
  }, [repayAmount]);

  const handleRepayRequest = () => {};

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={formatColor(neutral.gray10)}
        textAlign="right"
      >
        {" "}
        Wallet Balance: {tokenWalletBalance} {tokenName}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={(e) => setRepayAmount(e)}
          placeholder={`0 ${tokenName}`}
          value={repayAmount}
        />
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
          <Typography
            sx={{
              color: formatColor(neutral.gray3),
              fontSize: 14,
              fontWeight: 600,
              marginLeft: 1,
            }}
          >
            {`$${Number(repayAmount) * Number(tokenValue)}`}
          </Typography>

          <Button onClick={setMax}>
            <Typography
              sx={{
                color: formatColor(neutral.gray3),
                fontSize: 14,
                fontWeight: 600,
                marginLeft: 1,
              }}
            >
              Max
            </Typography>
          </Button>
        </Box>
        </ModalInputContainer>

      <DisableableModalButton
        text="Repay"
        onClick={handleRepayRequest}
        disabled={disabled}
      />
    </Box>
  );
};
