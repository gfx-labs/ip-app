import { Button, ButtonProps } from "@mui/material";

interface BaseButtonProps extends ButtonProps {}

export const BaseButton = (props: BaseButtonProps) => {
  const { children } = props;
  return <Button>{children}</Button>;
};
