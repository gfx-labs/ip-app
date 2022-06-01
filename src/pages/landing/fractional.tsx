import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ForwardIcon } from "../../components/icons/misc/ForwardIcon";
import { formatColor, formatGradient, gradient, neutral } from "../../theme";
import { generateSmoothGradient } from "../../theme/gradient/easing";

export const Fractional: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: formatColor(neutral.gray11), paddingTop: {xs: 8, md: 10} }} >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
          height: "100%",
          alignItems: "center",
          gap: 5,
          maxWidth: 1250,
          margin: "auto",
        }}
      >
        <Box
          sx={{
            paddingTop: { xs: 0, md: 5 },
            paddingX: { xs: 2, md: 10 },
            paddingBottom: { xs: 5, md: 5 },
            flexWrap: "wrap",
            flexBasis: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              display="inline"
              variant="h1"
              flexBasis="100%"
              fontSize="200%"
              sx={{
                color: formatColor(neutral.black),
                lineHeight: 1.3,
              }}
            >
              Interest Protocol applies fractional reserve banking to
              decentralized finance
            </Typography>
            <Typography
              display="inline"
              variant="h1"
              sx={{
                fontSize: "200%",
                marginLeft: 0,
                color: formatColor(neutral.gray8),
              }}
            >
              <Button
                sx={{
                  marginTop: 3,
                  color: formatColor(neutral.black),
                  width: "auto",
                  border: "1px solid " + formatColor(neutral.black),
                  paddingX: 3,
                  whiteSpace: "nowrap",
                }}
                href={"#/docs"}
              >
                Learn More <ForwardIcon sx={{ width: 12, ml: 1, top: 1, position: 'relative' }} />
              </Button>
            </Typography>
          </Box>
        </Box>
        <Box paddingX={{ xs: 2, md: 4 }} textAlign="center">
          <Box
            sx={{
              flexBasis: "50%",
              flex: "1 1 auto",
              objectFit: "contain",
              width: "100%",
              maxHeight: 575,
              textAlign: "center",
            }}
            component="img"
            src="images/landing_tokens.png"
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
