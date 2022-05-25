import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";

export const DelegateModal = () => {
  const { type, setType } = useModalContext();
  const isLight = useLight();

  return (
    <BaseModal
      open={type === ModalType.Delegate}
      setOpen={() => {
        setType(null);
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
      ></Box>
    </BaseModal>
  );
};
