import React from 'react';
import {FilterType, TaskType} from "../App";
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {Input} from "./Input";
import {Button} from "./Button";


type TodolistPropsType = {
  toDoListTitle: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeToDoListFilter: (status: FilterType) => void
  addNewTask: (inputTitle: string) => void
  changeStatus: (id: string, isDone: boolean) => void
  filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {toDoListTitle, tasks, removeTask, changeToDoListFilter, addNewTask, changeStatus,} = props;

  const onClickFilterTasksHandler = (status: FilterType) => {
    changeToDoListFilter(status)
  }


  return (
    <div>
      <ToDoListTitle title={toDoListTitle}/>

      <Input addNewTask={addNewTask}/>

      <Tasks changeStatus={changeStatus} tasks={tasks} removeTask={removeTask}/>

      <Button
        btnName={'All'} onClickBtn={() => {
        onClickFilterTasksHandler('All')
      }}/>

      <Button
        btnName={'Active'} onClickBtn={() => {
        onClickFilterTasksHandler('Active')
      }}/>

      <Button
        btnName={'Completed'} onClickBtn={() => {
        onClickFilterTasksHandler('Completed')
      }}/>
    </div>
  );
};
