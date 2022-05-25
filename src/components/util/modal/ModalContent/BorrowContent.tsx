import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import { formatColor, neutral } from "../../../../theme";
import { useLight } from "../../../../hooks/useLight";
import { DecimalInput } from "../../textFields";
import { DisableableModalButton } from "../../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalInputContainer";
import { useBorrow } from "../../../../hooks/useUSDIFactory";
import { BigNumber, BigNumberish } from "ethers";
import { useRolodexContext } from "../../../libs/rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../../../libs/web3-data-provider/Web3Provider";
import {locale} from "../../../../locale";

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

  const isLight = useLight();
  const rolodex = useRolodexContext();

  const { provider, currentAccount } = useWeb3Context();
  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);

  const [loadmsg, setLoadmsg] = useState("");
  const toggle = () => setFocus(!focus);
  useEffect(() => {
    setDisabled(Number(borrowAmount) < 1);
  }, [borrowAmount]);

  const setMax = () =>
    setBorrowAmount(
      Math.floor(0.98 *(Number(vaultBorrowPower) - accountLiability)).toString()
  );

  const handleBorrowRequest = async () => {
    setLoading(true);
    setLoadmsg(locale("CheckWallet"))
    await useBorrow(
      vaultID,
      borrowAmount,
      rolodex!,
      provider!.getSigner(currentAccount)!
    ).then((res)=>{
      setLoadmsg(locale("TransactionPending"))
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
            {`$${Number(borrowAmount)}`}
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
          text="Borrow"
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
