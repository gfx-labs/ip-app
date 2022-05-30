import { Box, Typography, Link as MuiLink, Button } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { CircleExclamationIcon } from "../../icons/misc/CircleExclamationIcon";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { Spinner } from "../loading";
import { BaseModal } from "./BaseModal";
import { Chains } from "../../../chain/chains";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { ContractReceipt, ContractTransaction } from "ethers";

export const TransactionStatusModal = () => {
  const { type, setType, transactionState, transaction } = useModalContext();
  const { chainId } = useWeb3Context();
  const renderTransitionState = () => {
    const isLight = useLight();

    const chain = Chains.getInfo(chainId);

    switch (transactionState) {
      case "PENDING":
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" color="text.secondary" mb={1}>
              Pending Transaction
            </Typography>

            <Box my={3}>
              <Spinner />
            </Box>

            <MuiLink
              target="_blank"
              href={`${chain.scanUrl}${
                (transaction as ContractTransaction).hash
              }`}
            >
              <Button
                variant="contained"
                sx={{ color: formatColor(neutral.white) }}
              >
                View on {chain.scanSite}
              </Button>
            </MuiLink>
          </Box>
        );

      case "SUCCESS":
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" color="text.secondary" mb={1}>
              Successful Transaction
            </Typography>

            <Box
              component="img"
              my={3}
              height={30}
              width={30}
              src="images/ip_green.svg"
            ></Box>

            <MuiLink
              target="_blank"
              href={`${chain.scanUrl}${
                (transaction as ContractReceipt).transactionHash
              }`}
            >
              <Button
                variant="contained"
                sx={{ color: formatColor(neutral.white) }}
              >
                View on {chain.scanSite}
              </Button>
            </MuiLink>
          </Box>
        );

      case "FAILURE":
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" color="text.secondary" mb={1}>
              Failed Transaction
            </Typography>
            <Box my={3}>
              <CircleExclamationIcon
                strokecolor={
                  isLight
                    ? formatColor(neutral.gray1)
                    : formatColor(neutral.white)
                }
              />
            </Box>
            <MuiLink
              target="_blank"
              href={`${chain.scanUrl}${
                (transaction as ContractReceipt).transactionHash
              }`}
            >
              <Button
                variant="contained"
                sx={{ color: formatColor(neutral.white) }}
              >
                View on {chain.scanSite}
              </Button>
            </MuiLink>
          </Box>
        );

      default:
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" color="text.secondary" mb={1}>
            Error
          </Typography>
          <Box my={3}>
            <CircleExclamationIcon
              strokecolor={
                isLight
                  ? formatColor(neutral.gray1)
                  : formatColor(neutral.white)
              }
            />
          </Box>

          <Button
            variant="contained"
            sx={{ color: formatColor(neutral.white) }}
            onClick={() => setType(null)}
          >
            Please try again later
          </Button>
        </Box>;
        break;
    }
  };

  return (
    <BaseModal
      open={type === ModalType.TransactionStatus}
      setOpen={() => {
        setType(null);
      }}
      contentMaxWidth={400}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.5,
          mt: 4,
          rowGap: 2,
        }}
      >
        {renderTransitionState()}
      </Box>
    </BaseModal>
  );
};
