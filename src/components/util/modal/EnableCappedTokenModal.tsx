import { Box, Typography } from '@mui/material'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { useState } from 'react'
import { SubVault, mintSubVault, mintNftVault } from '../../../contracts/VotingVault/mintSubVault'
import { DisableableModalButton } from '../button/DisableableModalButton'
import SVGBox from '../../icons/misc/SVGBox'
import { Chains } from '../../../chain/chains'
import { isToken } from '../../../chain/tokens'

type ButtonText = 'Mint Vault' | 'Vault Minted'

export const EnableCappedTokenModal = () => {
  const { type, setType, collateralToken } = useModalContext()
  const { vaultId, setHasVotingVault, setHasBptVault, setHasMKRVotingVault, setHasNftVault } = useVaultDataContext()
  const { chainId, currentSigner } = useWeb3Context()
  const { setRefresh } = useVaultDataContext()
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState<ButtonText>('Mint Vault')
  const [error, setError] = useState<string | undefined>()
  const chain = Chains[chainId]

  const mintVotingVault = async () => {
    let type: SubVault
    try {
      if (isToken(collateralToken)) {
        setLoading(true)
        type = collateralToken.bpt ? SubVault.BPT : SubVault.Voting
        if (collateralToken.ticker == 'MKR') {
          type = SubVault.MKR
        }
        await mintSubVault(chain.votingVaultController_addr!, vaultId!, currentSigner!, type)
      } else {
        setLoading(true)
        type = SubVault.NFT
        await mintNftVault(vaultId!, currentSigner!)
      }
      setLoading(false)
      setButtonText('Vault Minted')
      setRefresh(true)
      switch (type) {
        case SubVault.BPT: setHasBptVault(true)
        break
        case SubVault.MKR: setHasMKRVotingVault(true)
        break
        case SubVault.Voting: setHasVotingVault(true)
        break
        case SubVault.NFT: setHasNftVault(true)
      }
      setError(undefined)
      setType(ModalType.DepositCollateralConfirmation)
    } catch (err) {
      setLoading(false)
      const error = err as Error
      setError(error.message)
    }
  }

  return (
    <BaseModal
      open={type === ModalType.MintSubVault}
      onClose={() => {
        setType(null)
      }}
      contentMaxWidth={400}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 2,
        }}
      >
        <SVGBox
          width={170}
          height={141}
          svg_name="enable_capped_token_icon"
          alt="enable capped token icon"
          sx={{ mx: 'auto' }}
        />
        <Typography variant="h7">Mint Vault</Typography>
        <Typography>
          Must mint a {} vault to deposit this asset. This is
          required only once.
        </Typography>
        <DisableableModalButton
          text={buttonText}
          disabled={false}
          onClick={mintVotingVault}
          loading={loading}
          load_text={'Pending Transaction'}
        />
        {error && (
          <Typography textAlign="center" color="red">
            {error}
          </Typography>
        )}
      </Box>
    </BaseModal>
  )
}
