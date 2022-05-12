import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { blue, formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";
import { useDeposit } from "../../../../hooks/useDeposit";
import { useRolodexContext } from "../../../libs/rolodex-data-provider/rolodexDataProvider";
import {
  useWeb3Context,
  Web3Data,
} from "../../../libs/web3-data-provider/Web3Provider";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
interface DepositContent {
  tokenName: string;
  tokenValue: string;
  tokenWalletBalance: string;
  depositAmount: string;
  setDepositAmount: (e: string) => void;
}

export const DepositContent = (props: DepositContent) => {
  const {
    tokenName,
    tokenWalletBalance,
    tokenValue,
    setDepositAmount,
    depositAmount,
  } = props;

  const isLight = useLight();
  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);

  const ctx = useWeb3Context();
  const provider = ctx.provider;
  const rolodex = useRolodexContext();
  const setMax = () => setDepositAmount(tokenWalletBalance);

  useEffect(() => {
    setDisabled(Number(depositAmount) < 1);
  }, [depositAmount]);

  const handleDepositRequest = async () => {
    try {
      const deposit = await useDeposit(
        rolodex!,
        provider!,
        Number(depositAmount)
      );

      console.log(deposit, "DEPOSIT SUCCEDED?");
    } catch (err) {
      console.error("ERROR", err);
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
        Wallet Balance: {tokenWalletBalance} {tokenName}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={(e) => setDepositAmount(e)}
          placeholder={`0 ${tokenName}`}
          value={depositAmount}
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
            {`$${Number(depositAmount) * Number(tokenValue)}`}
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
        text="Deposit"
        disabled={disabled}
        onClick={handleDepositRequest}
      />
    </Box>
  );
};
