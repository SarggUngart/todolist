import React from 'react';

type EditableTitlePropsType = {
  title: string
  titleClass?: string
  callBack: (newTitle: string) => void
}


const EditableTitle: React.FC<EditableTitlePropsType> = (props) => {
  const {title, titleClass, callBack} = props

  const [isEdit, setIsEdit] = React.useState<boolean>(false)
  const [newTitle, setNewTitle] = React.useState<string>(title)

  const OnChangeEditTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    callBack(newTitle)
  }

  const onBlurTitleHandler = () => {
    setIsEdit(!isEdit)
    callBack(newTitle)
  }

  const onKeyPressTitleHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEdit(false)
      callBack(newTitle)
    }
  }

  return (
    isEdit
      ?
      <input
        value={newTitle}
        autoFocus
        onChange={OnChangeEditTitleHandler}
        onBlur={onBlurTitleHandler}
        onKeyPress={onKeyPressTitleHandler}
      />
      :
      <span
        onDoubleClick={() => setIsEdit(!isEdit)}
        className={titleClass}
      >{title}
      </span>
  );
};

export default EditableTitle;