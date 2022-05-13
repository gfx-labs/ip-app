import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { SwapIcon } from "../../../icons/misc/SwapIcon";

interface WithdrawContentProps {
  tokenName: string;
  tokenValue: string;
  tokenVaultBalance: string;
  withdrawAmount: string;
  setWithdrawAmount: (e: string) => void;
}

export const WithdrawContent = (props: WithdrawContentProps) => {
  const {
    tokenName,
    tokenVaultBalance,
    tokenValue,
    withdrawAmount,
    setWithdrawAmount,
  } = props;

  const isLight = useLight();

  const setMax = () => setWithdrawAmount(tokenVaultBalance);

  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(Number(withdrawAmount) < 1);
  }, [withdrawAmount]);

  const handleWithdrawRequest = () => {};

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={formatColor(neutral.gray10)}
        textAlign="right"
      >
        {" "}
        Vault Balance: {tokenVaultBalance} {tokenName}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={(e) => setWithdrawAmount(e)}
          placeholder={`0 ${tokenName}`}
          value={withdrawAmount}
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
            {`$${Number(withdrawAmount) * Number(tokenValue)}`}
          </Typography>

          <Button
            onClick={setMax}
            sx={{
              minWidth: "auto",
              
              height: 30,
              paddingY: 2,
              paddingX: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                '.MuiTypography-root.MuiTypography-body1': {

                  color: formatColor(neutral.gray1)
                }
              }
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
          >
            <SwapIcon sx={{ width: 30, height: 30 }} />
          </Button>
        </Box>
      </ModalInputContainer>
      <DisableableModalButton
        text="Withdraw"
        onClick={handleWithdrawRequest}
        disabled={disabled}
      />
    </Box>
  );
};
