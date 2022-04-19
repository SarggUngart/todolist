import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";


export type EditableSpanPropType = {
  callBack: (newTitle:string) => void
  title: string
}


const EditableTitle: FC<EditableSpanPropType> = ({title, callBack}) => {

  let [edit, setEdit] = useState(false)
  let [newTitle, setNewTitle] = useState(title)

  const onDoubleClickHandler = () => {
    setEdit(true)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const onBlurHandler = () => {
    setEdit(false)
    callBack(newTitle)
  }


  return (
    edit


      ? <TextField
        value={newTitle}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        autoFocus
        variant="standard" />

      : <span
        onDoubleClick={onDoubleClickHandler}>
        {title}</span>

  );
};

export default EditableTitle;