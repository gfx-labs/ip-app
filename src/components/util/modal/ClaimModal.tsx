import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { formatColor, neutral } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseModal } from "./BaseModal";
import { useLight } from "../../../hooks/useLight";
import { DecimalInput } from "../textFields";

export const ClaimModal = () => {
  const { type, setType } = useModalContext();
  const isLight = useLight()

  const [tokenName, setTokenName] = useState("IPT");
  const [iptBalance, setIPTBalance] = useState("0");

  const [claimAmount , setClaimAmount ] = useState("");

  const setMax = () => {
    setClaimAmount(iptBalance)
  }

  const handleClaimRequest = () => {}

  return (
    <BaseModal
      open={type === ModalType.Claim}
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
      >
        <Box
          component="img"
          width={80}
          height={80}
          src={`images/ip_green.svg`}
          alt="IPT"
        ></Box>
        <Box>
          <Typography variant="body1" color={formatColor(neutral.gray3)}>
            Rewards
          </Typography>
          <Typography variant="h3" color="text.secondary" mb={1}>
            {iptBalance}
          </Typography>
        </Box>
      </Box>

      <Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={formatColor(neutral.gray10)}
        textAlign="left"
      >
        {" "}
        Amount you wish to claim:
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: isLight
            ? formatColor(neutral.gray5)
            : formatColor(neutral.gray4),
          paddingTop: 1,
          paddingBottom: 0,
          paddingX: 2,
          borderRadius: 2,
          boxShadow: "0px 4px 4px 0px rgba(0,0,0, 0.05)",
          marginTop: 1
        }}
      >

        <DecimalInput
          onChange={(e) => setClaimAmount(e)}
          placeholder={`0 ${tokenName}`}
          value={claimAmount}
        />
        <Box sx={{ display: "flex", paddingBottom: 0.5, alignItems: "center" }}>
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
      </Box>

      <Button
        variant="contained"
        sx={{ color: formatColor(neutral.white), marginY: 2 }}
        onClick={handleClaimRequest}
      >
        Claim
      </Button>
    </Box>
    </BaseModal>
  );
};
