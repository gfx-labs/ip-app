import { Typography, Button, Box } from '@mui/material'
import { ContractReceipt } from 'ethers'
import { useState } from 'react'
import { useLight } from '../../../hooks/useLight'
import SVGBox from '../../icons/misc/SVGBox'
import { useModalContext } from '../../providers/ModalContentProvider'
import { useRolodexContext } from '../../providers/RolodexDataProvider'
import { useWalletModalContext } from '../../providers/WalletModalProvider'
import { useWeb3Context } from '../../providers/Web3Provider'

export const OpenVaultButton = () => {
  const { setIsWalletModalOpen } = useWalletModalContext()
  const rolodex = useRolodexContext()
  const { updateTransactionState } = useModalContext()
  const { connected, currentAccount, currentSigner } = useWeb3Context()
  const isLight = useLight()
  const [ishovered, setIshovered] = useState(false)
  
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

  return (
    <Button
      variant="contained"
      sx={{
        width: '100%',
        backgroundColor: 'button.status',
        boxShadow: 0,
        color: isLight ? '#FFFFFF' : '#353947',
        '&:hover': {
          backgroundColor: 'button.hoverGray',
        },
      }}
      onClick={openVault}
      onMouseEnter={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
    >
      <SVGBox
        svg_name={ishovered ? 'unlock' : 'lock'}
        width={16}
        height={16}
        sx={{ mr: 1 }}
      />

      <Typography variant="body1" lineHeight={1}>
        Open a Vault
      </Typography>
    </Button>
  )
}
