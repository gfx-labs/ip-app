import {Button, Typography} from "@mui/material"
import {Box} from "@mui/system"
import {formatColor, neutral} from "../../theme"


export const Splash: React.FC = ()=> {
    return(<>
        <Box
            sx={{
                maxWidth: "100%",
                paddingTop: {xs:30, md:40},
                paddingLeft: {xs: 2, md: 10},
                paddingBottom: {xs: 25,md: 50},
                backgroundColor: formatColor(neutral.gray11),
                display: "flex",
                alignItems: "left",
                justifyContent:"left",
            }}
        >
            <Box sx={{
                maxWidth: 1250,
                alignItems: "left",
                display:"flex",
                flexWrap:"wrap",
                justifyContent:"left",
                flexDirection: 'column'
                }}>
                <Box>
                    <Typography
                        flexBasis="50%"
                        variant="h1"
                        sx={{
                            fontSize:{ xs: 40, md: 88},
                            lineHeight: {xs: 1.35},
                            color: formatColor(neutral.gray1),
                        }}>
                        Interest Protocol
                    </Typography>
                </Box>
                <Box/>
                <Box sx={{flexBasis: "100%"}}/>
                <Box sx={{flexBasis: "100%"}}>
                    <Button href="whitepaper.pdf" sx={{
                        marginTop: {xs: 2, md: 5},
                        color: formatColor(neutral.black),
                        border: "1px solid "+ formatColor(neutral.black),
                        width: 'auto',
                        whiteSpace: 'nowrap',
                        px: 3
                        }}>
                        IP Whitepaper -{">"}
                    </Button>
                </Box>
                <Box/>
            </Box>
        </Box>
    </>)
}
