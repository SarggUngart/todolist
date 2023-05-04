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
  filter: FilterType
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
  const {tasks, filter, removeTask, changeStatus, onClickChangeTaskTitle} = props

  const changeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string, isDone: boolean) => {
    changeStatus(id, isDone)
  }

  const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
    switch (filter) {
      case "Active":
        return tasks.filter(t => !t.isDone);
      case "Completed":
        return tasks.filter(t => t.isDone);
      default:
        return tasks
    }
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
              onClick={() => removeTask(task.id)}>
              <DeleteIcon color={'primary'}/>
            </IconButton>
          </ListItem>
        )
      })}
    </List>

  )
}
