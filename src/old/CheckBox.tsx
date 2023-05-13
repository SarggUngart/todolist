import React from 'react';
import {Checkbox} from "@mui/material";

type CheckBoxPropsType = {
  checked: boolean
  callBack: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const CheckBox: React.FC<CheckBoxPropsType> = React.memo((props) => {
    const {checked, callBack} = props
    console.log('Checkbox сomp')
    return (
      <Checkbox
        edge={'start'}
        checked={checked}
        size={"small"}
        onChange={(event) => callBack(event)}
      />
    );
  }
)

export default CheckBox;