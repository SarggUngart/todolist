import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilteredValueType} from "../App";


export type TasksType = {
  id: string,
  title: string,
  isDone: boolean
}


type ToDoListPropsType = {
  title: string
  tasks: TasksType[]
  removeTask: (id: string) => void
  filteredTasks: (value: FilteredValueType) => void
  addTask: (title: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
}

export const ToDoList: FC<ToDoListPropsType> = ({title, tasks, removeTask, filteredTasks, addTask, changeStatus}) => {
  const [titleInput, setTitleInput] = useState('')

  const onclickRemoveHandler = (id: string) => {
    removeTask(id)
  }

  const onClickFilterHandler = (value: FilteredValueType) => {
    filteredTasks(value)
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.currentTarget.value)
  }

  const addNewTask = () => {
    let trimmedInputTitle = titleInput.trim()
    if (trimmedInputTitle !== '') {
      addTask(trimmedInputTitle.trim())
      setTitleInput('')
    }
  }

  const onClickAddTaskHandler = () => {
    addNewTask()
  }

  const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewTask()
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={titleInput}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressAddTaskHandler}
        />
        <button onClick={onClickAddTaskHandler}>+</button>
      </div>

      <ul>
        {tasks.map((el) => {

            const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeStatus(el.id, e.currentTarget.checked)
            }

            return (
              <li key={el.id}><input
                onChange={onChangeCheckBoxHandler}
                type="checkbox"
                checked={el.isDone}/>
                <span>{el.title}</span>
                <button className={'removeBtn'} onClick={() => onclickRemoveHandler(el.id)}>x</button>
              </li>
            )
          }
        )}
      </ul>

      <div>
        <button onClick={() => onClickFilterHandler('All')}>All</button>
        <button onClick={() => onClickFilterHandler('Active')}>Active</button>
        <button onClick={() => onClickFilterHandler('Completed')}>Completed</button>
      </div>
    </div>

  );
};
