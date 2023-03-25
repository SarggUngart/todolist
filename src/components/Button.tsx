import React from 'react';
import {FilterType} from "../App";

type BtnPropsType = {
  btnName: string
  onClickBtn: () => void
  style: FilterType | boolean
}

export const Button: React.FC<BtnPropsType> = (props) => {
  const {btnName, onClickBtn,style } = props

  const activeBtn = style ? 'activeBtn' : ''

  return (
    <>
      <button
        className={activeBtn}
        onClick={onClickBtn}>{btnName}</button>
    </>
  );
};

