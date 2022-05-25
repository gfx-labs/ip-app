import { Box, Typography } from "@mui/material";
import { formatColor, neutral } from "../../../theme";
import {useState} from 'react'
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
import { useDepositUSDC } from "../../../hooks/useDeposit";

export const DepositUSDCConfirmationModal = () => {
  const { type, setType, USDC } = useModalContext();
  const { provider, currentAccount } = useWeb3Context();
  const [loading, setLoading] = useState(false)
  const rolodex = useRolodexContext();

  const handleDepositConfirmationRequest = async () => {
    setLoading(true)
    await useDepositUSDC(
      USDC.amountToDeposit!,
      rolodex!,
      provider?.getSigner(currentAccount)!
    );
    console.log('finished')
    setLoading(false)
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
            src="images/USDC.svg"
            alt='USDC svg'
            marginRight={3}
          ></Box>
          <Box>
            <Typography variant="h3" color="text.secondary">
              $1
            </Typography>
          </Box>
        </Box>

        <ForwardIcon
          sx={{ width: 15, height: 15 }}
          strokecolor={formatColor(neutral.gray3)}
        />

        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="h3" color="text.secondary">
              $1
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
          1 USDC = 1 USDi ($1){" "}
        </Typography>
      </Box>

      <Box
        my={5}
        color={
          isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
        }
      >
        <Typography variant="body1" fontWeight={500} mb={1}>
          {USDC.token.name} deposit: {USDC.amountToDeposit}
        </Typography>

        <Typography variant="body1" fontWeight={500}>
          USDi you will receive: {USDC.amountToDeposit}
        </Typography>
      </Box>

      <DisableableModalButton
        text="Confirm Deposit"
        disabled={false}
        onClick={handleDepositConfirmationRequest}
        loading={loading}
      />
    </BaseModal>
  );
};
