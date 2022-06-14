import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import { formatColor, neutral } from "../../../theme";
import { useEffect, useState } from "react";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { DisableableModalButton } from "../button/DisableableModalButton";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { BN } from "../../../easy/bn";
import {  ContractTransaction } from "ethers";
import { locale } from "../../../locale";
import { TransactionReceipt } from "@ethersproject/providers";
import { Chains } from "../../../chain/chains";

export const DepositUSDCConfirmationModal = () => {
  const { type, setType, USDC, updateTransactionState } = useModalContext();
  const { provider, currentAccount, dataBlock, currentSigner, chainId } =
    useWeb3Context();
  const [loading, setLoading] = useState(false);
  const [loadmsg, setLoadmsg] = useState("");
  const rolodex = useRolodexContext();

  const [needAllowance, setNeedAllowance] = useState(true);
  const [shiftOn, setShiftOn] = useState(false);
  const [approvalTxn, setApprovalTxn] = useState<ContractTransaction>();

  const chain = Chains.getInfo(chainId);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.shiftKey) {
        setShiftOn(true);
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      setShiftOn(false);
    });
  }, []);

  useEffect(() => {
    if (rolodex && USDC.amountToDeposit && rolodex.USDC) {
      rolodex
        .USDC!.allowance(currentAccount, rolodex.addressUSDI)
        .then((initialApproval) => {
          const formattedUSDCAmount = BN(USDC.amountToDeposit).mul(BN("1e6"));
          if (initialApproval.lt(formattedUSDCAmount)) {
            setNeedAllowance(true);
          } else {
            setNeedAllowance(false);
          }
        });
    }
  }, [rolodex, dataBlock, chainId, USDC.amountToDeposit]);

  const handleDepositConfirmationRequest = async () => {
    if (rolodex && USDC.amountToDeposit) {
      let depositAmount = BN(USDC.amountToDeposit);
      const formattedUSDCAmount = depositAmount.mul(1e6);
      setLoading(true);
      try {
        setLoadmsg(locale("CheckWallet"));
        const txn = await rolodex.USDI.connect(currentSigner!).deposit(
          formattedUSDCAmount
        );
        updateTransactionState(txn);

        setLoadmsg(locale("TransactionPending"));
        const response = await txn?.wait();
        updateTransactionState(response);
      } catch (e) {
        const error = e as TransactionReceipt;
        console.error(e);
        updateTransactionState(error);
      }
      setApprovalTxn(undefined);
      setLoading(false);
    }
  };
  const handleApprovalRequest = async () => {
    if (rolodex && USDC.amountToDeposit) {
      let depositAmount = BN(USDC.amountToDeposit);
      if (shiftOn) {
        depositAmount = BN("1e18");
      }
      const formattedUSDCAmount = depositAmount.mul(BN("1e6"));
      setLoading(true);
      try {
        setLoadmsg(locale("CheckWallet"));
        const txn = await rolodex.USDC?.connect(currentSigner!).approve(
          rolodex.addressUSDI,
          formattedUSDCAmount
        );

        setApprovalTxn(txn);

        setLoadmsg(locale("TransactionPending"));
        await txn?.wait();
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  const isLight = useLight();

  return (
    <BaseModal
      open={type === ModalType.DepositUSDCConfirmation}
      setOpen={() => {
        setType(null);
      }}
    >
      <Typography
        variant="body3"
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        Confirm Deposit
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          mt: 3,
          py: 2,
          borderRadius: "10px",
          columnGap: 4,
          backgroundColor: isLight
            ? formatColor(neutral.gray5)
            : formatColor(neutral.gray7),
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            width={36}
            height={36}
            src="images/USDC.svg"
            alt="USDC svg"
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="body3" color="text.primary">
              {"$" +
                Number(USDC.amountToDeposit).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </Typography>
          </Box>
        </Box>

        <ForwardIcon
          sx={{ width: 15, height: 15 }}
          strokecolor={formatColor(neutral.gray3)}
        />

        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="body3" color="text.primary">
              {"$" +
                Number(USDC.amountToDeposit).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </Typography>
          </Box>

          <Box
            component="img"
            width={36}
            height={36}
            src={`images/USDI.svg`}
            alt="USDI"
            marginLeft={3}
          ></Box>
        </Box>
      </Box>

      <Box textAlign="center">
        <Typography
          variant="body3_medium"
          color={formatColor(neutral.gray3)}
          fontStyle="italic"
        >
          1 USDC = 1 USDi ($1){" "}
        </Typography>
      </Box>

      <Box
        my={5}
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      ></Box>

      <DisableableModalButton
        text={
          needAllowance
            ? "Set" + (shiftOn ? " Max" : "") + " Allowance"
            : "Confirm Deposit"
        }
        disabled={false}
        onClick={
          needAllowance
            ? handleApprovalRequest
            : handleDepositConfirmationRequest
        }
        loading={loading}
        load_text={loadmsg}
      />
      {approvalTxn !== undefined && (
        <MuiLink mt={1} display="block" target="_blank" href={`${chain.scanUrl}${approvalTxn.hash}`}>
          <Button variant="text">
            View approval on {chain.scanSite}
          </Button>
        </MuiLink>
      )}
    </BaseModal>
  );
};
