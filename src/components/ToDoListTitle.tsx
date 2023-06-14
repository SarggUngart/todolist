import React from 'react';
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {RequestStatusType} from "../redusers/app-reduser";

type TaskTitlePropsType = {
  title: string
  removeTodoList: () => void
  changeTodoListTitle: (newTitle: string) => void
  entityStatus:RequestStatusType
}

export const ToDoListTitle: React.FC<TaskTitlePropsType> = (props: TaskTitlePropsType) => {
  const {title, entityStatus,removeTodoList, changeTodoListTitle} = props


  return (
    <div className={'todoListTitleContainer'}>
      <Typography variant={'h5'} sx={{
        display: 'flex',
        width: '100%'
      }}>
        <EditableTitle title={title} callBack={changeTodoListTitle} entityStatus={entityStatus}/>
      </Typography>
      <IconButton
        color={'primary'}
        size={'small'}
        disabled={entityStatus === 'loading'}
        onClick={removeTodoList}>
        <DeleteIcon/>
      </IconButton>
    </div>
  );
};

