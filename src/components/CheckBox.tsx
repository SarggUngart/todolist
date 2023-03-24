import React from 'react';

type CheckBoxPropsType = {
  checked:boolean
  callBack:(event: React.ChangeEvent<HTMLInputElement>) => void
}


const CheckBox: React.FC<CheckBoxPropsType> = (props) => {

  const {checked, callBack} = props

  const onChangeCheckBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    callBack(event)
  }

  return (
    <input
      type={"checkbox"}
      onChange={onChangeCheckBoxHandler}
      checked={checked}>
    </input>
  );
};

export default CheckBox;