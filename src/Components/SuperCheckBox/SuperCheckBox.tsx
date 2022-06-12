import React, {ChangeEvent, FC} from 'react';
import {Checkbox} from "@mui/material";

type CheckBoxPropsType = {
  isDone: boolean
  callBack: (isDone: boolean) => void
}


export const SuperCheckBox: FC<CheckBoxPropsType> = ({isDone, callBack}) => {

  const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
  }

  return <Checkbox onChange={onChangeCheckBoxHandler} checked={isDone} size={'small'}/>

}
