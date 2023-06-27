import { Box, Typography } from '@mui/material'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { useState } from 'react'
import mintVotingVaultID from '../../../contracts/VotingVault/mintVotingVault'
import { DisableableModalButton } from '../button/DisableableModalButton'
import SVGBox from '../../icons/misc/SVGBox'
import { Chains } from '../../../chain/chains'

type ButtonText = 'Enable Token' | 'Vault Minted'

export const EnableCappedTokenModal = () => {
  const { type, setType, collateralToken } = useModalContext()

  const { vaultID, setHasVotingVault } = useVaultDataContext()
  const { chainId, currentSigner } = useWeb3Context()
  const { setRefresh } = useVaultDataContext()

  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState<ButtonText>('Enable Token')
  const [error, setError] = useState<string | undefined>()
  const chain = Chains.getInfo(chainId)

  const mintVotingVault = async () => {
    try {
      if (vaultID && currentSigner) {
        setLoading(true)
        await mintVotingVaultID(chain.votingVaultController_addr!, vaultID, currentSigner!)

        setLoading(false)
        setButtonText('Vault Minted')
        setRefresh(true)
        setHasVotingVault(true)
        setError(undefined)
        setType(ModalType.DepositCollateralConfirmation)
      }
    } catch (err) {
      setLoading(false)
      const error = err as Error
      setError(error.message)
    }
  }

  return (
    <BaseModal
      open={type === ModalType.EnableCappedToken}
      setOpen={() => {
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

        <Typography variant="h7">Enable Capped Token</Typography>

        <Typography>
          Must enable capped tokens to deposit into the protocol. This is
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
