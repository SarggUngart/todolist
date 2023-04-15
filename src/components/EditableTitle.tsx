import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import {IconButton, TextField} from "@mui/material";


type EditableTitlePropsType = {
  title: string
  titleClass?: string
  callBack: (newTitle: string) => void
}


export const EditableTitle: React.FC<EditableTitlePropsType> = (props) => {
  const {title, titleClass, callBack} = props

  const [isEdit, setIsEdit] = React.useState<boolean>(false)
  const [newTitle, setNewTitle] = React.useState<string>(title)
  const [error, setError] = React.useState<boolean>(false)


  const OnChangeEditTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setNewTitle(e.currentTarget.value)
  }

  const onKeyPressTitleHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeToNewTitle()
    }
  }

  const onBlurHandler = () => {
    changeToNewTitle()
  }

  const changeToNewTitle = () => {
    const trimmedTitle = newTitle.trim()
    if (!trimmedTitle || trimmedTitle.length === 0 || trimmedTitle === '') {
      setError(true)
      return
    } else {
      setIsEdit(!isEdit)
      callBack(newTitle)
    }
  }

  return (
    <>
      {
        isEdit
          ?
          <>
            <TextField
              value={newTitle}
              onChange={OnChangeEditTitleHandler}
              onKeyDown={onKeyPressTitleHandler}
              onBlur={onBlurHandler}
              autoFocus
              variant="standard"
              error={error}
              size={'small'}
            />

            <IconButton
              sx={{marginLeft: 'auto'}}
              size={'small'}
              onClick={changeToNewTitle}>
              <DoneIcon
                color={'primary'}/>
            </IconButton>
            {/*{isError && 'title is required'}*/}
          </>
          :
          <>
            <span
              onDoubleClick={() => setIsEdit(!isEdit)}
              className={titleClass}
            >{title}
               </span>

            <IconButton
              sx={{marginLeft: 'auto'}}
              size={'small'}
              onClick={() => setIsEdit(true)}>
              <EditIcon color={'primary'}/>
            </IconButton>

          </>
      }
    </>
  )
};
