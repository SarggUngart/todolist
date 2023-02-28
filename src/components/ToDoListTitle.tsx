import React from 'react';

type TaskTitlePropsType = {
  title: string
}

export const ToDoListTitle: React.FC<TaskTitlePropsType> = (props: TaskTitlePropsType) => {
  const {title} = props
  return (
    <h3>{title}</h3>
  );
};

