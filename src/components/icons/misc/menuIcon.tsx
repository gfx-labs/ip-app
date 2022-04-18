import { SvgIcon, SvgIconProps } from "@mui/material";
import { forwardRef } from "react";
import React from "react";

export const MenuIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  (props, ref) => {
    return (
      <SvgIcon {...props} ref={ref}>
        <path
          d="M4 8.00024H20M4 16.0002H20"
          stroke="#AFAFAF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgIcon>
    );
  }
);
