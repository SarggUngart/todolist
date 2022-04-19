import React, {ChangeEvent, FC, useState} from 'react';


export type EditableSpanPropType = {
  callBack: (newTitle:string) => void
  title: string
}


const EditableSpan: FC<EditableSpanPropType> = ({title, callBack}) => {

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
      ? <input
        value={newTitle}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        autoFocus
      />
      : <span
        onDoubleClick={onDoubleClickHandler}>
        {title}</span>

  );
};

export default EditableSpan;