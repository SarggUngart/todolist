import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
  callBack: (newTitle: string) => void
}


export const AddItemForm: FC<AddItemFormPropsType> = ({callBack}) => {

  const [titleInput, setTitleInput] = useState('')
  const [error, setError] = useState(false)

  const addNewTask = () => {
    let trimmedInputTitle = titleInput.trim()
    if (trimmedInputTitle !== '') {
      callBack(trimmedInputTitle)
      setTitleInput('')
      setError(false)
    } else {
      setError(true)
    }
  }

  const onClickAddTaskHandler = () => {
    addNewTask()
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.currentTarget.value)
  }

  const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      addNewTask()
    }
  }

  const onClickInputHandler = () => {
    setError(false)
  }

  return (
    <div className={'inputWrapper'}>
      <TextField
        label={error ? 'Title is required' : 'Enter title'}
                 className={error ? 'styles.error' : ''}
                 value={titleInput}
                 onChange={onChangeInputHandler}
                 onKeyPress={onKeyPressAddTaskHandler}
                 variant='outlined'
                 size={'small'}
                 error={error}
                 onClick={onClickInputHandler}
      />
      <Button
        style={{minWidth: '30px', backgroundColor: 'darkgray'}}
        variant="contained"
        onClick={onClickAddTaskHandler}
      >+</Button>

      </div>
  );
};

export default AddItemForm;