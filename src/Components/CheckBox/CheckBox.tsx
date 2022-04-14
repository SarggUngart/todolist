import React, {ChangeEvent, FC} from 'react';

type CheckBoxPropsType = {
  isDone: boolean
  callBack: (isDone: boolean) => void
}


export const CheckBox:FC<CheckBoxPropsType> = ({isDone, callBack}) => {

  const onChangeCheckBoxHandler = ( e:ChangeEvent<HTMLInputElement> ) => {
    callBack(e.currentTarget.checked)
  }


  return (
    <input
      onChange={ onChangeCheckBoxHandler}
      type="checkbox"
      checked={isDone}/>
  );
};
