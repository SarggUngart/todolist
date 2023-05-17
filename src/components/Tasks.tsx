import React from 'react';
import {TaskType} from "../old/App";
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, List, ListItem} from '@mui/material';
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../redusers/tasks-reduces";
import CheckBox from "../old/CheckBox";


export type TasksPropsType = {
  tListId: string
  task: TaskType
}

export const Tasks: React.FC<TasksPropsType> = React.memo((props) => {
  // console.log('tasks сomp')
  const {tListId, task} = props

  const dispatch = useDispatch()

  const changeStatusHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, tListId))
  }, [task.id, tListId])

  const removeTaskHandler = () => {
    dispatch(removeTaskAC(task.id, tListId))
  }

  const onClickChangeTaskTitle = React.useCallback((title: string) => {
    dispatch(changeTaskTitleAC(task.id, title, tListId))
  }, [dispatch, task.id, tListId])

  const taskIsDoneStyle = task.isDone ? 'done' : ''

  return (
    <List>
      <ListItem sx={{justifyContent: 'space-between'}} disablePadding key={task.id}>

        {/*<Checkbox*/}
        {/*  edge={'start'}*/}
        {/*  checked={task.isDone}*/}
        {/*  size={"small"}*/}
        {/*  onChange={changeStatusHandler}/>*/}

        <CheckBox checked={task.isDone} callBack={changeStatusHandler}/>

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
