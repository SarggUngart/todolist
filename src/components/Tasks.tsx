import React from 'react';
import {FilterType, TaskType} from "../App";
import CheckBox from "./CheckBox";
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, List, ListItem} from '@mui/material';


type TasksPropsType = {
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeStatus: (id: string, isDone: boolean) => void
  onClickChangeTaskTitle: (id: string, newTaskTitle: string) => void
  getFilteredTasks: (tasks: TaskType[], filter: FilterType) => TaskType[]
  filter: FilterType
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
  const {tasks, filter, removeTask, changeStatus, onClickChangeTaskTitle, getFilteredTasks} = props

  const onClickRemoveTaskHandler = (id: string) => {
    removeTask(id)
  }

  const changeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string, isDone: boolean) => {
    changeStatus(id, isDone)
  }


  return (
    <List>
      {getFilteredTasks(tasks, filter).map(task => {
        const taskIsDoneClass = task.isDone ? 'done' : ''
        return (
          <ListItem sx={{justifyContent: 'space-between'}} disablePadding key={task.id}>
            <CheckBox checked={task.isDone} callBack={(event) => changeStatusHandler(event, task.id, task.isDone)}/>
            <EditableTitle callBack={(newTitle) => onClickChangeTaskTitle(task.id, newTitle)}
                           titleClass={taskIsDoneClass} title={task.title}/>
            <IconButton
              edge={'end'}
              size={'small'}
              onClick={() => onClickRemoveTaskHandler(task.id)}>
              <DeleteIcon color={'primary'}/>
            </IconButton>
          </ListItem>
        )
      })}
    </List>

  )
}
