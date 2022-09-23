import { Typography } from '@mui/material'
import { ContractReceipt } from 'ethers'
import { useModalContext } from '../../libs/modal-content-provider/ModalContentProvider'
import { useRolodexContext } from '../../libs/rolodex-data-provider/RolodexDataProvider'
import { useWalletModalContext } from '../../libs/wallet-modal-provider/WalletModalProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { InverseButton } from './InverseButton'

export const OpenVaultButton = () => {
  const { setIsWalletModalOpen } = useWalletModalContext()
  const rolodex = useRolodexContext()
  const { updateTransactionState } = useModalContext()
  const { connected, currentAccount } = useWeb3Context()

  const openVault = async () => {
    if (
      !connected ||
      currentAccount === null ||
      currentAccount === undefined ||
      currentAccount === ''
    ) {
      setIsWalletModalOpen(true)
      return
    }

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

  return (
    <InverseButton sx={{ width: '100%' }} onClick={openVault}>
      <Typography variant="body1">Open a Vault</Typography>
    </InverseButton>
  )
}
