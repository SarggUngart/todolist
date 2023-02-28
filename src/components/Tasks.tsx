import React from 'react';
import {TaskType} from "../App";

type TasksPropsType = {
  tasks: TaskType[]
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
  const {tasks} = props

  return (
    <ul>
        {tasks.map(task => {
          return (
            <li key={task.id}>
              <input type={"checkbox"} checked={task.isDone}></input>
              <span>{task.title}</span>
            </li>
          )
        })}
    </ul>

  )
}
