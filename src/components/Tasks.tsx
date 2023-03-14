import React from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";

type TasksPropsType = {
  tasks: TaskType[]
  removeTask: (id: string) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
  const {tasks, removeTask} = props

  return (
    <ul>
      {tasks.map(task => {

        const removeTaskHandler = () => {
          removeTask(task.id)
        }

        return (
          <li key={task.id}>
            <input type={"checkbox"} checked={task.isDone}></input>
            <span>{task.title}</span>
            <Button btnName={'X'} onClickBtn={removeTaskHandler}/>
          </li>
        )
      })}
    </ul>

  )
}
