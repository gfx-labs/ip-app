import { ButtonProps, Button, Typography } from "@mui/material";
import { ContractReceipt } from "ethers";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { useModalContext } from "../../libs/modal-content-provider/ModalContentProvider";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";
import { useWalletModalContext } from "../../libs/wallet-modal-provider/WalletModalProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";

export const OpenVaultButton = () => {
  const { hasVault, setVaultID, setVaultAddress } = useVaultDataContext();
  const { setIsWalletModalOpen } = useWalletModalContext();
  const rolodex = useRolodexContext();
  let isLight = useLight();
  const { updateTransactionState } = useModalContext();
  const { connected, currentAccount } = useWeb3Context();

  const openVault = async () => {
    if (
      !connected ||
      currentAccount === null ||
      currentAccount === undefined ||
      currentAccount === ""
    ) {
      setIsWalletModalOpen(true);

      return;
    }

    try {
      const mintVaultRes = await rolodex!.VC!.mintVault();
      updateTransactionState(mintVaultRes);
      const mintVaultReceipt = await mintVaultRes.wait();
      updateTransactionState(mintVaultReceipt);
      return mintVaultRes;
    } catch (err) {
      updateTransactionState(err as ContractReceipt);

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
          width: "100%",
          textAlign: "center",
          backgroundColor: !isLight
            ? formatColor(neutral.white)
            : formatColor(neutral.gray7),
          color: !isLight
            ? formatColor(neutral.gray4)
            : formatColor(neutral.white),
          "&:hover": {
            backgroundColor: !isLight
              ? formatColor(neutral.gray5)
              : formatColor(neutral.gray4),
            border: "none",
          },
          ...sx,
        }}
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
