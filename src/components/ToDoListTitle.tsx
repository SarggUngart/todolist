import React from 'react';
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, Typography} from "@mui/material";

type TaskTitlePropsType = {
  title: string
  removeTodoList: () => void
  changeTodoListTitle: (newTitle: string) => void
}


export const ToDoListTitle: React.FC<TaskTitlePropsType> = (props: TaskTitlePropsType) => {
  const {title, removeTodoList, changeTodoListTitle} = props



  return (
    <div className={'todoListTitleContainer'}>
      <Typography variant={'h5'} sx={{
        display: 'flex',
        width: '100%'
      }}>
        <EditableTitle title={title} callBack={changeTodoListTitle}/>
      </Typography>

      <IconButton
        size={'small'}
        onClick={removeTodoList}>
        <DeleteIcon color={'primary'}/>
      </IconButton>

    </div>
  );
};

