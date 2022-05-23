import { SvgIcon, SvgIconProps } from "@mui/material";
import { forwardRef } from "react";
import React from "react";

export const CaratUpIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        {...props}
        width="8"
        height="6"
        ref={ref}
        viewBox="0 0 8 6"
        fill="none"
      >
        <path
          d="M1.08354 4.66663L4.0002 1.74996L6.91687 4.66663"
          stroke="#374252"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgIcon>
    );
  }
);
