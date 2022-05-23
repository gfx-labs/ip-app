import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import { formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";

interface BorrowContent {
  tokenName: string;
  tokenValue: string;
  tokenWalletBalance: string;
  borrowAmount: string;
  setBorrowAmount: (e: string) => void;
}

export const BorrowContent = (props: BorrowContent) => {
  const {
    tokenName,
    tokenWalletBalance,
    tokenValue,
    setBorrowAmount,
    borrowAmount,
  } = props;

  const isLight = useLight();

  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);


  useEffect(() => {
    setDisabled(Number(borrowAmount) < 1);
  }, [borrowAmount]);

  const setMax = () => setBorrowAmount(tokenWalletBalance);

  const handleBorrowRequest = () => {};

  return (
    <Box>
      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={(e) => setBorrowAmount(e)}
          placeholder={`0 ${tokenName}`}
          value={borrowAmount}
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
            {`$${Number(borrowAmount) * Number(tokenValue)}`}
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
        text="Borrow"
        disabled={disabled}
        onClick={handleBorrowRequest}
        loading={true}
      />
    </Box>
  );
};
