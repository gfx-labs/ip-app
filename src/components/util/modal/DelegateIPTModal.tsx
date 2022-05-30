import { Box, Typography, Button, TextField, FormControl } from "@mui/material";
import { useState, useEffect, FormEvent } from "react";
import { ContractReceipt } from "ethers";

import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { DisableableModalButton } from "../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalContent/ModalInputContainer";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { locale } from "../../../locale";
import { useIPTDelegate } from "../../../hooks/useDelegate";

export const DelegateIPTModal = () => {
  const { type, setType, updateTransactionState } = useModalContext();
  const isLight = useLight();

  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [loadmsg, setLoadmsg] = useState("");
  const [screen, setScreen] = useState(0);

  const [address, setAddress] = useState("");

  const toggle = () => setFocus(!focus);

  const { currentSigner, currentAccount } = useWeb3Context();

  const selfDelegateHandler = async () => {
    setLoading(true);
    setLoadmsg(locale("CheckWallet"));
    try {
      await useIPTDelegate(currentAccount, currentSigner!).then(async (res) => {
        updateTransactionState(res);
        setLoadmsg(locale("TransactionPending"));
        setLoading(true);
        return res!.wait().then((res) => {
          setLoadmsg("");
          setLoading(false);

          updateTransactionState(res);
        });
      });
    } catch (e) {
      setLoading(false);
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      console.log(e);

      const err = e as ContractReceipt;

      updateTransactionState(err);
    }
  };

  const handleDelegateRequest = async (delegateToSomeoneElse: boolean) => {
    setLoading(true);
    setLoadmsg(locale("CheckWallet"));

    const delegatee = delegateToSomeoneElse ? address : currentAccount;

    try {
      await useIPTDelegate(delegatee, currentSigner!).then(async (res) => {
        updateTransactionState(res);
        setLoadmsg(locale("TransactionPending"));
        setLoading(true);
        return res!.wait().then((res) => {
          setLoadmsg("");
          setLoading(false);

          updateTransactionState(res);
        });
      });
    } catch (e) {
      setLoading(false);
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      console.log(e);

      const err = e as ContractReceipt;

      updateTransactionState(err);
    }
  };

  return (
    <BaseModal
      open={type === ModalType.DelegateIPT}
      setOpen={() => {
        setType(null);
        setScreen(0);
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2.5,
            mt: 4,
            columnGap: 2,
          }}
        >
          <Box>
            <Typography variant="h3" color="text.secondary" mb={1}>
              {screen === 0 ? "Delegate your Vote" : "Add Delegate"}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color={
            isLight ? formatColor(neutral.black) : formatColor(neutral.white)
          }
          fontWeight={600}
        >
          {screen === 0
            ? "You can vote on each proposal yourself or add a delegate to share your votes with."
            : "You can either vote yourself or delegate your votes to someone else."}
        </Typography>
        {screen === 0 ? (
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: formatColor(neutral.gray12),
                color: formatColor(neutral.black),
                my: 2,
              }}
              onClick={() => handleDelegateRequest(false)}
            >
              Self Delegate
            </Button>
            <Button
              variant="text"
              sx={{
                color: isLight
                  ? formatColor(neutral.black)
                  : formatColor(neutral.white),
              }}
              onClick={() => setScreen(1)}
            >
              Add Delegate
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={() => handleDelegateRequest(true)}>
            <Box my={2}>
              <ModalInputContainer focus={focus}>
                <TextField
                  placeholder="Address"
                  variant="standard"
                  onBlur={toggle}
                  onFocus={toggle}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  InputProps={{
                    sx: {
                      "&:before, &:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    paddingBottom: "4px",
                    ".MuiInputBase-input": {
                      fontWeight: 700,
                      color: isLight
                        ? formatColor(neutral.gray1)
                        : formatColor(neutral.white),
                    },
                  }}
                />
              </ModalInputContainer>
            </Box>
            <DisableableModalButton
              type="submit"
              text="Delegate"
              loading={loading}
              shaking={shaking}
              load_text={loadmsg}
              onClick={() => handleDelegateRequest(true)}
            />
          </Box>
        )}
      </Box>
    </BaseModal>
  );
};