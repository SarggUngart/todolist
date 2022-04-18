import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilteredValueType} from "../../App";
import styles from "./ToDoList.module.css"
import {CheckBox} from "../CheckBox/CheckBox";


export type TasksType = {
  id: string,
  title: string,
  isDone: boolean
}

type ToDoListPropsType = {
  todolistId: string
  title: string
  tasks: TasksType[]
  removeTask: (todolistId: string, id: string) => void
  filteredTasks: (todolistId: string, value: FilteredValueType) => void
  addTask: (todolistId: string, title: string) => void
  changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  filter: FilteredValueType
  removeTodoList: (todolistId: string) => void
}

export const ToDoList: FC<ToDoListPropsType> = ({
                                                  todolistId,
                                                  title,
                                                  tasks,
                                                  removeTask,
                                                  filteredTasks,
                                                  addTask,
                                                  changeStatus,
                                                  filter,
                                                  removeTodoList
                                                }) => {

  const [titleInput, setTitleInput] = useState('')
  const [error, setError] = useState(false)

  // const onClickFilterHandler = (todolistId: string, value: FilteredValueType) => {
  //
  // }

  const addNewTask = () => {
    let trimmedInputTitle = titleInput.trim()
    if (trimmedInputTitle !== '') {
      addTask(todolistId, trimmedInputTitle.trim())
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

  const onChangeCheckBoxHandler = (todolistId: string, taskId: string, isDone: boolean) => {
    changeStatus(todolistId, taskId, isDone)
  }


  return (
    <div>
      <div className={'todolistHeader'}>
        <h3 className={'title'}>{title}</h3>
        <button onClick={() => removeTodoList(todolistId)}>x</button>
      </div>
      <div className={'inputWrapper'}>
        <input className={error ? styles.error : ''}
               value={titleInput}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressAddTaskHandler}
        />
        <button onClick={onClickAddTaskHandler}>+</button>
        {error && <div className={styles.errorMsg}>value is empty</div>}
      </div>

      <ul>
        {tasks.map((el) => {

            return (
              <li key={el.id}>
                <CheckBox isDone={el.isDone} callBack={(isDone) => onChangeCheckBoxHandler(todolistId, el.id, isDone)}/>

                {/*<input*/}
                {/*onChange={(e) => onChangeCheckBoxHandler(el.id, e.currentTarget.checked)}*/}
                {/*type="checkbox"*/}
                {/*checked={el.isDone}/>*/}

                <span
                  className={el.isDone ? styles.doneTask : ''}
                >{el.title}</span>
                <button className={'removeBtn'} onClick={() => removeTask(todolistId, el.id)}>x</button>
              </li>
            )
          }
        )}
      </ul>

      <div>
        <button className={filter === 'All' ? styles.btnActive : ''}
                onClick={() => filteredTasks(todolistId, 'All')}>All
        </button>
        <button className={filter === 'Active' ? styles.btnActive : ''}
                onClick={() => filteredTasks(todolistId, 'Active')}>Active
        </button>
        <button className={filter === 'Completed' ? styles.btnActive : ''}
                onClick={() => filteredTasks(todolistId, 'Completed')}>Completed
        </button>
      </div>
    </div>

  );
};
