import {Button, Typography} from "@mui/material"
import {Box} from "@mui/system"
import {formatColor, neutral} from "../../theme"


export const Splash: React.FC = ()=> {
    return(<>
        <Box
            sx={{
                maxWidth: "100%",
                paddingTop: 40,
                paddingLeft: 10,
                paddingBottom: 50,
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
                }}>
                <Box>
                    <Typography
                        flexBasis="50%"
                        fontSize= "400%"
                        variant="h1"
                        sx={{
                            color: formatColor(neutral.gray1),
                        }}>
                        Interest Protocol
                    </Typography>
                </Box>
                <Box/>
                <Box sx={{flexBasis: "100%"}}/>
                <Box sx={{flexBasis: "100%"}}>
                    <Button sx={{
                        marginTop: 5,
                        color: formatColor(neutral.black),
                        width: "25%",
                        border: "1px solid "+ formatColor(neutral.black),
                        }}>
                        IP Whitepaper
                    </Button>
                </Box>
                <Box/>
            </Box>
        </Box>
    </>)
}
