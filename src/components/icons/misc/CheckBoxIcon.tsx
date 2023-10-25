import { SvgIcon, SvgIconProps } from "@mui/material";
import { forwardRef } from "react";

type CheckBoxIconType = {
  color?: string;
}

const CheckBoxIcon = forwardRef<SVGSVGElement, SvgIconProps & CheckBoxIconType>(
  (props, ref) => {
    return (
      <SvgIcon
        {...props}
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        width="24px"
        height="24px"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill={props.color || "#748FF1"}
          d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </SvgIcon>
    )
  }
)

export default CheckBoxIcon