import { styled } from "@mui/material/styles";
import { Box, TypographyPropsVariantOverrides } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { ToolTipInfoIcon } from "../../icons/misc/ToolTipInfoIcon";
import { Variant } from "@mui/material/styles/createTypography";

const BaseToolTipContainer = styled(
  ({ className, ...props }: TooltipProps) => {
    return <Tooltip {...props} classes={{ popper: className }} />;
  }
)(({ theme }) => {
  const isLight = useLight();

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: isLight
        ? formatColor(neutral.gray5)
        : formatColor(neutral.black5),
      color: isLight ? formatColor(neutral.black5) : formatColor(neutral.white),
      borderRadius: '20px',
      padding: '12px',
    },
  };
});

export const ToolTip = (props: {
  content: TooltipProps["title"];
  text: string;
  text_variant?: "body1" | "body2" | "body2_semi";
}) => {
  const { content, text, text_variant = 'body1' } = props;
  const isLight = useLight();

  return (
    <BaseToolTipContainer title={content}>
      <Box display="flex" alignItems="center">
        <Typography variant={text_variant} color="text.secondary">
          {text}
        </Typography>
        <ToolTipInfoIcon
          sx={{ width: 18, ml: 1 }}
          strokecolor={
            isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
          }
        />
      </Box>
    </BaseToolTipContainer>
  );
};
