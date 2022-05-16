import { ButtonProps, Button, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

export const OpenVaultButton = () => {
  let isLight = useLight();

  const { currentAccount } = useWeb3Context();

  const openVault = () => {
    console.log("open account with currentAccount", currentAccount);
  };

  const StyledOpenVaultButton = (props: ButtonProps) => {
    const { onClick, children, sx } = props;
    return (
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "fit-content",
          backgroundColor: !isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.gray7),
          color: !isLight
            ? formatColor(neutral.black)
            : formatColor(neutral.white),
          "&:hover": {
            backgroundColor: !isLight
              ? formatColor(neutral.gray5)
              : formatColor(neutral.gray4),
            border: "none",
          },
          ...sx,
        }}
        size="medium"
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  return (
    <StyledOpenVaultButton onClick={openVault}>
      <Typography>Open a Vault</Typography>
    </StyledOpenVaultButton>
  );
};
