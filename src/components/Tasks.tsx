import React from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";
import CheckBox from "./CheckBox";

type TasksPropsType = {
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeStatus: (id: string, isDone: boolean) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
  const {tasks, removeTask, changeStatus} = props

  const onClickRemoveTaskHandler = (id: string) => {
    removeTask(id)
  }

  const changeStatusHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string, isDone: boolean) => {
    changeStatus(id, isDone)
  }

  return (
    <ul>
      {tasks.map(task => {
        return (
          <li key={task.id}>
            <CheckBox checked={task.isDone} callBack={(event) => changeStatusHandler(event, task.id, task.isDone)}/>
            <span>{task.title}</span>
            <Button
              style={false}
              btnName={'X'}
              onClickBtn={() => onClickRemoveTaskHandler(task.id)}/>
          </li>
        )
      })}
    </ul>

  )
}
