import { Typography} from "@mui/material"
import {Box} from "@mui/system"
import {formatColor, formatGradient, gradient, neutral} from "../../theme"
import {generateSmoothGradient} from "../../theme/gradient/easing"


export const Highlights: React.FC = ()=> {
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
                flexWrap:"wrap",
                flexBasis:"100%",
                width:"100%",
                maxWidth:1000,
                alignItems: "left",
                justifyContent:"left",
                }}>
                <Typography
                    display="inline"
                    variant="h1"
                    sx={{
                        fontSize: "200%",
                        color: formatColor(neutral.gray8),
                    }}
                >
                    Interest Protocol's stablecoin USDi
                </Typography>
                <Box sx={{flexBasis: "100%"}}/>
                <Typography
                    display="inline"
                    variant="h1"
                    sx={{
                        fontSize: "200%",
                        color: formatColor(neutral.black),
                    }}
                >
                    is scalable, over-collateralized, and accrues yield without staking.
                </Typography>
                <Box sx={{flexBasis: "100%"}}/>
            </Box>
           <Box sx={{
                display:"flex",
                flexWrap:"wrap",
                flexBasis:"100%",
                width:"100%",
                maxWidth:1000,
                }}>
               <Box sx={{flexBasis:"33%"}}>
                   <HighlightBox icon={""} header={"Stability First"} copy={"USDi maintains peg under averse condeitions, without any intervention."}/>
               </Box>
               <Box sx={{flexBasis:"33%"}}>
                <HighlightBox icon={""} header={"Community Led"} copy={"Built for you, led by you. Your participation creates the future of finance."}/>
               </Box>
               <Box sx={{flexBasis:"33%"}}>
                <HighlightBox icon={""} header={"Full Transparency"} copy={"Everything from contract to interface is FOSS, and we mean it."}/>
               </Box>
           </Box>
        </Box>
    </>)
}

const HighlightBox = (props:{icon:any, header:string, copy:string})=>{
    const {icon, header, copy} = props
    return (<Box
        sx={{
            paddingX:2,
            paddingY: 8,
            display:"flex",
            flexWrap:"wrap",
            width:"100%",
            maxWidth:1250,
            alignItems: "center",
            justifyContent:"center",
            gap: 4,
        }}>
        <Box sx={{
            background: formatColor(neutral.gray5),
            padding: 8,
            height:4,
            width:4,
            borderRadius:"50%",
            }}>
        {icon}
        </Box>
        <Box sx={{flexBasis:"100%"}}/>
        <Typography variant="h3" sx={{color: formatColor(neutral.black)}}>
            {header}
        </Typography>
        <Typography variant="body1" sx={{color: formatColor(neutral.black), fontSize: "100%"}}>
            {copy}
        </Typography>
    </Box>)
}
