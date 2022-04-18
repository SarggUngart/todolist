import React, {FC} from 'react';
import {FilteredValueType} from "../../App";
import styles from "./ToDoList.module.css"
import {CheckBox} from "../CheckBox/CheckBox";
import AddItemForm from "../AddItemForm/AddItemForm";


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


  const removeTodoListHandler = () => {
    removeTodoList(todolistId)
  }

  const AddItemFormHandler = (newTitle: string) => {
    addTask(todolistId, newTitle)
  }

  const onChangeCheckBoxHandler = (todolistId: string, taskId: string, isDone: boolean) => {
    changeStatus(todolistId, taskId, isDone)
  }

  const removeTaskHandler = (todolistId: string, id: string) => {
    removeTask(todolistId, id)
  }

  const filteredTasksHandler = (todolistId: string, value: FilteredValueType) => {
    filteredTasks(todolistId, value)
  }

  return (
    <div>
      <div className={'todolistHeader'}>
        <h3 className={'title'}>{title}</h3>
        <button onClick={removeTodoListHandler}>x</button>
      </div>

      <AddItemForm callBack={AddItemFormHandler}/>

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
                <button className={'removeBtn'} onClick={() => removeTaskHandler(todolistId, el.id)}>x</button>
              </li>
            )
          }
        )}
      </ul>

      <div>
        <button className={filter === 'All' ? styles.btnActive : ''}
                onClick={() => filteredTasksHandler(todolistId, 'All')}>All
        </button>
        <button className={filter === 'Active' ? styles.btnActive : ''}
                onClick={() => filteredTasksHandler(todolistId, 'Active')}>Active
        </button>
        <button className={filter === 'Completed' ? styles.btnActive : ''}
                onClick={() => filteredTasksHandler(todolistId, 'Completed')}>Completed
        </button>
      </div>
    </div>

  );
};
