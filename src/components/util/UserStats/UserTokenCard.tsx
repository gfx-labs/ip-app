import { Box, BoxProps, Button, Typography, useTheme } from "@mui/material";
import { Contract } from "ethers";
import { formatColor, neutral, blue } from "../../../theme";
import { ForwardIcon } from "../../icons/misc/ForwardIcon";
import { useAppGovernanceContext } from "../../libs/app-governance-provider/AppGovernanceProvider";
import {
  ModalType,
  useModalContext,
} from "../../libs/modal-content-provider/ModalContentProvider";
import { useRolodexContext } from "../../libs/rolodex-data-provider/RolodexDataProvider";
import { useVaultDataContext } from "../../libs/vault-data-provider/VaultDataProvider";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import { OpenVaultButton } from "../button/OpenVaultButton";

interface UserTokenCardProps extends BoxProps {
  tokenName: string;
  tokenValue: string;
  vaultBalance: string;
  tokenAmount: string;
  image: {
    src: string;
    alt: string;
  };
  LTVPercent: string;
  penaltyPercent: string;
  canDelegate: boolean | undefined;
}

export const UserTokenCard = (props: UserTokenCardProps) => {
  const theme = useTheme();
  const rolodex = useRolodexContext();
  const { currentSigner } = useWeb3Context();

  const { tokens } = useVaultDataContext();
  const { type, setType, setCollateralToken } = useModalContext();
  const { hasVault, vaultAddress } = useVaultDataContext();
  const { setDelegateToken } = useAppGovernanceContext();
  const {
    tokenName,
    tokenValue,
    vaultBalance,
    tokenAmount,
    image,
    LTVPercent,
    penaltyPercent,
    canDelegate = false,
  } = props;

  const openDeposit = () => {
    setCollateralToken((tokens as any)[tokenName]);
    setType(ModalType.DepositCollateral);
  };

  const openWithdraw = () => {
    setCollateralToken((tokens as any)[tokenName]);
    setType(ModalType.WithdrawCollateral);
  };

  const setAndOpenDelegate = () => {
    setDelegateToken((tokens as any)[tokenName]);
    setType(ModalType.Delegate);
  };

  const getTokens = () => {
    if (rolodex && rolodex.provider && currentSigner) {
      const c = new Contract(
        (tokens as any)[tokenName].address,
        ["function publicMint() external"],
        rolodex.provider
      );
      c.connect(currentSigner).publicMint();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "smallCard.background",
        borderRadius: 4,
        paddingTop: 5,
        paddingLeft: 6,
        paddingRight: 6,
        paddingBottom: 3,
        [theme.breakpoints.down("lg")]: {
          paddingX: 2,
          paddingY: 4,
        },
        ...props.sx,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box>
            <Typography variant="label" color="text.secondary">
              {tokenName}
            </Typography>
            <br />
            <Typography variant="h6_semi" color="text.primary">
              {tokenValue}
            </Typography>
          </Box>
          <Box>
            <Typography variant="label2" color="text.secondary">
              Vault Balance
            </Typography>
            <br />
            <Typography variant="h6_semi" color="text.primary">
              {vaultBalance}
            </Typography>
          </Box>

          <Typography variant="label2" color="text.secondary">
            {tokenAmount} {tokenName}
          </Typography>
        </Box>
        <Box
          component="img"
          width={80}
          height={80}
          src={`images/${image.src}.svg`}
          alt={image.alt}
        ></Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Typography
          variant="label2"
          color={formatColor(neutral.gray3)}
        >
          LTV: {LTVPercent}%
        </Typography>
        <Typography
          variant="label2"
          color={formatColor(neutral.gray3)}
          marginLeft={2}
        >
          Penalty: {penaltyPercent}%
        </Typography>
      </Box>

      {hasVault && vaultAddress !== undefined ? (
        <Box
          sx={{
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 2.5,
          }}
        >
          <Button variant="cta" onClick={openDeposit}>
            Deposit
          </Button>
          <Button variant="cta" onClick={openWithdraw}>
            Withdraw
          </Button>
        </Box>
      ) : (
        <OpenVaultButton />
      )}

      <a onClick={getTokens}>click to get tokens</a>
      <Box display={canDelegate ? "flex" : "none"} justifyContent="flex-end">
        <Button
          variant="text"
          sx={{
            width: "fit-content",
            color: formatColor(blue.blue1),
            "&:hover": {
              backgroundColor: "transparent",
              color: formatColor(neutral.gray3),

              "& path": {
                stroke: formatColor(neutral.gray3),
              },
            },
          }}
          onClick={setAndOpenDelegate}
        >
          Delegate
          <ForwardIcon
            sx={{
              marginLeft: 1,
              width: 12,
              height: 10,
            }}
            strokecolor={formatColor(blue.blue1)}
          />{" "}
        </Button>
      </Box>
    </Box>
  );
};
