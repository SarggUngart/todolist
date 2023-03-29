import React from 'react';
import {FilterType, TaskType} from "../App";
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {Input} from "./Input";
import {Button} from "./Button";


type TodolistPropsType = {
  tListId: string
  removeTodoList: (todolistId: string) => void
  toDoListTitle: string
  tasks: TaskType[]
  removeTask: (todolistId: string, id: string) => void
  changeToDoListFilter: (todolistId: string, filter: FilterType) => void
  addNewTask: (todolistId: string, inputTitle: string) => void
  changeStatus: (todolistId: string, id: string, isDone: boolean) => void
  filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {
    tListId,
    toDoListTitle,
    tasks,
    filter,
    removeTodoList,
    addNewTask,
    removeTask,
    changeToDoListFilter,
    changeStatus,
  } = props;


  const removeTodoListHandler = () => removeTodoList(tListId)
  const addNewTaskHandler = (inputTitle: string) => addNewTask(tListId, inputTitle)
  const changeStatusHandler = (id: string, isDone: boolean) => {
    changeStatus(tListId, id, isDone)
  }
  const removeTaskHandler = (id: string) => {
    removeTask(tListId, id)
  }
  const onClickFilterTasksHandler = (todolistId: string, filter: FilterType) => {
    changeToDoListFilter(todolistId, filter)
  }

  return (
    <div>
      <ToDoListTitle title={toDoListTitle} removeTodoList={removeTodoListHandler}/>

      <Input addNewTask={addNewTaskHandler}/>

      <Tasks changeStatus={changeStatusHandler} tasks={tasks} removeTask={removeTaskHandler}/>

      <Button
        btnClass={filter === 'All' ? 'activeBtn' : ''}
        btnName={'All'} onClickBtn={() => {
        onClickFilterTasksHandler(tListId, 'All')
      }}/>

      <Button
        btnClass={filter === 'Active' ? 'activeBtn' : ''}
        btnName={'Active'} onClickBtn={() => {
        onClickFilterTasksHandler(tListId, 'Active')
      }}/>

      <Button
        btnClass={filter === 'Completed' ? 'activeBtn' : ''}
        btnName={'Completed'} onClickBtn={() => {
        onClickFilterTasksHandler(tListId, 'Completed')
      }}/>
    </div>
  );
};
