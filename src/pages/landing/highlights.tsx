import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatColor, formatGradient, gradient, neutral } from "../../theme";
import { generateSmoothGradient } from "../../theme/gradient/easing";

export const Highlights: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          paddingTop: { xs: 10, md: 20 },
          paddingX: { xs: 2, md: 10 },
          paddingBottom: { xs: 2, md: 10 },
          backgroundColor: formatColor(neutral.white),
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "100%",
            width: "100%",
            maxWidth: 1000,
            alignItems: "left",
            justifyContent: "left",
            margin: "auto",
          }}
        >
          <Typography
            display={{ xs: "inline-block", md: "inline" }}
            variant="h1"
            sx={{
              fontSize: "200%",
              color: formatColor(neutral.gray8),
            }}
          >
            Interest Protocol's stablecoin USDi
          </Typography>
          <Typography
            display={{ xs: "inline-block", md: "inline" }}
            variant="h1"
            sx={{
              fontSize: "200%",
              color: formatColor(neutral.black),
            }}
          >
            is scalable, over-collateralized, and accrues yield without staking.
          </Typography>
          <Box sx={{ flexBasis: "100%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "100%",
            width: "100%",
            maxWidth: 1000,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ flexBasis: "33%" }}>
            <HighlightBox
              icon={"stability"}
              header={"Stability First"}
              copy={
                "USDi maintains peg under averse condeitions, without any intervention."
              }
            />
          </Box>
          <Box sx={{ flexBasis: "33%" }}>
            <HighlightBox
              icon={"community"}
              header={"Community Led"}
              copy={
                "Built for you, led by you. Your participation creates the future of finance."
              }
            />
          </Box>
          <Box sx={{ flexBasis: "33%" }}>
            <HighlightBox
              icon={"transparency"}
              header={"Full Transparency"}
              copy={
                "Everything from contract to interface is FOSS, and we mean it."
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const HighlightBox = (props: { icon: any; header: string; copy: string }) => {
  const { icon, header, copy } = props;
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 8,
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: 1250,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        sx={{
          background: formatColor(neutral.gray5),

          height: 140,
          width: 140,
          borderRadius: "50%",
        }}
        component="img"
        src={`/images/${icon}.svg`}
      ></Box>

      <Typography variant="h3" sx={{ color: formatColor(neutral.black) }}>
        {header}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: formatColor(neutral.black),
          fontSize: "100%",
          textAlign: { xs: "center", md: "left" },
          paddingX: { xs: 5 },
        }}
      >
        {copy}
      </Typography>
    </Box>
  );
};
