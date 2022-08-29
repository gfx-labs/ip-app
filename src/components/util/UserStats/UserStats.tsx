import { Box, Typography, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import { useLight } from '../../../hooks/useLight'
import { formatColor, formatGradient, gradient, neutral } from '../../../theme'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { useRolodexContext } from '../../libs/rolodex-data-provider/RolodexDataProvider'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import {
  ClaimsButton,
  ConnectWalletButton,
  CopyButton,
  InverseButton,
} from '../button'
import { addressShortener, TitleText } from '../text'
import { SingleStatCard } from './SingleStatCard'
import { UserTokenCard } from './UserTokenCard'
import { BN, round } from '../../../easy/bn'
import { OpenVaultButton } from '../button/OpenVaultButton'
import { ToolTip } from '../tooltip/ToolTip'
import { TitleTextToolTip } from '../text/TitleTextToolTip'

const StatsBodyTypography = ({ text }: { text: string }) => (
  <Typography
    variant="label2"
    color={formatColor(neutral.gray3)}
    whiteSpace="nowrap"
  >
    {text}
  </Typography>
)
export const UserStats = () => {
  const isLight = useLight()
  const [borrowAPR, setBorrowAPR] = useState(0)
  const [depositAPR, setDepositAPR] = useState(0)

  const [token_cards, setTokenCards] = useState<JSX.Element | undefined>(
    undefined
  )

  const theme = useTheme()
  const { connected, currentAccount, dataBlock } = useWeb3Context()
  const rolodex = useRolodexContext()
  const {
    tokens,
    vaultID,
    redraw,
    hasVault,
    vaultAddress,
    borrowingPower,
    accountLiability,
    totalBaseLiability,
  } = useVaultDataContext()
  const { setType } = useModalContext()

  useEffect(() => {
    if (rolodex) {
      rolodex!
        .USDI!.reserveRatio()
        .then((ratio) => {
          const ratioDec = ratio.div(1e14).toNumber() / 1e4
          return rolodex!.Curve?.getValueAt(
            '0x0000000000000000000000000000000000000000',
            ratio
          ).then((apr) => {
            const ba = apr.div(BN('1e14')).toNumber() / 100
            setBorrowAPR(ba)
            setDepositAPR(round(ba * (1 - ratioDec) * 0.85, 3))
          })
        })
        .catch((e) => {
          setBorrowAPR(0)
        })
    }
  }, [rolodex, dataBlock])

  useEffect(() => {
    if (tokens) {
      let el: Array<any> = []
      for (const [key, val] of Object.entries(tokens)) {
        el.push(
          <UserTokenCard
            key={key}
            tokenName={val.name}
            tokenTicker={val.ticker}
            tokenValue={'$' + val.value?.toLocaleString()!}
            vaultBalance={'$' + val.vault_balance?.toLocaleString()!}
            tokenAmount={val.vault_amount?.toLocaleString()!}
            image={{
              src: val.ticker,
              alt: val.ticker,
            }}
            LTVPercent={val.token_LTV!.toLocaleString()}
            penaltyPercent={val.token_penalty!.toLocaleString()}
            canDelegate={val.can_delegate ? true : false}
          />
        )
      }
      setTokenCards(<>{el}</>)
    }
  }, [redraw])

  return (
    <Box
      sx={{
        backgroundColor: 'smallCard.background',
        paddingX: 4,
        paddingY: 4,
        borderRadius: 2.5,
        [theme.breakpoints.down('md')]: {
          paddingX: 2,
          paddingY: 2,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'space-between',
          },
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <ClaimsButton />

        <Box
          display="flex"
          alignItems="center"
          columnGap={2}
          width="fit-content"
        >
          <ToolTip
            content={
              <Typography variant="body3">
                Each vault is a unique smart contract. You can transfer ERC20
                collateral directly to your vault to increase the vault's
                borrowing power. (Do NOT transfer unwrapped ETH to your vault;
                it may not be recoverable.)
              </Typography>
            }
            text={`Vault #${vaultID || ''}`}
            text_variant="label2"
          />

          {connected ? (
            vaultAddress ? (
              <CopyButton
                text={addressShortener(vaultAddress!)}
                copy={vaultAddress}
              />
            ) : (
              <CopyButton
                text={addressShortener(
                  '0x0000000000000000000000000000000000000000'
                )}
                copy={`0x0000000000000000000000000000000000000000`}
              />
            )
          ) : (
            <ConnectWalletButton />
          )}
        </Box>
      </Box>

      {/* <Box
        sx={{
          display: 'grid',
          justifyContent: 'space-between',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 4,
          marginBottom: 4,
          [theme.breakpoints.down('lg')]: {
            gridAutoFlow: 'column',
            gridTemplateColumns: '1fr 1fr',
            gap: 3,
            marginBottom: 0,
          },
          [theme.breakpoints.down('sm')]: {
            gap: 2,
          },
        }}
      >
        <SingleStatCard>
          <TitleTextToolTip
            title={`Borrowing Power`}
            tooltipContent="Maximum amount that your vault can borrow, calculated by the sum of collateral values discounted by the LTV"
            text={
              borrowingPower !== null
                ? '$' + Math.round(borrowingPower).toLocaleString()
                : null
            }
          />
        </SingleStatCard>

        <SingleStatCard>
          <TitleTextToolTip
            title={`Borrow APR`}
            tooltipContent="Current annualized rate paid by USDi borrowers"
            text={borrowAPR !== null ? borrowAPR.toFixed(2) + '%' : null}
          />
        </SingleStatCard>
        <SingleStatCard>
          <TitleTextToolTip
            title={`Deposit APR`}
            tooltipContent="Current annualized rate paid to USDi holders. All interest paid by borrowers, net of a 15% protocol fee, is distributed to USDi holders."
            text={depositAPR !== null ? depositAPR.toFixed(2) + '%' : null}
          />
        </SingleStatCard>
        <SingleStatCard>
          <TitleTextToolTip
            title={`IPT per year`}
            tooltipContent="Current annualized amount of IPT being earned by your vault for borrowing USDi"
            text={
              totalBaseLiability !== null && accountLiability !== 0
                ? `${Math.round(
                    ((94017 * accountLiability) / totalBaseLiability) * 52.143
                  )}` + ''
                : '0'
            }
          />
        </SingleStatCard>

        <SingleStatCard
          sx={{
            gridColumn: '1 / -1',
            [theme.breakpoints.down('lg')]: {
              gridRow: 3,
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              [theme.breakpoints.down('lg')]: {
                flexWrap: 'wrap',
                rowGap: 2,
              },
            }}
          >
            <TitleTextToolTip
              tooltipContent="Amount of USDi your vault is currently borrowing. This increases as interest accrues."
              title={`USDi Borrowed`}
              text={
                accountLiability !== null
                  ? '$' + Math.round(accountLiability).toLocaleString()
                  : null
              }
            />

            {hasVault ? (
              <Box
                display="grid"
                alignItems="center"
                columnGap={2}
                gridTemplateColumns="1fr 1fr"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    width: '100%',
                  },
                  [theme.breakpoints.down('sm')]: {
                    gridTemplateColumns: '1fr',
                    rowGap: 2,
                  },
                }}
              >
                <InverseButton onClick={() => setType(ModalType.Borrow)}>
                  <Typography variant="body3">Borrow</Typography>
                </InverseButton>

                <InverseButton onClick={() => setType(ModalType.Repay)}>
                  <Typography variant="body3">Repay</Typography>
                </InverseButton>
              </Box>
            ) : (
              <Box
                maxWidth={{ xs: 'auto', md: 350 }}
                width="100%"
                display="flex"
                alignItems="center"
              >
                <OpenVaultButton />
              </Box>
            )}
          </Box>
        </SingleStatCard>
      </Box> */}
      <Box
        sx={{
          mt: { xs: 2, md: 3 },
          display: 'grid',
          gridTemplateColumns: {
            sm: '1fr',
          },
          columnGap: 3,
          rowGap: 3,
        }}
      >
        {token_cards}
      </Box>
    </Box>
  )
}
