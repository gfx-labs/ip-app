import { Box, BoxProps, Button, Typography, useTheme } from '@mui/material'
import { formatColor, neutral, blue } from '../../../theme'
import { ForwardIcon } from '../../icons/misc/ForwardIcon'
import { useAppGovernanceContext } from '../../libs/app-governance-provider/AppGovernanceProvider'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { useRolodexContext } from '../../libs/rolodex-data-provider/RolodexDataProvider'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { OpenVaultButton } from '../button/OpenVaultButton'
import { TitleTextToolTip } from '../text/TitleTextToolTip'
import { ToolTip } from '../tooltip/ToolTip'

interface UserTokenCardProps extends BoxProps {
  tokenName: string
  tokenValue: string
  vaultBalance: string
  tokenAmount: string
  image: {
    src: string
    alt: string
  }
  LTVPercent: string
  penaltyPercent: string
  canDelegate: boolean | undefined
}

export const UserTokenCard = (props: UserTokenCardProps) => {
  const theme = useTheme()
  const rolodex = useRolodexContext()
  const { currentSigner } = useWeb3Context()

  const { tokens } = useVaultDataContext()
  const { setType, setCollateralToken } = useModalContext()
  const { hasVault, vaultAddress } = useVaultDataContext()
  const { setDelegateToken } = useAppGovernanceContext()
  const {
    tokenName,
    tokenValue,
    vaultBalance,
    tokenAmount,
    image,
    LTVPercent,
    penaltyPercent,
    canDelegate = false,
  } = props

  const openDeposit = () => {
    setCollateralToken((tokens as any)[tokenName])
    setType(ModalType.DepositCollateral)
  }

  const openWithdraw = () => {
    setCollateralToken((tokens as any)[tokenName])
    setType(ModalType.WithdrawCollateral)
  }

  const setAndOpenDelegate = () => {
    setDelegateToken((tokens as any)[tokenName])
    setType(ModalType.Delegate)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'smallCard.background',
        borderRadius: 4,
        padding: 4,
        paddingBottom: 0,
        [theme.breakpoints.down('lg')]: {},
        ...props.sx,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0 }}>
        <Box display="flex" flexDirection="column" rowGap={1}>
          <Box>
            <Typography variant="label2" color="text.secondary">
              {tokenName}
            </Typography>
            <br />
            <Typography variant="subtitle3" color="text.primary">
              {tokenValue}
            </Typography>
          </Box>
          <Box>
            <Typography variant="label2" color="text.secondary">
              Vault Balance
            </Typography>
            <br />
            <Typography variant="subtitle3" color="text.primary">
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <ToolTip
          content={<Typography variant="body3">Loan-To-Value</Typography>}
          text={`LTV: ${LTVPercent}%
          `}
          text_variant="label2"
        />
        <Box mx={1}> </Box>
        <ToolTip
          content={
            <Typography variant="body3">
              The liquidation penalty paid to liquidators for performing a
              liquidation
            </Typography>
          }
          text={`Penalty: ${penaltyPercent}%
          `}
          text_variant="label2"
        />
      </Box>

      {hasVault && vaultAddress !== undefined ? (
        <Box
          sx={{
            display: 'grid',
            justifyContent: 'space-between',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 1.5,
          }}
        >
          <Button variant="contained" onClick={openDeposit}>
            Deposit
          </Button>
          <Button variant="contained" onClick={openWithdraw}>
            Withdraw
          </Button>
        </Box>
      ) : (
        <OpenVaultButton />
      )}

      {canDelegate ? (
        <Box display={canDelegate ? 'flex' : 'none'} justifyContent="flex-end">
          <Button
            variant="text"
            sx={{
              width: 'fit-content',
              color: formatColor(blue.blue1),
              '&:hover': {
                backgroundColor: 'transparent',
                color: formatColor(neutral.gray3),

                '& path': {
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
            />{' '}
          </Button>
        </Box>
      ) : (
        <Box height={42}></Box>
      )}
    </Box>
  )
}
