import Box from "@mui/material/Box"
import SVGBox from "../../icons/misc/SVGBox"
import Typography from "@mui/material/Typography"
import orange from "@mui/material/colors/orange"

const WarningAlert = (props: { msg: string }) => {
  const { msg } = props

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 2,
        columnGap: '1rem',
        width: '100%',
        backgroundColor: orange[50],
        padding: '1rem 0.5rem 1rem 1rem',
        border: '1px solid #cdcdcd',
        borderRadius: '0.25rem',
        //borderLeft: '4px solid #ff9800'
      }}>
      <SVGBox
        width={30}
        height={30}
        svg_name='caution'
        alt='warning'
      />
      <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '0.5rem'}}>
        <Typography variant='label' color='#663c00'>Warning</Typography>
        <Typography variant='label_semi' color='#663c00'>
          {msg}
        </Typography>
      </Box>
    </Box>
  )
}

export default WarningAlert