import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseSwitch } from "../switch";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { BorrowContent } from "./ModalContent/BorrowContent";
import { RepayContent } from "./ModalContent/RepayContent";
import {useRolodexContext} from "../../libs/rolodex-data-provider/RolodexDataProvider";
import {useVaultDataContext} from "../../libs/vault-data-provider/VaultDataProvider";
import {Spacer} from "../../../easy/spacer";
import {ForwardIcon} from "../../icons/misc/ForwardIcon";

export const BorrowRepayModal = () => {
  const { type, setType } = useModalContext();

  const currType = type === ModalType.Borrow;

  const rolodex = useRolodexContext();

  const {tokens, setTokens,  vaultID, hasVault, setVaultID,vaultAddress,  setVaultAddress, borrowingPower, accountLiability  } = useVaultDataContext();

  const [tokenName, setTokenName] = useState("USDI");
  const [vaultBorrowPower, setVaultBorrowPower] = useState("0");
  const [borrowAmount, setBorrowAmount] = useState("");
  useEffect(()=>{
    if(borrowingPower){
      setVaultBorrowPower(borrowingPower.toFixed(0))
    }
  }, [borrowingPower])
  const onSwitch = (val: boolean) => {
    setType(val ? ModalType.Borrow : ModalType.Repay);
  }

  return (
    <BaseModal
      open={type === ModalType.Borrow || type === ModalType.Repay}
      setOpen={() => {
        setType(null);
      }}
    >
      <BaseSwitch
        option1="Borrow"
        option2="Repay"
        onOptionChange={onSwitch}
        defaultIsOption1={currType}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <Box
          component="img"
          width={80}
          height={80}
          src={`images/${tokenName}.svg`}
          alt={tokenName}
        ></Box>
        <Box>
          <Typography variant="body1" color={formatColor(neutral.gray3)}>
            Liability:
          </Typography>
          <Typography variant="h3" color="text.secondary">
              ${accountLiability.toFixed(0)}
            </Typography>
        </Box>
          { currType ?
            (borrowAmount ?<Box>
              <Typography variant="body1" color={formatColor(neutral.gray3)}>
                {Spacer}
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {"->"}
              </Typography></Box>
              :<></>) :
                (borrowAmount ?<Box>
                  <Typography variant="body1" color={formatColor(neutral.gray3)}>
                    {Spacer}
                  </Typography>
                  <Typography variant="h3" color="text.secondary">
                    {"->"}
                  </Typography>
                </Box>
                :<></>)
        }
        {borrowAmount ?
          ( currType ?
            <Box>
              <Typography variant="body1" color={formatColor(neutral.gray3)}>
                New:
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {(Number(accountLiability)+Number(borrowAmount)).toFixed(0)}
              </Typography></Box>
              :
              <Box>
                <Typography variant="body1" color={formatColor(neutral.gray3)}>
                  New:
                </Typography>
                <Typography variant="h3" color="text.secondary">
                  {(Number(accountLiability)-Number(borrowAmount)).toFixed(0)}
                </Typography>
              </Box>
          ):<></>}
      </Box>

      {currType ?
        (<BorrowContent
          tokenName={tokenName}
          vaultBorrowPower={vaultBorrowPower}
          vaultID={Number(vaultID)}
          borrowAmount={borrowAmount}
          setBorrowAmount={setBorrowAmount}
          accountLiability={accountLiability}
        />
        ) : (
          <RepayContent
            tokenName={tokenName}
            vaultBorrowPower={vaultBorrowPower}
            vaultID={Number(vaultID)}
            repayAmount={borrowAmount}
            setRepayAmount={setBorrowAmount}
            accountLiability={accountLiability}
          />
        )}
    </BaseModal>
  );
};
