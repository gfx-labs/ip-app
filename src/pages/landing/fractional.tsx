import { Button, Typography} from "@mui/material"
import {Box} from "@mui/system"
import {formatColor, formatGradient, gradient, neutral} from "../../theme"
import {generateSmoothGradient} from "../../theme/gradient/easing"


export const Fractional: React.FC = ()=> {
    return(<>
        <Box
            sx={{
                maxWidth: "100%",
                backgroundColor: formatColor(neutral.gray11),
                display: "flex",
                flexWrap: "nowrap",
                justifyContent:"left",
                flexDirection: "row",
                height: "100%",
                alignItems: "stretch",
                gap: 5,
            }}>
            <Box sx={{
                paddingTop: 30,
                paddingLeft: 10,
                paddingBottom: 50,
                flexWrap:"wrap",
                flexBasis:"50%",
                width:"50%",
                maxWidth:1250,
                alignItems: "left",
                justifyContent:"left",
                }}>
                <Typography
                    display="inline"
                    variant="h1"
                    flexBasis="100%"
                    fontSize= "200%"
                    sx={{
                        color: formatColor(neutral.black),
                        lineHeight: 1.3,
                    }}
                >
                    Interest Protocol applies fractional reserve banking to decentralized finance
                </Typography>
            <Box sx={{flexBasis: "100%"}}>
            </Box>
                <Typography
                    display="inline"
                    variant="h1"
                    sx={{
                        fontSize: "200%",
                        marginLeft: 0,
                        color: formatColor(neutral.gray8),
                    }}>
                    <Button sx={{
                        marginTop: 3,
                        color: formatColor(neutral.black),
                        width: "18%",
                        border: "1px solid "+ formatColor(neutral.black),
                        }}>
                        Learn More
                    </Button>
                </Typography>
            </Box>
            <Box sx={{
                display:"flex",
                flexBasis: "50%",
                margin: 10,
                flex: "1 1 auto",
                background: `linear-gradient(${formatGradient(gradient.gradientPinkBlue)})`,
                }}>
            </Box>

        </Box>
    </>)
}
