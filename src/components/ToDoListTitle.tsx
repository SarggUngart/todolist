import React from 'react';
import {Button} from "./Button";

type TaskTitlePropsType = {
  title: string
  removeTodoList: () => void
}

export const ToDoListTitle: React.FC<TaskTitlePropsType> = (props: TaskTitlePropsType) => {
  const { title, removeTodoList} = props
  return (<>
      <h3>{title}</h3>
      <Button btnName={'x'}
              onClickBtn={removeTodoList}
              />
    </>
  );
};

