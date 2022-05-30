import {AppBar, Button, Icon, Link, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material"
import {Box} from "@mui/system"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router"
import {keyframes} from "@emotion/react"
import Cookies from "universal-cookie"
import {ForwardIcon} from "../../components/icons/misc/ForwardIcon"
import {formatColor, neutral, blue} from "../../theme"
import {Cards} from "./cards"
import {Community} from "./community"
import {Fractional} from "./fractional"
import {Highlights} from "./highlights"
import {Splash} from "./splash"
import {Values} from "./values"

const TopBar: React.FC<{sx?: any}> = (props?:{sx?:any})=> {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    let isLight = theme.palette.mode === "light";
    const cookies = new Cookies()
    let nav = useNavigate()
    const toApp = () => {
        cookies.set("first-visit","not")
        nav("/", {replace:true})
    }
    return  (<AppBar
        position="fixed"
        elevation={0}
        sx={{
            backgroundColor: formatColor(neutral.white),
            paddingTop: { xs: 1, md: 5 },
        paddingX: isMobile ? 1 : 2,
        width:"100%",
        margin: "auto",
        paddingBottom: 5,
        left: 0,
        right: 0,
        ...props?.sx,
        }}
    >
        <Toolbar sx={{}}>
            <Box component="img" src="images/usdi.svg" width={80} height={80}></Box>
            <Box sx={{gap: 10}} display="flex" ml={10}>
                <Typography
                    sx={{
                        color: formatColor(neutral.gray2),
                        display: "flex",
                        zIndex: 10,
                        fontSize: "150%",
                        alignItems: "center",
                    }}>
                    <Link href="#/whitepaper" sx={{color:"inherit"}}>
                        Whitepaper
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        color: formatColor(neutral.gray2),
                        display: "flex",
                        fontSize: "150%",
                        alignItems: "center",
                    }}>
                    <Link href="#/docs" sx={{color:"inherit"}}>
                        Docs
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        color:formatColor(neutral.gray2),
                        display: "flex",
                        fontSize: "150%",
                        alignItems: "center",
                    }}>
                    <Link href="#/docs" sx={{color:"inherit"}}>
                        Git
                    </Link>
                </Typography>
            </Box>

            <Box sx={{gap: 2}} display="flex" mr={0} ml="auto">
                <Button
                    onClick={toApp}
                    variant="cta"
                    sx={{
                        color:  formatColor(blue.blue9) ,
                        backgroundColor:  formatColor(blue.blue1) ,
                        padding: 4,
                        paddingLeft: 6,
                        paddingRight: 6,
                        "&:hover": {
                            backgroundColor: formatColor(blue.blue10),
                            backgroundImage: "none",
                    },
                    }}>
                    App ➝
                </Button>
            </Box>
        </Toolbar>

    </AppBar>)
}



const LandingPage: React.FC = () => {
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
                overflow: "hidden",
            }}
        >
            <TopBar sx={{
                transition: 'top 0.6s',
                top: (scrollTop < 30 || (scrollTop > document.documentElement.scrollHeight - window.innerHeight - 30)) ? '0' : -160,
                }}/>

            <Splash/>
            <Cards/>
            <Fractional/>
            <Highlights/>
            <Values/>
            <Community/>
        </Box>
    </>)
}



export default LandingPage
