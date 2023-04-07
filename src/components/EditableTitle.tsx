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
  const [error, setError] = React.useState<boolean>(false)


  const OnChangeEditTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setNewTitle(e.currentTarget.value)
  }

  const onBlurTitleHandler = () => {
    changeToNewTitle()
  }

  const onKeyPressTitleHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeToNewTitle()
    }
  }

  const changeToNewTitle = () => {
    const trimmedTitle = newTitle.trim()
    if (!trimmedTitle) {
      setError(true)
      return
    } else {
      setIsEdit(!isEdit)
      callBack(newTitle)
    }
  }
  const isError = error ? 'error' : '';

  return (
    <>
      {
        isEdit
          ?
          <>
            <input
              className={isError}
              value={newTitle}
              autoFocus
              onChange={OnChangeEditTitleHandler}
              onBlur={onBlurTitleHandler}
              onKeyDown={onKeyPressTitleHandler}
            />
            {isError && <div className={'errorMessageTask'}>title is required</div>}
          </>
          :
          <span
            onDoubleClick={() => setIsEdit(!isEdit)}
            className={titleClass}
          >{title}
      </span>
      }
    </>
  );
};

export default EditableTitle;