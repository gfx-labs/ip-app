import { Box, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { DecimalInput } from "../textFields";
import { Token } from "../../../chain/tokens";

interface TokenSelectProps {
  token: Token;
  tokenAmount: string;
  setTokenAmount: (amount: string) => void;
}

export const TokenSelect = (props: TokenSelectProps) => {
  const { token, tokenAmount, setTokenAmount } = props;
  const isLight = useLight();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: isLight
          ? formatColor(neutral.gray5)
          : formatColor(neutral.gray4),
        padding: 4,
        borderRadius: 5,
        boxShadow: "0px 4px 4px 0px rgba(0,0,0, 0.05)",
      }}
    >
      <DecimalInput onChange={setTokenAmount} value={tokenAmount} />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: " center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            component="img"
            width={24}
            height={24}
            src={`images/${token.ticker}.svg`}
          ></Box>

          <Typography
            sx={{
              color: formatColor(neutral.gray3),
              fontSize: 18,
              fontWeight: 600,
              marginLeft: 1,
            }}
          >
            {token.ticker}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: formatColor(neutral.gray3),
              textAlign: "right",
              fontWeight: 500,
              mt: 1,
            }}
          >
            Balance: {token.wallet_balance.toFixed(4)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
