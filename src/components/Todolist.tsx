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
  setStatus: (status: FilterType) => void
  addNewTask: (inputTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {toDoListTitle, tasks, removeTask, setStatus, addNewTask} = props;

  const filterTasksHandler = (status: FilterType) => {
    setStatus(status)
  }


  return (
    <div>
      <ToDoListTitle title={toDoListTitle}/>

      <Input addNewTask={addNewTask}/>

      <Tasks tasks={tasks} removeTask={removeTask}/>

      <Button btnName={'All'} onClickBtn={() => {
        filterTasksHandler('All')
      }}/>
      <Button btnName={'Active'} onClickBtn={() => {
        filterTasksHandler('Active')
      }}/>
      <Button btnName={'Completed'} onClickBtn={() => {
        filterTasksHandler('Completed')
      }}/>
    </div>
  );
};
