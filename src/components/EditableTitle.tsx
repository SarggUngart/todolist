import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {RequestStatusType} from "../redusers/app-reduser";


type EditableTitlePropsType = {
  title: string
  titleClass?: string
  entityStatus?:RequestStatusType
  callBack: (newTitle: string) => void
}

export const EditableTitle: React.FC<EditableTitlePropsType> = React.memo((props) => {
  const {title, titleClass, callBack, entityStatus} = props
  const [isEdit, setIsEdit] = React.useState<boolean>(false)
  const [newTitle, setNewTitle] = React.useState<string>(title)
  const [error, setError] = React.useState<boolean>(false)


  const inputRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if (!newTitle.length) {
          setIsEdit(false)
          setNewTitle(title)
        } else {
          setIsEdit(false)
          setNewTitle(newTitle)
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [title, newTitle]);


  const onClickEditTitleHandler = () => {
    setIsEdit(true)
    setError(false)
  }

  const OnChangeEditTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setNewTitle(e.currentTarget.value)
  }

  const onKeyPressTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (newTitle && e.key === 'Enter') {
      setToNewTitle()
    }
    if (!newTitle.length && e.key === 'Enter') {
      setError(true)
    }
  }

  const setToNewTitle = () => {
    const trimmedTitle = newTitle.trim()
    if (!trimmedTitle) {
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
          <div className={'titleWrapper'} ref={inputRef}>

            <TextField
              sx={{width: '175px'}}
              value={newTitle}
              onChange={OnChangeEditTitleHandler}
              onKeyDown={onKeyPressTitleHandler}
              variant="standard"
              size={'small'}
              error={error}
              autoFocus
            />

            <IconButton
              disabled={entityStatus === 'loading'}
              color={'primary'}
              sx={{marginLeft: 'auto'}}
              size={'small'}
              onClick={setToNewTitle}>
              <DoneIcon />
            </IconButton>
          </div>

          :
          <>
            <span
              onDoubleClick={onClickEditTitleHandler}
              className={titleClass}
            >{newTitle}
               </span>
            <IconButton
              disabled={entityStatus === 'loading'}
              sx={{marginLeft: 'auto'}}
              color={'primary'}
              size={'small'}
              onClick={onClickEditTitleHandler}>
              <EditIcon/>
            </IconButton>
          </>
      }
    </>
  )
})
