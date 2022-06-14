import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import { formatColor, neutral } from "../../../../theme";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { useRepay } from "../../../../hooks/useUSDIFactory";
import { useRolodexContext } from "../../../libs/rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";
import {locale} from "../../../../locale";
import { useModalContext } from "../../../libs/modal-content-provider/ModalContentProvider";


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
  const {updateTransactionState} = useModalContext()

  const [newHealth, setNewHealth] = useState(100 * (accountLiability / Number(vaultBorrowPower)))


  const [loadmsg, setLoadmsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);

  useEffect(() => {
    setDisabled(Number(repayAmount) <= 0 || accountLiability === 0);
  }, [repayAmount]);

  const onInputChange = (e:string) => {
    const newLib = (accountLiability - Number(e))
    if(newLib < 0){
      setRepayAmount(accountLiability.toString())
    }else{
      setRepayAmount(e)
    }
  }

  useEffect(()=>{
    const newHealth = 100*(accountLiability - Number(repayAmount))/Number(vaultBorrowPower)

    if(isNaN(newHealth)) {
      setNewHealth(0)
    } else {

      setNewHealth(newHealth)
    }
  },[repayAmount])

  const handleRepayAllRequest = () => {
    const accountLiabilityString = accountLiability.toString()

    setRepayAmount(accountLiabilityString)

    handleRepayRequest(accountLiabilityString)
  }

  const handleRepayRequest = async (repayAmount: string) => {
    setLoading(true);
    setLoadmsg(locale("CheckWallet"));
    await useRepay(
      vaultID,
      repayAmount,
      rolodex!,
      provider!.getSigner(currentAccount)!
    ).then((res)=>{
      setLoadmsg(locale("TransactionPending"));
      setLoading(true);
      updateTransactionState(res)
      res!.wait().then((res)=>{
        setLoadmsg("");
        setLoading(false);

        updateTransactionState(res)
      })
    }).catch((e)=>{
      setLoading(false);
      setShaking(true)
      setTimeout(() => setShaking(false), 400);
      console.log(e)
      updateTransactionState(e)
    })
  };

  return (
    <Box>
      <Typography
        variant="body2"
        color={formatColor(neutral.gray10)}
        textAlign="right"
      >
        {" "}
      </Typography>

      <ModalInputContainer focus={focus}>
        <DecimalInput
          onFocus={toggle}
          onBlur={toggle}
          onChange={onInputChange}
          placeholder={`0 ${tokenName}`}
          value={repayAmount}
        />
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
          <Typography
            variant="body3"
            sx={{
              color: formatColor(neutral.gray3),
              marginLeft: 1,
            }}
          >
            {`${Number(newHealth).toFixed(2)}%`}
          </Typography>
        </Box>
      </ModalInputContainer>
      <Box marginTop={2} display="grid" gridTemplateColumns="4fr 2fr" columnGap={0.5}>
        <DisableableModalButton
          text="Repay"
          onClick={() => handleRepayRequest(repayAmount)}
          disabled={disabled}
          loading={loading}
          load_text={loadmsg}
          shaking={shaking}
        />

      <DisableableModalButton
          text="Repay All"
          onClick={handleRepayAllRequest}
          loading={loading}
          load_text={loadmsg}
          shaking={shaking}
        />
      </Box>
    </Box>
  );
};
