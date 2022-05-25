import { Box, Typography, Button, TextField, FormControl } from "@mui/material";
import { useState, useEffect, FormEvent } from "react";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { useAppGovernanceContext } from "../../libs/app-governance-provider/AppGovernanceProvider";
import { DisableableModalButton } from "../button/DisableableModalButton";
import { ModalInputContainer } from "./ModalContent/ModalInputContainer";

export const DelegateModal = () => {
  const { type, setType } = useModalContext();
  const isLight = useLight();

  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const toggle = () => setFocus(!focus);

  const { delegateToken } = useAppGovernanceContext();

  return (
    <BaseModal
      open={type === ModalType.Delegate}
      setOpen={() => {
        setType(null);
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
          <Box
            component="img"
            width={80}
            height={80}
            src={`images/${delegateToken.ticker}.svg`}
            alt={delegateToken.name}
          ></Box>
          <Box>
            <Typography variant="h3" color="text.secondary" mb={1}>
              ${delegateToken.ticker}
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
          Enter the address you would like to delegate your vote to
        </Typography>
        <Box component="form" onSubmit={(e: FormEvent) => {
          e.preventDefault()
          // handle address delegate here
        }}>
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
        <DisableableModalButton type="submit" text="Delegate" loading={loading}/>
        </Box>
      </Box>
    </BaseModal>
  );
};
