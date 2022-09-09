import { Button, Typography } from '@mui/material'
import { ForwardIcon } from '../../icons/misc/ForwardIcon'
import {
  useModalContext,
  ModalType,
} from '../../libs/modal-content-provider/ModalContentProvider'

export const DelegateIPTButton = () => {
  const { setType } = useModalContext()

  return (
    <Button
      variant="contained"
      sx={{
        py: 1,
        px: 2,
        height: 'auto',
        backgroundColor: 'button.delegate',
        color: 'white',
      }}
      onClick={() => setType(ModalType.DelegateIPT)}
    >
      <Typography variant="button">Delegate</Typography>
      <ForwardIcon strokecolor="white" sx={{ width: 12, height: 12, ml: 1 }} />
    </Button>
  )
}
