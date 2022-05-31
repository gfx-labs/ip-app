import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import { formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { useBorrow } from "../../../../hooks/useUSDIFactory";
import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction } from "ethers";
import { useRolodexContext } from "../../../libs/rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";
import {locale} from "../../../../locale";
import { useModalContext } from "../../../libs/modal-content-provider/ModalContentProvider";
import {getVaultBorrowingPower} from "../../../libs/vault-data-provider/getBorrowingPower";

interface BorrowContent {
  tokenName: string;
  vaultBorrowPower: string;
  borrowAmount: string;
  setBorrowAmount: (e: string) => void;
  vaultID: number;
  accountLiability: number;
}

export const BorrowContent = (props: BorrowContent) => {
  const {
    tokenName,
    vaultBorrowPower,
    borrowAmount,
    setBorrowAmount,
    vaultID,
    accountLiability,
  } = props;
const {updateTransactionState} = useModalContext()
  const isLight = useLight();
  const rolodex = useRolodexContext();

  const { provider, currentAccount } = useWeb3Context();
  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [loadmsg, setLoadmsg] = useState("");

  const [newHealth, setNewHealth] = useState(100 * (accountLiability / Number(vaultBorrowPower)))

  const [buttonText, newButtonText] = useState("Borrow")

  const toggle = () => setFocus(!focus);
  useEffect(() => {
    setDisabled(Number(borrowAmount) < 1);
  }, [borrowAmount]);
  const onInputChange = (e:string) => {
    const newLib = (accountLiability + Number(e)) / Number(vaultBorrowPower)
    if(newLib >= 1){
      setBorrowAmount((0.95 * (Number(vaultBorrowPower) - accountLiability)).toFixed(2))
    }else{
      setBorrowAmount(e)
    }
  }

  useEffect(()=>{
    setNewHealth(100*(accountLiability + Number(borrowAmount))/Number(vaultBorrowPower))
  },[borrowAmount])

  const handleBorrowRequest = async () => {
    setLoading(true);
    setLoadmsg(locale("CheckWallet"))
    await useBorrow(
      vaultID,
      borrowAmount,
      rolodex!,
      provider!.getSigner(currentAccount)!
    ).then(async (res)=>{
      setLoadmsg(locale("TransactionPending"))
      setLoading(true);
      updateTransactionState(res as ContractTransaction)
      return res!.wait().then((res)=>{
        setLoadmsg("");
        setLoading(false);
        updateTransactionState(res as ContractReceipt)
      })
    }).catch((e)=>{
      setLoading(false);
      setShaking(true)
      setTimeout(() => setShaking(false), 400);
      updateTransactionState(e as ContractReceipt)
    })
  };

  return (
    <Box>
      <ModalInputContainer focus={focus}>
        <DecimalInput
          onBlur={toggle}
          onFocus={toggle}
          onChange={onInputChange}
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
            {`${newHealth.toFixed(2)}%`}
          </Typography>
        </Box>
      </ModalInputContainer>
      <Box marginTop={2}>
        <DisableableModalButton
          text={buttonText}
          disabled={disabled}
          onClick={handleBorrowRequest}
          loading={loading}
          load_text={loadmsg}
          shaking={shaking}
        />
      </Box>
    </Box>
  );
};
