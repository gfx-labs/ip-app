import { Box, BoxProps, Button, Typography } from '@mui/material'
import { ModalType, useModalContext } from '../../providers/ModalContentProvider'
import { useRolodexContext } from '../../providers/RolodexDataProvider'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { useWalletModalContext } from '../../providers/WalletModalProvider'
import { useWeb3Context } from '../../providers/Web3Provider'
import { ContractReceipt } from 'ethers'
import { ToolTip } from '../tooltip/ToolTip'
import { UserTokenMobileDropdown } from './UserTokenMobileDropdown'
import SVGBox from '../../icons/misc/SVGBox'
import { getKey } from '../../../chain/tokens'

interface UserPositionCardProps extends BoxProps {
  name: string
  vaultBalance: string
  numPositions: string
  image0: string
  image1: string
  fee: number
  LTVPercent: string
  penaltyPercent: string
  index: number
}

export const UserPositionCard = (props: UserPositionCardProps) => {
  const rolodex = useRolodexContext()
  const { connected, currentSigner } = useWeb3Context()
  const { setIsWalletModalOpen } = useWalletModalContext()
  const { setType, setCollateralToken, updateTransactionState } = useModalContext()
  const { pools, hasVault, vaultAddress } = useVaultDataContext()
  const { name, vaultBalance, numPositions, image0, image1, fee, LTVPercent, penaltyPercent, index } = props

  const openVault = async () => {
    try {
      const mintVaultRes = await rolodex!.VC!.connect(currentSigner!).mintVault()
      updateTransactionState(mintVaultRes)
      const mintVaultReceipt = await mintVaultRes.wait()
      updateTransactionState(mintVaultReceipt)
      return mintVaultRes
    } catch (err) {
      updateTransactionState(err as ContractReceipt)
      throw new Error(`Error creating vault: ${err}`)
    }
  }

  const handleDWClick = (modalType: ModalType) => {
    if (!connected) {
      setIsWalletModalOpen(true)
    } else if (!hasVault && !vaultAddress) {
      openVault()
    } else {
      const key = image0 + '/' + image1 + fee.toString()
      setCollateralToken((pools as any)[key])
      setType(modalType)
    }
  }

  return (
    <Box
      sx={{
        paddingY: 2,
        paddingX: { xs: 2, lg: 2.5 },
        backgroundColor: index % 2 === 0 ? 'card.list' : 'transparent',
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1.5fr 1fr 1fr',
            lg: '2.5fr 0.5fr 0.5fr 1.6fr 1fr 92px',
          },
          mb: 0,
          columnGap: 2,
          alignItems: 'center',
        }}
      >
        <Box display="flex" alignItems="center" columnGap={2}>
          <Box display="flex" flexDirection={"row"} maxWidth={{ xs: 42, lg: 70}}>
            <SVGBox
              width={{ xs: 24, lg: 40 }}
              height={{ xs: 24, lg: 40 }}
              svg_name={image0}
              alt={image0}
              sx={{
                position: 'relative',
                zIndex: 10,
                border: '0.02em solid',
                borderRadius: {xs: 12, lg: 20},
                borderColor: 'text.secondary',
              }}
            />
            <SVGBox
              width={{ xs: 24, lg: 40 }} 
              height={{ xs: 24, lg: 40 }} 
              svg_name={image1}
              alt = {image1}
              sx={{
                position: 'relative',
                left: { xs: -6, lg: -10 },
                border: '0.02em solid',
                borderRadius: {xs: 12, lg: 20},
                borderColor: 'text.secondary',
              }}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color="text.primary" display={{ xs: 'none', lg: 'block' }}>
              {name}
            </Typography>
          </Box>
        </Box>
        <Box display={{ xs: 'none', lg: 'flex' }} justifyContent="end">
          <ToolTip
            content={<Typography variant="body3">Maximum Loan-To-Value for this asset</Typography>}
            text={`${LTVPercent}%
          `}
            text_variant="body2"
          />
        </Box>
        <Box display={{ xs: 'none', lg: 'flex' }} justifyContent="end">
          <ToolTip
            content={<Typography variant="body3">Liquidation penalty paid by vault to the liquidator for liquidating this asset</Typography>}
            text={`${penaltyPercent}%
          `}
            text_variant="body2"
          />
        </Box>
        <Box display="flex" flexDirection="column" textAlign="end">
          <Typography variant="body1" color="text.primary">
            {Number(vaultBalance).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
          </Typography>
          <Typography variant="label_semi" color="text.secondary">
            {`${numPositions} position(s)`}
          </Typography>
        </Box>
        <Box display={{ xs: 'none', lg: 'flex' }} flexDirection="column" justifyContent="center">
        </Box>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            columnGap: 1.5,
            justifySelf: 'flex-end',
          }}
        >
          <Button
            onClick={() => handleDWClick(ModalType.DepositPosition)}
            sx={{
              borderRadius: 2,
              border: '1.5px solid #A3A9BA',
              width: { xs: 32, lg: 40 },
              height: { xs: 32, lg: 40 },
              minWidth: { xs: 20, lg: 40 },
            }}
          >
            <SVGBox width={16} height={16} svg_name="plus" />
          </Button>
          <Button
            onClick={() => handleDWClick(ModalType.WithdrawPosition)}
            sx={{
              borderRadius: 2,
              border: '1.5px solid #A3A9BA',
              width: { xs: 32, lg: 40 },
              height: { xs: 32, lg: 40 },
              minWidth: { xs: 20, lg: 40 },
            }}
          >
            <SVGBox width={16} height={16} svg_name="minus" />
          </Button>
        </Box>
        <Box display={{ xs: 'flex', lg: 'none' }} justifySelf="flex-end" width="fit-content">
          <UserTokenMobileDropdown
            onClickDeposit={() => handleDWClick(ModalType.DepositPosition)}
            onClickWithdraw={() => handleDWClick(ModalType.WithdrawPosition)}
            canDelegate={false}
          />
        </Box>
      </Box>
    </Box>
  )
}
