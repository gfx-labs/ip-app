import React, { useState } from "react";
import { SwitchProps, Box, Typography, useTheme } from "@mui/material";

import { formatColor, neutral, blue } from "../../../theme";
interface BaseSwitchProps extends SwitchProps {
  option1: string | React.ReactElement;
  option2: string | React.ReactElement;
  onOptionChange: (arg0: boolean) => void;
}

export const BaseSwitch = (props: BaseSwitchProps) => {
  const { option1, option2, onOptionChange } = props;

  const [option, setOption] = useState(option1);

  const [isOption1, setIsOption1] = useState(true);

  const theme = useTheme();

  const longerLength =
    typeof option1 === "string" && typeof option2 === "string"
      ? option1.length > option2.length
        ? option1.length
        : option2.length
      : 3.5;

  const calculateWidth = () => `${longerLength * 12}px`;

  const calculateContainerWidth = () => `${longerLength * 24 + 12}px`;

  const OptionBox = ({ option }: { option: string | React.ReactElement }) => (
    <Box
      sx={{
        width: calculateWidth(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: isLight ? formatColor(neutral.gray2) : formatColor(blue.blue1),
          display: "flex",
          alignItems: "center",
        }}
      >
        {option}
      </Typography>
    </Box>
  );

  const toggleHandler = () => {
    if (isOption1) {
      setOption(option2);
    } else {
      setOption(option1);
    }

    setIsOption1(!isOption1);

    onOptionChange(!isOption1);
  };

  let isLight = theme.palette.mode === "light";

  return (
    <Box
      sx={{
        width: calculateContainerWidth(),
        backgroundColor: isLight
          ? formatColor(neutral.gray5)
          : formatColor(neutral.gray4),
        borderRadius: 2,
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        textAlign: "center",
        position: "relative",
        height: 48,
        paddingX: "6px",
        cursor: 'pointer'
      }}
      onClick={toggleHandler}
    >
      <OptionBox option={option1} />
      <OptionBox option={option2} />

      <Box
        className={isOption1 ? "option1" : "option2"}
        sx={{
          width: calculateWidth(),
          backgroundColor: formatColor(neutral.white),
          color: formatColor(neutral.black),
          borderRadius: 2,
          height: 36,
          marginY: "6px",
          position: "absolute",
          animationName: "slide",
          animationDuration: "1s",
          transition: ".4s",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&.option2": {
            transform: "translateX(100%)",
          },
          "& path": {
            stroke: "black",
          },
        }}
      >
        <Typography
          variant="body1"
          color={formatColor(neutral.black)}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {option}
        </Typography>
      </Box>
    </Box>
  );
};
