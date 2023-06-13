import React from 'react';
import Button from "@mui/material/Button";


type BtnPropsType = {
  btnName?: string
  onClickBtn: () => void
  variant?: "text" | "outlined" | "contained"
}


export const Btn: React.FC<BtnPropsType> = React.memo((props) => {
  const {btnName, onClickBtn, variant} = props

  return (
    <Button
      disableElevation
      size={"small"}
      variant={variant}
      onClick={onClickBtn}
    >{btnName}</Button>
  );
})

