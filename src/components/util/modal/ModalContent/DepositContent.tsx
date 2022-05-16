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
import { SwapIcon } from "../../../icons/misc/SwapIcon";
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
  const [isMoneyValue, setIsMoneyValue] = useState(false)
  const toggle = () => setFocus(!focus);

  const ctx = useWeb3Context();
  const provider = ctx.provider;
  const rolodex = useRolodexContext();
  const setMax = () => setDepositAmount(tokenWalletBalance);

  useEffect(() => {
    setDisabled(Number(depositAmount) <= 0);
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

  const swapHandler = () => {
    if(!isMoneyValue) {
      setDepositAmount((Number(depositAmount) * Number(tokenValue)).toString())
    } else {
      setDepositAmount((Number(depositAmount) / Number(tokenValue)).toString())
    } 

    setIsMoneyValue(!isMoneyValue)
  }

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
          placeholder={`0 ${isMoneyValue ? 'USD' : tokenName}`}
          value={depositAmount}
          isMoneyValue={isMoneyValue}
        />
        
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
          <Typography
            sx={{
              color: formatColor(neutral.gray3),
              fontSize: 14,
              fontWeight: 600,
              marginLeft: 1,
              whiteSpace: 'nowrap'
            }}
          >

            {isMoneyValue ? `${(Number(depositAmount) === 0 ? '0' : (Number(depositAmount) / Number(tokenValue)))} ${tokenName}` : `$${Number(depositAmount) * Number(tokenValue)}`}
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
            onClick={swapHandler}
          >
            <SwapIcon sx={{ width: 30, height: 30 }} />
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
