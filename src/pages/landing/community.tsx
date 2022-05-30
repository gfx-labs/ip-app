import { Typography} from "@mui/material"
import {Box} from "@mui/system"
import {formatColor, formatGradient, gradient, neutral} from "../../theme"
import {generateSmoothGradient} from "../../theme/gradient/easing"


export const Community: React.FC = ()=> {
    return(<>
        <Box
            sx={{
                maxWidth: "100%",
                paddingTop: 10,
                paddingLeft: 10,
                paddingBottom: 30,
                backgroundColor: formatColor(neutral.white),
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent:"center",
                gap: 5,
            }}>
            <Box sx={{
                display:"flex",
                flexWrap:"nowrap",
                flexBasis:"100%",
                width:"100%",
                maxWidth:1250,
                alignItems: "center",
                justifyContent:"center",
                }}>
                <Typography
                    display="inline"
                    variant="h1"
                    sx={{
                        color: formatColor(neutral.black),
                    }}
                >
                    Join the Community
                </Typography>
            </Box>
            <Box sx={{flexBasis: "100%"}} />
            <Box
                sx={{
                    flexBasis: "100%",
                    flexWrap: "nowrap",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                <Box sx={{flexBasis:"30%"}}/>
                <Box sx={{
                    flexBasis:"20%",
                    textAlign:"center",
                    }}>
                    [Discord]
                </Box>
                <Box sx={{
                    flexBasis:"20%",
                    textAlign:"center"
                    }}>
                    [Twitter]
                </Box>
                <Box sx={{flexBasis:"30%"}}/>

            </Box>
            <Box sx={{flexBasis: "100%"}} />
            <Box sx={{flexBasis: "100%"}} />
            <Box sx={{flexBasis: "100%"}} />
            <Box sx={{flexBasis: "100%"}} />
            <Typography
                display="inline"
                variant="h3"
                sx={{
                    color: formatColor(neutral.gray3),
                }}
            >
                See you soon!
            </Typography>
        </Box>
    </>)
}
