import React from 'react';
import {IconButton, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

type InputPropsType = {
  addNewItem: (inputTitle: string) => void
}

export const InputBtn: React.FC<InputPropsType> = React.memo((props) => {
  const {addNewItem} = props

  const [inputTitle, setInputTitle] = React.useState('')
  const [error, setError] = React.useState(false)



  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setInputTitle(event.currentTarget.value)
  }

  const addTask = () => {
    const trimmedTitle = inputTitle.trim()
    if (!trimmedTitle) {
      setError(true)
      return
    }
    addNewItem(trimmedTitle)
    setInputTitle('')
  }

  const onClickBtnHandler = () => {
    addTask()
  }

  const onKeyPressInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask()
    }
  }

  const showError = error ? 'title is required' : '';
  const showLabel = error ? '' : 'enter a title'

  return (
    <div className={'inputWrapper'}>

      <TextField
        variant={'outlined'}
        label={showLabel || showError}
        value={inputTitle}
        onChange={onChangeInputHandler}
        onKeyDown={onKeyPressInputHandler}
        onBlur={() => setError(false)}
        error={error}
        size={'small'}
      />


      <IconButton
        size={'small'}
        onClick={onClickBtnHandler}>
        <AddCircleIcon color={'secondary'}/>
      </IconButton>
    </div>
  );
})
