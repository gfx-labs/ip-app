import { Box, Typography, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { ContractReceipt } from 'ethers'

import { blue, formatColor, neutral } from '../../../theme'
import {
  ModalType,
  useModalContext,
} from '../../libs/modal-content-provider/ModalContentProvider'
import { BaseModal } from './BaseModal'
import { useLight } from '../../../hooks/useLight'
import { DisableableModalButton } from '../button/DisableableModalButton'
import { ModalInputContainer } from './ModalContent/ModalInputContainer'
import { useWeb3Context } from '../../libs/web3-data-provider/Web3Provider'
import { locale } from '../../../locale'
import {
  delegateUserVotingPower,
  getUserVotingPower,
} from '../../../contracts/IPTDelegate'
import { useAppGovernanceContext } from '../../libs/app-governance-provider/AppGovernanceProvider'
import { getUserIPTBalance } from '../../../contracts/IPTDelegate/getUserIPTbalance'
import { BN } from '../../../easy/bn'

export const DelegateIPTModal = () => {
  const { type, setType, updateTransactionState } = useModalContext()
  const {
    needsToDelegate,
    iptBalance,
    setCurrentVotes,
    setNeedsToDelegate,
    setIptBalance,
  } = useAppGovernanceContext()
  const isLight = useLight()

  const [focus, setFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [loadmsg, setLoadmsg] = useState('')
  const [screen, setScreen] = useState(0)

  const [address, setAddress] = useState('')

  const toggle = () => setFocus(!focus)

  const { currentSigner, currentAccount } = useWeb3Context()

  const handleDelegateRequest = async (delegateToSomeoneElse: boolean) => {
    setLoading(true)
    setLoadmsg(locale('CheckWallet'))

    const delegatee = delegateToSomeoneElse ? address : currentAccount

    try {
      await delegateUserVotingPower(delegatee, currentSigner!).then(
        async (res) => {
          updateTransactionState(res)
          setLoadmsg(locale('TransactionPending'))
          setLoading(true)
          return res!.wait().then((res) => {
            setLoadmsg('')
            setLoading(false)

            updateTransactionState(res)

            if (currentAccount && currentSigner) {
              getUserVotingPower(currentAccount, currentSigner!).then((res) => {
                const currentVotes = res.div(BN('1e16')).toNumber() / 100
                setCurrentVotes(currentVotes)

                if (currentVotes <= 0) {
                  getUserIPTBalance(currentAccount, currentSigner!).then(
                    (response) => {
                      const iptBalance =
                        response.div(BN('1e16')).toNumber() / 100

                      setNeedsToDelegate(iptBalance > 0)
                      setIptBalance(iptBalance)
                    }
                  )
                }
              })
            }
          })
        }
      )
    } catch (e) {
      setLoading(false)
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
      console.log(e)

      const err = e as ContractReceipt

      updateTransactionState(err)
    }
  }

  return (
    <BaseModal
      open={type === ModalType.DelegateIPT}
      setOpen={() => {
        setType(null)
        setScreen(0)
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          mt: 2,
          columnGap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 1,
            mt: 1,
            flexDirection: 'column',
          }}
        >
          <Typography variant="subtitle2" color="text.primary" mb={0}>
            {screen === 0 ? 'Delegate your IPT' : 'Add Delegate'}
          </Typography>
        </Box>
        {needsToDelegate && (
          <Typography variant="label" display="block" color="text.primary">
            You have{' '}
            {iptBalance.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{' '}
            IPT. You should delegate your IPT votes to yourself or a friend.
          </Typography>
        )}

        {screen !== 0 && (
          <Typography
            variant="body2"
            display="block"
            color={
              isLight ? formatColor(neutral.gray3) : formatColor(neutral.gray3)
            }
          >
            You can either vote yourself or delegate your votes to someone else.
          </Typography>
        )}
        {screen === 0 ? (
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: formatColor(blue.blue1),
                color: formatColor(neutral.white),
                my: 2,
              }}
              onClick={() => handleDelegateRequest(false)}
            >
              Self Delegate
            </Button>
            <Button
              variant="text"
              sx={{
                fontSize: 14,
                color: isLight
                  ? formatColor(neutral.black)
                  : formatColor(neutral.white),
              }}
              onClick={() => setScreen(1)}
            >
              Add Delegate
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={() => handleDelegateRequest(true)}>
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
                      fontWeight: 700,
                      color: isLight
                        ? formatColor(neutral.gray1)
                        : formatColor(neutral.white),
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
              onClick={() => handleDelegateRequest(true)}
            />
          </Box>
        )}
      </Box>
    </BaseModal>
  )
}
