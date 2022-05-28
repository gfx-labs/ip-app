import { ButtonProps, Button, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { useModalContext } from "../../libs/modal-content-provider/ModalContentProvider";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";

export const OpenVaultButton = () => {
  const { hasVault, setVaultID, setVaultAddress } = useVaultDataContext();

  const rolodex = useRolodexContext();
  let isLight = useLight();
  const { updateTransactionState } = useModalContext();
  const openVault = async () => {
    console.log(rolodex, " this is rolodex");
    try {
      const mintVaultRes = await rolodex!.VC!.mintVault();
      updateTransactionState(mintVaultRes);
      const mintVaultReceipt = await mintVaultRes.wait();

      updateTransactionState(mintVaultReceipt);

      console.log(mintVaultRes);
      return mintVaultRes;
    } catch (err) {
      console.log(err);
      throw new Error("Error creating vault");
    }
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
