import React from "react";
import { ModalType, useModalContext } from "../../libs/modal-content-provider/ModalContentProvider";
import { BaseSwitch } from "../switch";
import { BaseModal } from "./BaseModal";

export const DepositWithdrawModal = () => {
  const {type, setType} = useModalContext()

  const onSwitch = (val: boolean) => {
    console.log(val)
  }

  return (
    <BaseModal open={type === ModalType.DepositWithdraw} setOpen={() => {setType(undefined)}}>
      <BaseSwitch option1="Deposit" option2="Withdraw" onOptionChange={onSwitch}/>
    </BaseModal>
  );
};
