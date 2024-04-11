import { Box, BoxProps, Button, ButtonProps, LinearProgress, Typography } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { ForwardIcon } from '../../icons/misc/ForwardIcon'
import { useAppGovernanceContext } from '../../providers/AppGovernanceProvider'
import { ModalType, useModalContext } from '../../providers/ModalContentProvider'
import { useRolodexContext } from '../../providers/RolodexDataProvider'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { useWalletModalContext } from '../../providers/WalletModalProvider'
import { useWeb3Context } from '../../providers/Web3Provider'
import { ContractReceipt } from 'ethers'
import { ToolTip } from '../tooltip/ToolTip'
import { useLight } from '../../../hooks/useLight'
import { UserTokenMobileDropdown } from './UserTokenMobileDropdown'
import { useEffect, useState } from 'react'
import SVGBox from '../../icons/misc/SVGBox'
import { CappedGovToken__factory } from '../../../contract_abis/factories/lending/CappedGovToken__factory'
import { CappedRebaseToken__factory } from '../../../contract_abis/factories/lending/CappedRebase__factory'
import { CappedRebaseToken } from '../../../contract_abis/lending/CappedRebase'

interface UserTokenCardProps extends BoxProps {
  tokenName: string
  tokenTicker: string
  tokenPrice: string
  vaultBalance: string
  tokenAmount: string
  image: {
    src: string
    alt: string
  }
  image2?: {
    src: string
    alt: string
  }
  LTVPercent: string
  penaltyPercent: string
  canDelegate: boolean | undefined
  index: number
  cappedAddress: string | undefined
}

interface DelegateButtonProps extends ButtonProps {
  text: string
}

const DelegateButton = (props: DelegateButtonProps) => {
  const { onClick, sx, text } = props

  return (
    <Button
      variant="text"
      sx={{
        width: 'fit-content',
        color: 'text.delegate',
        '&:hover': {
          backgroundColor: 'transparent',
          color: formatColor(neutral.gray3),

          '& path': {
            stroke: formatColor(neutral.gray3),
          },
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <Typography variant="body1">{text}</Typography>
      <ForwardIcon
        sx={{
          marginLeft: 1,
          width: 12,
          height: 10,
        }}
        stroke="#5E64F4"
      />{' '}
    </Button>
  )
}

export const UserTokenCard = (props: UserTokenCardProps) => {
  const isLight = useLight()
  const rolodex = useRolodexContext()
  const { connected, currentSigner, provider } = useWeb3Context()
  const { setIsWalletModalOpen } = useWalletModalContext()
  const { setType, setCollateralToken, updateTransactionState } = useModalContext()
  const { tokens, hasVault, vaultAddress } = useVaultDataContext()
  const { setDelegateToken } = useAppGovernanceContext()
  const [cappedPercent, setCappedPercent] = useState(10)

  const {
    tokenName,
    tokenTicker,
    tokenPrice,
    vaultBalance,
    tokenAmount,
    image,
    image2,
    LTVPercent,
    penaltyPercent,
    canDelegate = false,
    index,
    cappedAddress,
  } = props

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
      setCollateralToken((tokens as any)[tokenTicker])
      setType(modalType)
    }
  }

  const setAndOpenDelegate = () => {
    setDelegateToken((tokens as any)[tokenTicker])
    setType(ModalType.Delegate)
  }

  const openUndelegate = () => {
    setDelegateToken((tokens as any)[tokenTicker])
    setType(ModalType.Undelegate)
  }

  // get capped percent
  useEffect(() => {
    if (cappedAddress && provider) {
      const getCappedPercent = async () => {
        const contract = CappedGovToken__factory.connect(cappedAddress, provider)
        const cap = await contract.getCap()
        const totalSupply = await contract.totalSupply()
        return totalSupply.mul(100).div(cap).toNumber()
      }
      getCappedPercent()
        .then((val) => {
          if (val <= 5) {
            val = 5
          } else if (val >= 100) {
            val = 100
          }
          setCappedPercent(val)
        })
        .catch((err) => {
          console.error('Error getting capped percent\n' + err)
          throw err
        })
    }
  }, [provider])

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
            lg: '1.5fr 1fr 0.5fr 0.5fr 1fr 0.6fr 1fr 92px',
          },
          mb: 0,
          columnGap: 2,
          alignItems: 'center',
        }}
      >
        <Box display="flex" alignItems="center" columnGap={2}>
          <Box display="flex" flexDirection={'row'} maxWidth={{ xs: 42, lg: 70 }}>
            <SVGBox
              width={{ xs: 24, lg: 40 }}
              height={{ xs: 24, lg: 40 }}
              svg_name={image.src}
              alt={image.alt}
              sx={{
                position: 'relative',
                zIndex: 10,
                borderRadius: { xs: 12, lg: 20 },
              }}
            />
            {image2 && (
              <SVGBox
                width={{ xs: 24, lg: 40 }}
                height={{ xs: 24, lg: 40 }}
                svg_name={image2.src}
                alt={image2.alt}
                sx={{
                  position: 'relative',
                  left: { xs: -6, lg: -10 },
                  border: '0.02em solid',
                  borderRadius: { xs: 12, lg: 20 },
                  borderColor: 'text.secondary',
                }}
              />
            )}
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color="text.primary" display={{ xs: 'none', lg: 'block' }}>
              {tokenName}
            </Typography>
            <Typography variant="label_semi" fontWeight={400} color="text.secondary">
              {tokenTicker}
            </Typography>
          </Box>
        </Box>
        <Typography display={{ xs: 'none', lg: 'block' }} variant="body1" color="text.primary" textAlign="end">
          {tokenPrice}
        </Typography>
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
            content={
              <Typography variant="body3">
                Liquidation penalty paid by vault to the liquidator for liquidating this asset
              </Typography>
            }
            text={`${penaltyPercent}%
          `}
            text_variant="body2"
          />
        </Box>
        <Box display={{ xs: 'none', lg: 'flex' }} justifyContent="center">
          {cappedAddress && (
            <LinearProgress
              color="success"
              variant="determinate"
              sx={{
                width: 80,
                height: 11,
                borderRadius: 1,
                backgroundColor: isLight ? formatColor(neutral.gray6) : formatColor(neutral.white),
              }}
              value={cappedPercent}
            />
          )}
        </Box>
        <Box display="flex" flexDirection="column" textAlign="end">
          <Typography variant="body1" color="text.primary">
            {vaultBalance}
          </Typography>

          <Typography variant="label_semi" color="text.secondary">
            {tokenAmount} {tokenTicker}
          </Typography>
        </Box>
        <Box display={{ xs: 'none', lg: 'flex' }} flexDirection="column" justifyContent="center">
          {canDelegate && tokenTicker !== 'MKR' && <DelegateButton onClick={setAndOpenDelegate} text="Delegate" />}
          {tokenTicker == 'MKR' && [
            <DelegateButton
              key={'delegate'}
              onClick={setAndOpenDelegate}
              text="Delegate"
              sx={{
                height: 'fit-content',
                paddingBottom: 0.375,
              }}
            />,
            <DelegateButton
              key={'undelegate'}
              onClick={openUndelegate}
              text="Undelegate"
              sx={{
                height: 'fit-content',
                paddingTop: 0.375,
              }}
            />,
          ]}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            columnGap: 1.5,
            justifySelf: 'flex-end',
          }}
        >
          <Button
            onClick={() => handleDWClick(ModalType.DepositCollateral)}
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
            onClick={() => handleDWClick(ModalType.WithdrawCollateral)}
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
            onClickDeposit={() => handleDWClick(ModalType.DepositCollateral)}
            onClickWithdraw={() => handleDWClick(ModalType.WithdrawCollateral)}
            canDelegate={canDelegate}
            onClickDelegate={setAndOpenDelegate}
          />
        </Box>
      </Box>
    </Box>
  )
}
