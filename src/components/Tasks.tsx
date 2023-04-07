import React from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";
import CheckBox from "./CheckBox";
import EditableTitle from "./EditableTitle";

type TasksPropsType = {
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeStatus: (id: string, isDone: boolean) => void
  onClickChangeTaskTitle: (id: string, newTaskTitle: string) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
  const {tasks, removeTask, changeStatus, onClickChangeTaskTitle} = props

  const onClickRemoveTaskHandler = (id: string) => {
    removeTask(id)
  }

  const changeStatusHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string, isDone: boolean) => {
    changeStatus(id, isDone)
  }

  return (
    <ul>
      {tasks.map(task => {
        const taskIsDoneClass = task.isDone ? 'done' : ''
        return (
          <li key={task.id}>
            <CheckBox checked={task.isDone} callBack={(event) => changeStatusHandler(event, task.id, task.isDone)}/>
            <EditableTitle callBack={(newTitle) => onClickChangeTaskTitle(task.id, newTitle)}
                           titleClass={taskIsDoneClass} title={task.title}/>
            <Button
              btnClass={'removeBtn'}
              btnName={'X'}
              onClickBtn={() => onClickRemoveTaskHandler(task.id)}/>
          </li>
        )
      })}
    </ul>

  )
}
