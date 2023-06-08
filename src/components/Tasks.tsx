import React from 'react';
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, List, ListItem} from '@mui/material';
import {removeTaskTC, updateTaskTC} from "../redusers/tasks-reduces";
import {TaskStatuses, TaskType} from '../api/todolist-api';
import CheckBox from "./CheckBox";
import {useAppDispatch} from "../store/store";


export type TasksPropsType = {
  id: string
  task: TaskType
}

export const Tasks: React.FC<TasksPropsType> = React.memo((props) => {

  const {id, task} = props

  const dispatch = useAppDispatch()

  const changeStatusHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

    let status = e.currentTarget.checked ? TaskStatuses.Complited : TaskStatuses.New
    dispatch(updateTaskTC(id, task.id, {status}))
  }, [id, task.id])

  const removeTaskHandler = () => {
    dispatch(removeTaskTC(id, task.id))
  }

  const onClickChangeTaskTitle = React.useCallback((title: string) => {
    dispatch(updateTaskTC(id, task.id, {title}))
  }, [dispatch, task.id, id])

  const taskIsDoneStyle = task.status === TaskStatuses.Complited ? 'done' : ''

  return (
    <List sx={{padding: '0', height: '35px'}}>
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
