import { Box, Typography, TextField, Button } from '@mui/material'
import { useState, FormEvent } from 'react'
import { ContractReceipt, ContractTransaction } from 'ethers'

import { formatColor, neutral } from '../../../theme'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useLight } from '../../../hooks/useLight'
import { useAppGovernanceContext } from '../../libs/app-governance-provider/AppGovernanceProvider'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { ModalInputContainer } from './ModalContent/ModalInputContainer'
import { useVaultDataContext } from '../../libs/vault-data-provider/VaultDataProvider'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { locale } from '../../../locale'
import { delegateVaultVotingPower } from '../../../contracts/Vault/delegateVaultVotingPower'
import SVGBox from '../../icons/misc/SVGBox'
import { DecimalInput } from '../textFields'

export const UndelegateModal = () => {
  const { type, setType, updateTransactionState } = useModalContext()
  const isLight = useLight()

  const [focus, setFocus] = useState(false)
  const [amtFocus, setAmtFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')

  const { delegateToken } = useAppGovernanceContext()
  const { vaultAddress, votingVaultAddress, hasVotingVault, MKRVotingVaultAddr } =
    useVaultDataContext()
  const { currentSigner, currentAccount } = useWeb3Context()
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(delegateToken.vault_amount_str ?? '')
  const [isMax, setIsMax] = useState(false)

  const toggle = () => setFocus(!focus)
  const amtInputToggle = () => setAmtFocus(!amtFocus)

  const trySetInputAmount = (amount: string) => {
    setAmount(amount)
    setIsMax(false)
  }

  const setMax = () => {
    setAmount(delegateToken.vault_amount_str!)
    setIsMax(true)
  }

  const handleUndelegateRequest = async () => {
    //e.preventDefault()
    setLoading(true)
    setLoadmsg(locale('CheckWallet'))
    try {
      let delegateAddress =
        delegateToken.capped_address && hasVotingVault
          ? votingVaultAddress
          : vaultAddress
      if (delegateToken.ticker === 'MKR') {
        delegateAddress = MKRVotingVaultAddr
      }

      await delegateVaultVotingPower(
        delegateAddress!,
        delegateToken,
        address,
        currentSigner!,
      ).then(async (res) => {
        updateTransactionState(res)
        setLoadmsg(locale('TransactionPending'))
        setLoading(true)
        return res!.wait().then((res) => {
          setLoadmsg('')
          setLoading(false)

          updateTransactionState(res)
        })
      })
    } catch (e) {
      //console.log(e)
      setLoading(false)
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
      //console.log(e)

      const err = e as ContractTransaction
      console.log(err)
      updateTransactionState(err)
    }
  }

  return (
    <BaseModal
      open={type === ModalType.Undelegate}
      setOpen={() => {
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
          <SVGBox
            svg_name={delegateToken.ticker}
            width={40}
            height={40}
            alt={delegateToken.name}
          />
          <Box>
            <Typography variant="subtitle1" color="text.primary">
              ${delegateToken.ticker}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color={
            isLight ? formatColor(neutral.black) : formatColor(neutral.white)
          }
        >
          Enter the address you would like to undelegate your vote(s) from
        </Typography>
        <Box component="form" onSubmit={handleUndelegateRequest}>
          <Box sx={{ 
            display: 'grid', 
            alignItems: 'center',
            mb: 2.5,
            mt: 4,
            gridTemplateColumns: '1.75fr 1fr',
            columnGap: 2,}}>
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
                    color: isLight
                      ? formatColor(neutral.gray1)
                      : formatColor(neutral.white),
                  },
                }}
              />
            </ModalInputContainer>
            <ModalInputContainer focus={amtFocus}>
              <DecimalInput
                onFocus={() => setAmtFocus(!amtFocus)}
                onBlur={amtInputToggle}
                onChange={trySetInputAmount}
                placeholder={`0 ${delegateToken.ticker}`}
                value={amount}
              />

              <Box sx={{ display: 'flex', paddingBottom: 0.5, alignItems: 'center' }}>
                <Button
                  onClick={setMax}
                  sx={{
                    minWidth: 'auto',
                    height: 30,
                    paddingY: 2,
                    paddingX: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      '.MuiTypography-root.MuiTypography-body1': {
                        color: formatColor(neutral.gray1),
                      },
                    },
                  }}
                >
                  <Typography
                    variant="body3"
                    color={formatColor(neutral.gray3)}
                    sx={{
                      '&:hover': {
                        color: isLight
                          ? formatColor(neutral.gray1)
                          : formatColor(neutral.white),
                      },
                    }}
                  >
                    Max
                  </Typography>
                </Button>
              </Box>
            </ModalInputContainer>
          </Box>
          <DisableableModalButton
            type="submit"
            text="Delegate"
            loading={loading}
            shaking={shaking}
            load_text={loadmsg}
            onClick={handleUndelegateRequest}
          />
        </Box>
      </Box>
    </BaseModal>
  )
}
