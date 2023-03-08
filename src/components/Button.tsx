import React from 'react';

type BtnPropsType = {
  btnName: string
  btnOnclick: () => void
}

export const Button: React.FC<BtnPropsType> = (props) => {
  const {btnName, btnOnclick} = props

  const onClickHandler = () => {
    btnOnclick()
  }

  return (
    <>
      <button onClick={onClickHandler}>{btnName}</button>
    </>
  );
};

