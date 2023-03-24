import React from 'react';

type BtnPropsType = {
  btnName: string
  onClickBtn: () => void
}

export const Button: React.FC<BtnPropsType> = (props) => {
  const {btnName, onClickBtn} = props

  const onClickHandler = () => {
    onClickBtn()
  }


  return (
    <>
      <button
        onClick={onClickHandler}>{btnName}</button>
    </>
  );
};

