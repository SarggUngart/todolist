import React from 'react';

type BtnPropsType = {
  btnName: string
  onClickBtn: () => void
  btnClass?: string
}

export const Button: React.FC<BtnPropsType> = (props) => {
  const {btnName, onClickBtn, btnClass} = props

  return (
    <button
      className={btnClass}
      onClick={onClickBtn}>{btnName}</button>
  );
};

