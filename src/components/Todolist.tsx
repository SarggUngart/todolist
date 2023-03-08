import React from 'react';
import {FilterType, TaskType} from "../App";
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {Input} from "./Input";
import {Button} from "./Button";


type TodolistPropsType = {
  toDoListTitle: string
  tasks: TaskType[]
  removeTask: (id: number) => void
  setStatus: (status: FilterType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {toDoListTitle, tasks, removeTask, setStatus} = props;


  return (
    <div>
      <ToDoListTitle title={toDoListTitle}/>

      <Input/>

      <Tasks tasks={tasks} removeTask={removeTask}/>


      <Button btnName={'All'} btnOnclick={() => {
        setStatus('All')
      }}/>
      <Button btnName={'Active'} btnOnclick={() => {
        setStatus('Active')
      }}/>
      <Button btnName={'Completed'} btnOnclick={() => {
        setStatus('Completed')
      }}/>
    </div>
  );
};
