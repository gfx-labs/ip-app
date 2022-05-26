import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useLight } from "../../../hooks/useLight";
import { formatColor, neutral } from "../../../theme";
import { ToolTipInfoIcon } from "../../icons/misc/ToolTipInfoIcon";

const GovernanceToolTipContainer = styled(
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
      padding: '32px',
    },
  };
});

export const GovernanceToolTip = (props: {
  title: TooltipProps["title"];
  text: string;
}) => {
  const { title, text } = props;
  const isLight = useLight();

  return (
    <GovernanceToolTipContainer title={title}>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" color="text.secondary" fontWeight={600}>
          {text}
        </Typography>
        <ToolTipInfoIcon
          sx={{ width: 18, ml: 1 }}
          strokecolor={
            isLight ? formatColor(neutral.gray1) : formatColor(neutral.white)
          }
        />
      </Box>
    </GovernanceToolTipContainer>
  );
};
