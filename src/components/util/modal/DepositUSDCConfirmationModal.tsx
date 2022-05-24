import { Box, Typography } from "@mui/material";
import { formatColor, neutral } from "../../../theme";
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
import {useDepositCollateral} from "../../../hooks/useCollateral";
import {useVaultDataContext} from "../../libs/vault-data-provider/VaultDataProvider";

export const DepositUSDCConfirmationModal = () => {
  const { type, setType, deposit } = useModalContext();
  const {provider, currentAccount} = useWeb3Context()
  const rolodex = useRolodexContext()

  const { vaultAddress } = useVaultDataContext();
  const handleDepositConfirmationRequest = async () => {
    await useDepositCollateral(deposit.amountFrom!,deposit.token.address, provider?.getSigner(currentAccount)!, vaultAddress!, currentAccount)

    console.log('FINISHED')
  };

  const isLight = useLight();

  return (
    <BaseModal
      open={type === ModalType.DepositUSDCConfirmation}
      setOpen={() => {
        setType(ModalType.DepositUSDC);
      }}
    >
      <Typography
        variant="body1"
        fontWeight={600}
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
            src={`images/${deposit.token.ticker}.svg`}
            alt={deposit.token.ticker}
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="h3" color="text.secondary">
              ${deposit.token.value}
            </Typography>
          </Box>
        </Box>

        <ForwardIcon sx={{width: 15, height: 15}} strokecolor={formatColor(neutral.gray3)}/>

        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="h3" color="text.secondary">
              ${deposit.token.value}
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

      <Box>
        <Typography
          variant="body1"
          color={formatColor(neutral.gray3)}
          fontStyle="italic"
          fontWeight={500}
          textAlign="center"
        >
          1 {deposit.token.ticker} = {deposit.token.value} USDi ($1){" "}
        </Typography>
      </Box>

      <Box
        my={5}
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        <Typography variant="body1" fontWeight={500} mb={1}>
          {deposit.token.name} deposit: {deposit.amountFrom}
        </Typography>
        { deposit.amountTo ?(
        <Typography variant="body1" fontWeight={500}>
          USDi you will receive: {deposit.amountTo}
          </Typography>):(<></>)
        }
      </Box>

      <DisableableModalButton
        text="Confirm Deposit"
        disabled={false}
        onClick={handleDepositConfirmationRequest}
      />
    </BaseModal>
  );
};
