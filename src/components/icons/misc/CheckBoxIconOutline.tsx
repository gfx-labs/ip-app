import { SvgIcon, SvgIconProps } from "@mui/material";
import { forwardRef } from "react";

type CheckBoxIconType = {
  color?: string;
}

const CheckBoxIconOutline = forwardRef<SVGSVGElement, SvgIconProps & CheckBoxIconType>(
  (props, ref) => {
    return (
      <SvgIcon
        {...props}
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        width="24px"
        height="24px"
        sx={{
          '&:hover': {
            backgroundColor: '748FF1',
            color: "#748FF1",
            '& path': {
              stroke: "#748FF1",
            },
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={props.color || "#B0B4C2"}
          viewBox="0 0 24 24"
        >
        <path
          d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          //fill={props.color || "#B0B4C2"}
        />
        </svg>
      </SvgIcon>
    )
  }
)

export default CheckBoxIconOutline