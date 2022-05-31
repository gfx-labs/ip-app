import {AppBar, Button, Icon, Link, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material"
import {Box} from "@mui/system"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router"
import {keyframes} from "@emotion/react"
import Cookies from "universal-cookie"
import {ForwardIcon} from "../../components/icons/misc/ForwardIcon"
import {formatColor, neutral, blue} from "../../theme"
import {Terms} from "./terms"

const PurchasePage: React.FC = () => {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const onScroll = (e:any) => {
            setScrollTop(e.target.documentElement.scrollTop);
            console.log(scrollTop, document.body.scrollHeight - window.innerHeight)
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    return (<>
        <Box
            sx={{
                marginX: "auto",
                position: "relative",
                height: "100%",
                width: "100%",
                overflow: "hidden",
            }}>
            <Terms/>
            <PurchaseBox/>
        </Box>
    </>)
}

const PurchaseBox:React.FC=()=> {
    return <Box>
        <Button>
            you need to agree to the terms to click dis button
        </Button>
    </Box>
}



export default PurchasePage
