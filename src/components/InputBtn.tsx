import React from 'react';
import {Button} from "./Button";

type InputPropsType = {
  addNewTask: (inputTitle: string) => void
}

export const InputBtn: React.FC<InputPropsType> = (props) => {
  const {addNewTask} = props


  const [inputTitle, setInputTitle] = React.useState('')
  const [error, setError] = React.useState(false)

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setInputTitle(event.currentTarget.value)
  }

  const addTask = () => {
    const trimmedTask = inputTitle.trim()
    if (!trimmedTask) {
      setError(true)
      return
    }
    addNewTask(inputTitle)
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

  const errorClass = error ? 'error' : '';

  return (
    <div className={'inputWrapper'}>
      <input className={errorClass}
             value={inputTitle}
             onChange={onChangeInputHandler}
             onKeyDown={onKeyPressInputHandler}
             onBlur={() => setError(false)}
             autoFocus
      />
      {errorClass && <div className={'errorMessageTitle'}>title is required</div>}
      <Button
        btnName={'+'}
        onClickBtn={onClickBtnHandler}/>
    </div>
  );
};
