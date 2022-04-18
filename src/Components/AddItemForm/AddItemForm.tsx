import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import styles from "../TodoList/ToDoList.module.css";


type AddItemFormPropsType = {
  callBack:(newTitle:string)=>void
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


  return (
    <div className={'inputWrapper'}>
      <input className={error ? styles.error : ''}
             value={titleInput}
             onChange={onChangeInputHandler}
             onKeyPress={onKeyPressAddTaskHandler}
      />
      <button onClick={onClickAddTaskHandler}>+</button>
      {error && <div className={styles.errorMsg}>value is empty</div>}
    </div>
  );
};

export default AddItemForm;