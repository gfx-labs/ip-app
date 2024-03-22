import { Box, Typography, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { ContractTransaction } from 'ethers'
import { formatColor, neutral } from '../../../theme'
import { ModalType, useModalContext } from '../../providers/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useLight } from '../../../hooks/useLight'
import { useAppGovernanceContext } from '../../providers/AppGovernanceProvider'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { ModalInputContainer } from './ModalContent/ModalInputContainer'
import { useVaultDataContext } from '../../providers/VaultDataProvider'
import { useWeb3Context } from '../../providers/Web3Provider'
import { locale } from '../../../locale'
import { delegateVaultVotingPower } from '../../../contracts/Vault/delegateVaultVotingPower'
import SVGBox from '../../icons/misc/SVGBox'
import getDelegate from '../../../contracts/Vault/getDelegate'
import { ZERO_ADDRESS } from '../../../constants'

export const DelegateModal = () => {
  const { type, setType, updateTransactionState } = useModalContext()
  const isLight = useLight()
  const [focus, setFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const [address, setAddress] = useState('')
  const [delegate, setDelegate] = useState('')
  const { delegateToken } = useAppGovernanceContext()
  const { vaultAddress, votingVaultAddress, hasVotingVault, MKRVotingVaultAddr } = useVaultDataContext()
  const { currentSigner } = useWeb3Context()
  const toggle = () => setFocus(!focus)
  let delegateAddress = delegateToken.capped_address && hasVotingVault ? votingVaultAddress : vaultAddress

  useEffect(() => {
    if (currentSigner) {
      getDelegate(delegateToken.address, currentSigner!, delegateAddress!).then(setDelegate)
    }
  }, [delegateToken])

  const handleDelegateRequest = async () => {
    setLoading(true)
    setLoadmsg(locale('CheckWallet'))
    try {
      if (delegateToken.ticker === 'MKR') {
        delegateAddress = MKRVotingVaultAddr
      }
      const txn = await delegateVaultVotingPower(delegateAddress!, delegateToken, address, currentSigner!)
      updateTransactionState(txn)
      setLoadmsg(locale('TransactionPending'))
      setLoading(true)

      const receipt = await txn.wait()
      setLoadmsg('')
      setLoading(false)
      updateTransactionState(receipt)
    } catch (e) {
      setLoading(false)
      setShaking(true)
      setTimeout(() => setShaking(false), 400)

      const err = e as ContractTransaction
      console.log(err)
      updateTransactionState(err)
    }
  }

  return (
    <BaseModal
      open={type === ModalType.Delegate}
      onClose={() => {
        setType(null)
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          mb: 2.5,
          mt: 4,
          columnGap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2.5,
            mt: 4,
            columnGap: 2,
          }}
        >
          <SVGBox svg_name={delegateToken.ticker} width={40} height={40} alt={delegateToken.name} />
          <Box>
            <Typography variant="subtitle1" color="text.primary">
              ${delegateToken.ticker}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color={isLight ? formatColor(neutral.black) : formatColor(neutral.white)}>
          Enter the address you would like to delegate your vote(s) to
        </Typography>
        <Box component="form" onSubmit={handleDelegateRequest}>
          <Box my={2}>
            <ModalInputContainer focus={focus}>
              <TextField
                placeholder="Address"
                variant="standard"
                onBlur={toggle}
                onFocus={toggle}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  sx: {
                    '&:before, &:after': {
                      borderBottom: 'none !important',
                    },
                  },
                }}
                sx={{
                  width: '100%',
                  paddingBottom: '4px',
                  '.MuiInputBase-input': {
                    fontWeight: 600,
                    color: isLight ? formatColor(neutral.gray1) : formatColor(neutral.white),
                  },
                }}
              />
            </ModalInputContainer>
          </Box>
          <DisableableModalButton
            type="submit"
            text="Delegate"
            loading={loading}
            shaking={shaking}
            load_text={loadmsg}
            onClick={handleDelegateRequest}
          />
        </Box>
        {currentSigner && delegateToken.ticker !== 'MKR' && (
          <Box mt={2}>
            <Typography
              variant="label_semi"
              sx={{
                color: formatColor(neutral.gray3),
              }}
            >
              Delegation status: {delegate && delegate !== ZERO_ADDRESS ? 'Delegated to ' + delegate : 'Not delegated'}
            </Typography>
          </Box>
        )}
      </Box>
    </BaseModal>
  )
}
