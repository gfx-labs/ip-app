import { Box, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { Link } from '../../util/link'
import { useLight } from '../../../hooks/useLight'

const footerLinks = [
  {
    title: 'Protocol',
    links: [
      { label: 'Whitepaper', href: '/whitepaper' },
      { label: 'Docs & Guides', href: '/docs' },
      { label: 'Whitelist', href: '/whitelist' },
      { label: 'Sale', href: '/sale' },
      {
        label: 'Audit',
        href: 'https://github.com/gfx-labs/ip-contracts/blob/master/audit/GFX_IP_Protocol_Audit_Report.pdf',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Developer', href: 'https://github.com/gfx-labs/ip-contracts' },
      { label: 'Contact', href: 'https://discord.gg/s9Wja2tb6k' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
]

export const Footer = () => {
  return (
    <Box
      paddingTop={{ xs: 13, sm: 5 }}
      paddingBottom={{ xs: 7, sm: 3 }}
      px={{ xs: 4, md: 4 }}
      sx={{
        backgroundColor: 'footer.background',
      }}
    >
      <FooterContent />
    </Box>
  )
}

const FooterContent = () => {
  const isLight = useLight()
  const theme = useTheme()
  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        maxWidth: 1300,
        margin: 'auto',
        backgroundColor: 'footer.background',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-evenly', md: 'space-evenly' },
          maxWidth: 900,
          margin: 'auto',
          [theme.breakpoints.down('md')]: {
            marginBottom: 12,
          },
        }}
      >
        {footerLinks.map((navItem, index) => {
          return (
            <Box key={index}>
              <Typography variant="body3" fontWeight={700}>
                {navItem.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  marginTop: 2,
                }}
              >
                {navItem.links.map((link) => {
                  return (
                    <MuiLink
                      target="_blank"
                      key={link.label}
                      href={link.href}
                      variant="body3"
                      color="footer.color"
                      paddingBottom={1}
                      sx={{
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  )
                })}
              </Box>
            </Box>
          )
        })}
      </Box>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
            rowGap: 2,
            alignItems: 'center',
          },
        }}
      >
        <Typography color="footer.color" variant="label2">
          Interest Protocol 2022
        </Typography>
        <Box>
          <MuiLink
            component={Link}
            to="https://discord.gg/s9Wja2tb6k"
            target="_blank"
            paddingBottom={2}
          >
            <Box
              component="img"
              src={`images/discord_icon_${isLight ? 'black' : 'grey'}.svg`}
              width="24px"
              height="24px"
              marginX={3}
            ></Box>
          </MuiLink>
          <MuiLink
            component={Link}
            to="https://twitter.com/InterestDeFi"
            target="_blank"
            paddingBottom={2}
          >
            <Box
              component="img"
              src={`images/twitter_bird_icon_${isLight ? 'black' : 'grey'}.svg`}
              width="25px"
              height="26px"
              marginX={3}
            ></Box>
          </MuiLink>
          <MuiLink
            component={Link}
            to="https://medium.com/interest-protocol"
            target="_blank"
            paddingBottom={2}
          >
            <Box
              component="img"
              src={`images/medium_icon_${isLight ? 'black' : 'grey'}.svg`}
              width="24px"
              height="24px"
              marginX={3}
            ></Box>
          </MuiLink>
        </Box>
      </Box>
    </Box>
  )
}
