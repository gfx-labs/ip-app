import { Button, Typography } from '@mui/material'
import { ForwardIcon } from '../../icons/misc/ForwardIcon'
import {
  useModalContext,
  ModalType,
} from '../../libs/modal-content-provider/ModalContentProvider'

export const DelegateIPTButton = ({ votingPower }: { votingPower: number }) => {
  const { setType } = useModalContext()

  return (
    <Button
      variant="contained"
      sx={{
        py: 1,
        px: 2,
        height: 'auto',
        backgroundColor: 'button.delegate',
        stroke: 'white',
        '&:hover': {
          stroke: '#374252',
        },
      }}
      onClick={() => setType(ModalType.DelegateIPT)}
      disabled={votingPower <= 0}
    >
      <Typography variant="button">Delegate</Typography>
      <ForwardIcon
        sx={{
          width: 12,
          height: 12,
          ml: 1,
        }}
      />
    </Button>
  )
}
