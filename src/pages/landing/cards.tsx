import { Typography} from "@mui/material"
import {Box} from "@mui/system"
import {formatColor, formatGradient, gradient, neutral} from "../../theme"
import {generateSmoothGradient} from "../../theme/gradient/easing"


export const Cards: React.FC = ()=> {
    return(<>
        <Box
            sx={{
                maxWidth: "100%",
                paddingTop: 10,
                paddingLeft: 10,
                paddingBottom: 10,
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
                alignItems: "left",
                justifyContent:"left",
                }}>
                <Typography
                    display="inline"
                    variant="h1"
                    sx={{
                        fontSize: "200%",
                        color: formatColor(neutral.black),
                    }}
                >
                    Lend, borrow, earn yield.
                </Typography>
                <Typography
                    display="inline"
                    variant="h1"
                    sx={{
                        fontSize: "200%",
                        marginLeft: 2,
                        color: formatColor(neutral.gray8),
                    }}
                >
                    Save Simply.
                </Typography>
            </Box>
            <Box
                sx={{
                    flexBasis: "100%",
                }}
            />
            <GradientBox
                bg={ `linear-gradient(${formatGradient(gradient.gradientPinkBlue)})`}
                left="Scalable" right="Build to be the leading lending market"/>
            <GradientBox
                bg={ `linear-gradient(${formatGradient(gradient.gradientPinkBlue2)})`}
                left="Stable" right="Thrives in volatile markets"/>
            <GradientBox
                bg={ `linear-gradient(${formatGradient(gradient.gradientPinkBlue)})`}
                left="Gas Efficient" right="No claiming neccesary"/>
        </Box>
    </>)
}

const GradientBox = (props:{left:string, right:string, bg:string})=>{
    const {left, right, bg} = props
    return (<Box
        sx={{
            paddingX:2,
            paddingY: 8,
            flexBasis: "100%",
            display:"flex",
            width:"100%",
            maxWidth:1250,
            background:bg,
            borderRadius: 5,
        }}>
        <Box >
            <Typography variant="h1" sx={{color: formatColor(neutral.white), fontSize: "200%"}}>
                {left}
            </Typography>
        </Box>
        <Box ml="auto" mr={5}>
            <Typography  sx={{color: formatColor(neutral.white), fontSize: "100%"}}>
                {right}
            </Typography>
        </Box>
    </Box>)
}
