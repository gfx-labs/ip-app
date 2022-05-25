import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import { formatColor, neutral } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { useRepay } from "../../../../hooks/useUSDIFactory";
import { useRolodexContext } from "../../../libs/rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";


interface RepayContent {
  tokenName: string;
  vaultBorrowPower: string;
  repayAmount: string;
  setRepayAmount: (e: string) => void;
  accountLiability: number;
  vaultID: number;
}

export const RepayContent = (props: RepayContent) => {
  const {
    tokenName,
    vaultBorrowPower,
    setRepayAmount,
    repayAmount,
    accountLiability,
    vaultID
  } = props;
  const rolodex = useRolodexContext();
  const { provider, currentAccount } = useWeb3Context();

  const setMax = () => setRepayAmount(accountLiability.toString());


  const [loadmsg, setLoadmsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);

  useEffect(() => {
    setDisabled(Number(repayAmount) <= 0);
  }, [repayAmount]);

  const handleRepayRequest = async () => {
    setLoading(true);
    setLoadmsg("please sign transaction");
    await useRepay(
      vaultID,
      repayAmount,
      rolodex!,
      provider!.getSigner(currentAccount)!
    ).then((res)=>{
      setLoadmsg("transaction pending");
      setLoading(true);
      res!.wait().then(()=>{
      setLoadmsg("");
      setLoading(false);
      })
    }).catch((e)=>{
      setLoading(false);
      setShaking(true)
      setTimeout(() => setShaking(false), 400);
      console.log(e)
    })
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
        Wallet Balance: {vaultBorrowPower} {tokenName}
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
            {`$${Number(repayAmount)}`}
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
      <Box marginTop={2}>
        <DisableableModalButton
          text="Repay"
          onClick={handleRepayRequest}
          disabled={disabled}
          loading={loading}
          load_text={loadmsg}
          shaking={shaking}
        />
      </Box>
    </Box>
  );
};
