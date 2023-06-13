import React from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';

export type InputPropsType = {
  addNewItem: (inputTitle: string) => void
}

export const InputBtn: React.FC<InputPropsType> = React.memo((props) => {
  const {addNewItem} = props

  const [inputTitle, setInputTitle] = React.useState('')
  const [error, setError] = React.useState(false)
  const inputRef = React.useRef<HTMLDivElement>(null);

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

  const onClickClear = () => {
    if (inputRef.current) {
      setInputTitle('')
      inputRef.current.focus()
    }
  }

  const showError = error ? 'title is required' : '';
  const showLabel = error ? '' : 'enter a title'

  return (
    <div className={'inputWrapper'}>
      {inputTitle &&
        <ClearIcon sx={{transition: 'opacity 0.1s linear'}}
          fontSize={'small'}
          color={'secondary'}
          className={'clearInputIcon'}
          onClick={onClickClear}/>
      }

      <TextField
        sx={{width:'230px'}}
        inputRef={inputRef}
        autoFocus
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
