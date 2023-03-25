import React from 'react';
import {Button} from "./Button";

type InputPropsType = {
  addNewTask: (inputTitle: string) => void
}

export const Input: React.FC<InputPropsType> = (props) => {

  const [error, setError] = React.useState(false)

  const {addNewTask} = props

  const [inputTitle, setInputTitle] = React.useState('')

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
    <div>
      <input className={errorClass}
             value={inputTitle}
             onChange={onChangeInputHandler}
             onKeyPress={onKeyPressInputHandler}
      />
      {errorClass && <div className={'errorMessage'}>title is required</div>}
      <Button
        style={false}
        btnName={'+'}
        onClickBtn={onClickBtnHandler}/>
    </div>
  );
};
