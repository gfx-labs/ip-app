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
import { useWalletModalContext } from '../../libs/wallet-modal-provider/WalletModalProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { ContractReceipt } from 'ethers'
import { ToolTip } from '../tooltip/ToolTip'
import { useLight } from '../../../hooks/useLight'
interface UserTokenCardProps extends BoxProps {
  tokenName: string
  tokenTicker: string
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
  const isLight = useLight()
  const rolodex = useRolodexContext()
  const { currentSigner, connected, currentAccount } = useWeb3Context()
  const { setIsWalletModalOpen } = useWalletModalContext()
  const { tokens } = useVaultDataContext()
  const { setType, setCollateralToken, updateTransactionState } =
    useModalContext()
  const { hasVault, vaultAddress } = useVaultDataContext()
  const { setDelegateToken } = useAppGovernanceContext()
  const {
    tokenName,
    tokenTicker,
    tokenValue,
    vaultBalance,
    tokenAmount,
    image,
    LTVPercent,
    penaltyPercent,
    canDelegate = false,
  } = props

  const openVault = async () => {
    try {
      const mintVaultRes = await rolodex!.VC!.mintVault()
      updateTransactionState(mintVaultRes)
      const mintVaultReceipt = await mintVaultRes.wait()
      updateTransactionState(mintVaultReceipt)
      return mintVaultRes
    } catch (err) {
      updateTransactionState(err as ContractReceipt)
      throw new Error('Error creating vault')
    }
  }

  const handleDWClick = (modalType: ModalType) => {
    if (!connected) {
      setIsWalletModalOpen(true)
    } else if (!hasVault && !vaultAddress) {
      openVault()
    } else {
      setCollateralToken((tokens as any)[tokenTicker])
      setType(modalType)
    }
  }

  const setAndOpenDelegate = () => {
    setDelegateToken((tokens as any)[tokenTicker])
    setType(ModalType.Delegate)
  }

  return (
    <Box
      sx={{
        backgroundColor: isLight
          ? formatColor(neutral.gray5)
          : formatColor(neutral.gray4),
        borderRadius: 2,
        padding: 2,

        [theme.breakpoints.down('lg')]: {},
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr 1fr 1fr',
            lg: '2fr 1fr 2fr 1fr 1fr 1fr',
          },
          mb: 0,
          columnGap: 2,
          alignItems: 'center',
        }}
      >
        <Box display="flex" alignItems="center" columnGap={2}>
          <Box
            component="img"
            width={{ xs: 24, lg: 40 }}
            height={{ xs: 24, lg: 40 }}
            src={`images/${image.src}.svg`}
            alt={image.alt}
          ></Box>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body3"
              color="text.primary"
              display={{ xs: 'none', lg: 'block' }}
            >
              {tokenName}
            </Typography>
            <Typography
              variant="label2"
              fontWeight={400}
              color="text.secondary"
            >
              {tokenTicker}
            </Typography>
          </Box>
        </Box>
        <Typography
          display={{ xs: 'none', lg: 'block' }}
          variant="body2"
          color="text.primary"
        >
          {tokenValue}
        </Typography>

        <Box display={{ xs: 'none', lg: 'flex' }}>
          <ToolTip
            content={
              <Typography variant="body3">
                Maximum Loan-To-Value for this asset
              </Typography>
            }
            text={`LTV: ${LTVPercent}%
          `}
            text_variant="label2"
          />
          <Box mx={1}> </Box>
          <ToolTip
            content={
              <Typography variant="body3">
                Liquidation penalty paid by vault to the liquidator for
                liquidating this asset
              </Typography>
            }
            text={`Penalty: ${penaltyPercent}%
          `}
            text_variant="label2"
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body3" color="text.primary">
            {vaultBalance}
          </Typography>

          <Typography variant="label2_light" color="text.secondary">
            {tokenAmount} {tokenTicker}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            columnGap: 1.5,
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleDWClick(ModalType.DepositCollateral)}
            sx={{
              borderRadius: 20,
              width: { xs: 32, lg: 40 },
              height: { xs: 32, lg: 40 },
              minWidth: { xs: 20, lg: 40 },
            }}
          >
            <Box
              component="img"
              src={`images/plus.svg`}
              width="12px"
              height="12px"
            ></Box>
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDWClick(ModalType.WithdrawCollateral)}
            sx={{
              borderRadius: 20,
              width: { xs: 32, lg: 40 },
              height: { xs: 32, lg: 40 },
              minWidth: { xs: 20, lg: 40 },
            }}
          >
            <Box
              component="img"
              src={`images/minus.svg`}
              width="12px"
              height="12px"
            ></Box>
          </Button>
        </Box>

        <Box display={{ xs: 'none', lg: 'block' }}>
          {canDelegate && (
            <Button
              variant="text"
              sx={{
                width: 'fit-content',
                color: 'text.primary',
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
                strokecolor={
                  isLight
                    ? formatColor(neutral.black)
                    : formatColor(neutral.white)
                }
              />{' '}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
