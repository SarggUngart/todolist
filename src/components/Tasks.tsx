import React from 'react';
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {removeTaskTC, TaskDomainType, updateTaskTC} from "../redusers/tasks-reduces";
import {TaskStatuses} from '../api/todolist-api';
import CheckBox from "./CheckBox";
import {useAppDispatch} from "../store/store";

export type TasksPropsType = {
  id: string
  task: TaskDomainType
}

export const Tasks: React.FC<TasksPropsType> = React.memo((props) => {

  const {id, task} = props

  // console.log('task', task.entityStatus)
  // console.log('task', task)

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
      <ListItem sx={{justifyContent: 'space-between', marginTop: '10px'}} disablePadding key={task.id}>

        <CheckBox disabled={task.entityStatus === 'loading'} checked={task.status} callBack={changeStatusHandler}/>

        <EditableTitle
          entityStatus={task.entityStatus}
          titleClass={taskIsDoneStyle}
          callBack={onClickChangeTaskTitle}
          title={task.title}/>

        <IconButton
          disabled={task.entityStatus === 'loading'}
          color={'primary'}
          edge={'end'}
          size={'small'}
          onClick={removeTaskHandler}>
          <DeleteIcon/>
        </IconButton>
      </ListItem>

    </List>

  )
})
