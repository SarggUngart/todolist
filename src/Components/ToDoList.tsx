import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilteredValueType} from "../App";
import styles from "../Components/ToDoList.module.css"


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
  filter: FilteredValueType

}

export const ToDoList: FC<ToDoListPropsType> = ({
                                                  title,
                                                  tasks,
                                                  removeTask,
                                                  filteredTasks,
                                                  addTask,
                                                  changeStatus,
                                                  filter
                                                }) => {

  const [titleInput, setTitleInput] = useState('')
  const [error, setError] = useState(false)


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
      setError(false)
    } else {
      setError(true)
    }
  }

  const onClickAddTaskHandler = () => {
    addNewTask()
  }

  const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      addNewTask()
    }
  }

  const onChangeCheckBoxHandler = (taskId: string, isDone: boolean) => {
    changeStatus(taskId, isDone)
  }

  return (
    <div>
      <h3>{title}</h3>
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
              <li key={el.id}><input
                onChange={(e) => onChangeCheckBoxHandler(el.id, e.currentTarget.checked)}
                type="checkbox"
                checked={el.isDone}/>
                <span
                  className={el.isDone ? styles.doneTask : ''}
                >{el.title}</span>
                <button className={'removeBtn'} onClick={() => onclickRemoveHandler(el.id)}>x</button>
              </li>
            )
          }
        )}
      </ul>

      <div>
        <button className={filter === 'All' ? styles.btnActive : ''}
                onClick={() => onClickFilterHandler('All')}>All
        </button>
        <button className={filter === 'Active' ? styles.btnActive : ''}
                onClick={() => onClickFilterHandler('Active')}>Active
        </button>
        <button className={filter === 'Completed' ? styles.btnActive : ''}
                onClick={() => onClickFilterHandler('Completed')}>Completed
        </button>
      </div>
    </div>

  );
};
