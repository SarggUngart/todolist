import React from 'react';
import {FilterType, TaskType} from "../App";
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {InputBtn} from "./InputBtn";
import {Button} from "./Button";

type TodolistPropsType = {
  tListId: string
  removeTodoList: (todolistId: string) => void
  toDoListTitle: string
  tasks: TaskType[],
  removeTask: (todolistId: string, id: string) => void
  changeToDoListFilter: (todolistId: string, filter: FilterType) => void
  addNewTask: (todolistId: string, inputTitle: string) => void
  changeStatus: (todolistId: string, id: string, isDone: boolean) => void
  filter: FilterType
  changeTaskTitle: (todolistId: string, id: string, newTaskTitle: string) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
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
    changeTaskTitle,
    changeTodoListTitle
  } = props;

  const [inputTitle, setInputTitle] = React.useState('')

  const removeTodoListHandler = () => removeTodoList(tListId)


  const addNewTaskHandler = () => {
    if (inputTitle.trim()) {
      addNewTask(tListId, inputTitle)
      setInputTitle('')
      return
    }
  }
  const changeStatusHandler = (id: string, isDone: boolean) => {
    changeStatus(tListId, id, isDone)
  }
  const removeTaskHandler = (id: string) => {
    removeTask(tListId, id)
  }
  const onClickFilterTasksHandler = (todolistId: string, filter: FilterType) => {
    changeToDoListFilter(todolistId, filter)
  }

  const onClickChangeTaskTitle = (id: string, newTaskTitle: string) => {
    changeTaskTitle(tListId, id, newTaskTitle)
  }

  const onDblClickTodoListTitleHandler = (newTitle: string) => {
    changeTodoListTitle(tListId, newTitle)
  }

  return (
    <div>
      <ToDoListTitle title={toDoListTitle} removeTodoList={removeTodoListHandler}
                     changeTodoListTitle={onDblClickTodoListTitleHandler}/>
      <InputBtn addNewTask={addNewTaskHandler}/>

      <Tasks onClickChangeTaskTitle={onClickChangeTaskTitle} changeStatus={changeStatusHandler} tasks={tasks}
             removeTask={removeTaskHandler}/>

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
