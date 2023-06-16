import React from 'react';
import Checkbox from "@mui/material/Checkbox";
import {TaskStatuses} from "../api/todolist-api";

type CheckBoxPropsType = {
  checked: TaskStatuses | Boolean
  callBack: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

const CheckBox: React.FC<CheckBoxPropsType> = React.memo((props) => {
    const {checked, callBack,disabled} = props

    return (
      <Checkbox
        disabled={disabled}
        edge={'start'}
        checked={checked === TaskStatuses.Complited}
        size={"small"}
        onChange={(event) => callBack(event)}
      />
    );
  }
)

export default CheckBox;