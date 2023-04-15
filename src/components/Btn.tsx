import React from 'react';
import {Button} from "@mui/material";


type BtnPropsType = {

  btnName?: string
  onClickBtn: () => void
  btnClass?: string
  variant?: "text" | "outlined" | "contained"
}


export const Btn: React.FC<BtnPropsType> = (props) => {
  const {btnName, onClickBtn, btnClass, variant, } = props

  return (
    <Button
      disableElevation
      className={btnClass}
      size={"small"}
      variant={variant}
      onClick={onClickBtn}
    >{btnName}</Button>
  );
};

