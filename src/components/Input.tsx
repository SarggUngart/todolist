import React from 'react';
import {Button} from "./Button";

type InputPropsType = {
  addNewTask: (inputTitle: string) => void
}

export const Input: React.FC<InputPropsType> = (props) => {

  const {addNewTask} = props

  const [inputTitle, setInputTitle] = React.useState('')

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.currentTarget.value)
  }

  const addTask = () => {
    let trimmedTask = inputTitle.trim()
    if (!trimmedTask) return
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

  return (
    <div>
      <input value={inputTitle}
             onChange={onChangeInputHandler}
             onKeyPress={onKeyPressInputHandler}
      />
      <Button btnName={'+'} onClickBtn={onClickBtnHandler}/>
    </div>
  );
};
