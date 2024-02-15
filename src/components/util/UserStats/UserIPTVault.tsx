import { Box, Typography } from '@mui/material'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { useWeb3Context } from '../../providers/Web3Provider'
import {
  ConnectWalletButton,
  CopyButton,
} from '../button'
import { addressShortener } from '../text'
import { ToolTip } from '../tooltip/ToolTip'
import { CardContainer } from '../cards/CardContainer'
import { ClaimsCard } from '../cards/ClaimsCard'

export const UserIPTVault = () => {
  const { connected } = useWeb3Context()
  const { vaultAddress } = useVaultDataContext()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        columnGap: 3,
        rowGap: 3,
        justifyContent: {
          xs: 'space-between',
        },
        alignItems: 'center',
        marginBottom: 3,
      }}
    >
      <ClaimsCard />
      <CardContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={{ xs: 2, lg: 3 }}
        >
          <Box>
            <ToolTip
              content={
                <Typography variant="body3">
                  Each vault is a unique smart contract. You can transfer ERC20
                  collateral directly to your vault to increase the vault's
                  borrowing power. (Do NOT transfer unwrapped ETH to your vault;
                  it may not be recoverable.)
                </Typography>
              }
              text={`Vault Address`}
              text_variant="label_semi"
            />
            <Typography color="text.primary" variant="h7">
              {addressShortener(
                vaultAddress
                  ? vaultAddress
                  : '0x0000000000000000000000000000000000000000'
              )}
            </Typography>
          </Box>
          {connected ? (
            vaultAddress ? (
              <CopyButton copy={vaultAddress} />
            ) : (
              <CopyButton copy={`0x0000000000000000000000000000000000000000`} />
            )
          ) : (
            <Box>
              <ConnectWalletButton />
            </Box>
          )}
        </Box>
      </CardContainer>
    </Box>
  )
}
