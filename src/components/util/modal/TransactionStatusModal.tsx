import { Box, Typography, Link as MuiLink, Button } from '@mui/material'
import { formatColor, neutral } from '../../../theme'
import { ModalType, useModalContext } from '../../providers/ModalContentProvider'
import { Spinner } from '../loading'
import { BaseModal } from './BaseModal'
import { Chains } from '../../../chain/chains'
import { useWeb3Context } from '../../providers/Web3Provider'
import { ContractReceipt, ContractTransaction } from 'ethers'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { useEffect } from 'react'
import SVGBox from '../../icons/misc/SVGBox'

export const TransactionStatusModal = () => {
  const { type, setType, transactionState, transaction } = useModalContext()
  const { chainId } = useWeb3Context()
  const { setRefresh } = useVaultDataContext()

  useEffect(() => {
    if (transactionState === 'SUCCESS') {
      setRefresh(true)
    }
  }, [transactionState])

  const renderTransitionState = () => {
    const chain = Chains[chainId]

    switch (transactionState) {
      case 'PENDING':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              Pending Transaction
            </Typography>
            <Box my={3}>
              <Spinner />
            </Box>
            <MuiLink target="_blank" href={`${chain.scan_url}${(transaction as ContractTransaction).hash}`}>
              <Button variant="contained" sx={{ color: formatColor(neutral.white) }}>
                View on {chain.scan_site}
              </Button>
            </MuiLink>
          </Box>
        )
      case 'SUCCESS':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              Successful Transaction
            </Typography>
            <SVGBox svg_name="ip_green" width={40} height={40} alt="ip_green" sx={{ my:2, mx: 'auto' }} />
            <MuiLink target="_blank" href={`${chain.scan_url}${(transaction as ContractReceipt).transactionHash}`}>
              <Button
                variant="contained"
                sx={{
                  color: formatColor(neutral.white),
                  display: 'block',
                  margin: 'auto',
                }}
              >
                View on {chain.scan_site}
              </Button>
            </MuiLink>
          </Box>
        )
      case 'FAILURE':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              Failed Transaction
            </Typography>
            <Box my={1}>
              <SVGBox width={50} height={50} svg_name="caution" alt="warning" />
            </Box>
            <MuiLink target="_blank" href={`${chain.scan_url}${(transaction as ContractReceipt).transactionHash}`}>
              <Button variant="contained" sx={{ color: formatColor(neutral.white) }}>
                View on {chain.scan_site}
              </Button>
            </MuiLink>
          </Box>
        )
      default:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              Error
            </Typography>
            <Box my={3}>
              <SVGBox width={50} height={50} svg_name="caution" alt="warning" />
            </Box>
            <Button variant="contained" sx={{ color: formatColor(neutral.white) }} onClick={() => setType(null)}>
              Please try again later
            </Button>
          </Box>
        )
    }
  }

  return (
    <BaseModal
      open={type === ModalType.TransactionStatus}
      onClose={() => {
        setType(null)
      }}
      contentMaxWidth={400}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
          mt: 4,
          rowGap: 2,
        }}
      >
        {renderTransitionState()}
      </Box>
    </BaseModal>
  )
}
