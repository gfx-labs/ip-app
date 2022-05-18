import { ButtonProps, Button, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { useRolodexContext } from "../../libs/rolodex-data-provider/rolodexDataProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

export const OpenVaultButton = () => {
  const rolodex = useRolodexContext()
  let isLight = useLight();

  const { currentAccount } = useWeb3Context();

  const openVault = async () => {
    try{
      const mintVaultRes = await rolodex?.VC?.mintVault()
      
      console.log(mintVaultRes)

      return mintVaultRes
    } catch(err) {
      console.log(err)
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
