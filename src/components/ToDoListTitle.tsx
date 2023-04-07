import React from 'react';
import {Button} from "./Button";
import EditableTitle from "./EditableTitle";

type TaskTitlePropsType = {
  title: string
  removeTodoList: () => void
  changeTodoListTitle: (newTitle: string) => void
}

export const ToDoListTitle: React.FC<TaskTitlePropsType> = (props: TaskTitlePropsType) => {
  const {title, removeTodoList, changeTodoListTitle} = props
  return (
    <div>
      <h3 className={'todoListTitle'}>
        <EditableTitle title={title} callBack={changeTodoListTitle}/>
      </h3>
      <Button btnName={'x'}
              onClickBtn={removeTodoList}
      />
    </div>
  );
};

