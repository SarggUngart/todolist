import React, {FC} from 'react';
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
}

export const ToDoList: FC<ToDoListPropsType> = ({title, tasks, removeTask, filteredTasks}) => {

  const onclickHandler = (id: string) => {
    removeTask(id)
  }

  const onClickFilterHandler = (value: FilteredValueType) => {
    filteredTasks(value)
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>

      <ul>
        {tasks.map((el) => {
            return (
              <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                <button onClick={() => onclickHandler(el.id)}>x</button>
                <span>{el.title}</span>
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
