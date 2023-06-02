import React from 'react';
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, List, ListItem} from '@mui/material';
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../redusers/tasks-reduces";
import {TaskStatuses, TaskType} from '../api/todolist-api';
import CheckBox from "./CheckBox";


export type TasksPropsType = {
  id: string
  task: TaskType
}

export const Tasks: React.FC<TasksPropsType> = React.memo((props) => {
  // console.log('tasks сomp')
  const {id, task} = props

  const dispatch = useDispatch()

  const changeStatusHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked ? TaskStatuses.Complited : TaskStatuses.New, id))
  }, [task.id, id])

  const removeTaskHandler = () => {
    dispatch(removeTaskAC(task.id, id))
  }

  const onClickChangeTaskTitle = React.useCallback((title: string) => {
    dispatch(changeTaskTitleAC(task.id, title, id))
  }, [dispatch, task.id, id])

  const taskIsDoneStyle = task.status === TaskStatuses.Complited ? 'done' : ''

  return (
    <List>
      <ListItem sx={{justifyContent: 'space-between'}} disablePadding key={task.id}>

        <CheckBox checked={task.status} callBack={changeStatusHandler}/>

        <EditableTitle
          titleClass={taskIsDoneStyle}
          callBack={onClickChangeTaskTitle}
          title={task.title}/>

        <IconButton
          edge={'end'}
          size={'small'}
          onClick={removeTaskHandler}>
          <DeleteIcon color={'primary'}/>
        </IconButton>
      </ListItem>

    </List>

  )
})
