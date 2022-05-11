import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { blue, formatColor } from "../../../theme";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";

export const ClaimsButton = () => {
  const [claimAmount, setClaimAmount] = useState(1543);
  const { setType } = useModalContext();

  const claimRewardsHandler = () => {
    setType(ModalType.Claim);
  };

  return (
    <Button
      onClick={claimRewardsHandler}
      variant="cta"
      sx={{
        width: "100%",
        backgroundColor: formatColor(blue.blue9),
        color: formatColor(blue.blue1),
        padding: 2,
        "&:hover": {
          backgroundColor: formatColor(blue.blue10),
          backgroundImage: "none",
        },
      }}
    >
      <Box component="img" src="/images/ClaimIcon.png" marginRight={1}></Box>{" "}
      <Typography fontWeight={600} variant="body1" whiteSpace="nowrap">
        {claimAmount.toLocaleString()} IPT
      </Typography>
    </Button>
  );
};
