import React from 'react';

type CheckBoxPropsType = {
  checked: boolean
  callBack: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const CheckBox: React.FC<CheckBoxPropsType> = (props) => {

  const {checked, callBack} = props

  return (
    <input
      type={"checkbox"}
      onChange={(event) => callBack(event)}
      checked={checked}>
    </input>
  );
};

export default CheckBox;