import React from 'react';
import {TaskType} from "../App";
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {Input} from "./Input";
import {Button} from "./Button";


type TodolistPropsType = {
  toDoListTitle: string
  tasks: TaskType[]
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {toDoListTitle, tasks} = props;
  return (
    <div>
      <ToDoListTitle title={toDoListTitle}/>
      <Input/>
      <Tasks tasks={tasks}/>
      <Button/>
    </div>
  );
};
