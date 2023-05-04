import React from 'react';
import {FilterType, TaskType} from "../App";
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {InputBtn} from "./InputBtn";
import {Btn} from "./Btn";
import {useDispatch, useSelector} from "react-redux";
import {ChangeToDoListFilterAC, ChangeToDoListTitleAC, RemoveTodolistAC} from "../redusers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../redusers/tasks-reduces";
import {TodoListsType} from "../AppRedux";
import {AppRootStateType} from "../store/store";


type TodolistPropsType = {
  todoLists: TodoListsType
}

export const TodolistRedux: React.FC<TodolistPropsType> = ({todoLists}) => {
  const {
    tListId,
    title,
    filter
  } = todoLists

  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[tListId])
  const dispatch = useDispatch()

  const removeTodoListHandler = () => {
    dispatch(RemoveTodolistAC(tListId))
  }

  const addNewTaskHandler = (title: string) => {
    dispatch(addTaskAC(title, tListId))
  }

  const changeStatusHandler = (id: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(id, isDone, tListId))
  }
  const removeTaskHandler = (id: string) => {
    dispatch(removeTaskAC(id, tListId))
  }
  const onClickFilterTasksHandler = (tListId: string, filter: FilterType) => {
    dispatch(ChangeToDoListFilterAC(tListId, filter))
  }

  const onClickChangeTaskTitle = (id: string, title: string) => {
    dispatch(changeTaskTitleAC(id, title, tListId))
  }

  const onDblClickTodoListTitleHandler = () => {
    dispatch(ChangeToDoListTitleAC(tListId, title))
  }


  return (
    <div>
      <ToDoListTitle title={title} removeTodoList={removeTodoListHandler}
                     changeTodoListTitle={onDblClickTodoListTitleHandler}/>
      <InputBtn addNewItem={addNewTaskHandler}/>

      <Tasks onClickChangeTaskTitle={onClickChangeTaskTitle}
             changeStatus={changeStatusHandler}
             tasks={tasks}
             removeTask={removeTaskHandler}
             filter={filter}
      />

      <div className="FilterBtnContainer">
        <Btn
          btnClass={'FilterBtn'}
          variant={filter === 'All' ? 'contained' : 'outlined'}
          btnName={'All'} onClickBtn={() => {
          onClickFilterTasksHandler(tListId, 'All')
        }}/>

        <Btn
          btnClass={'FilterBtn'}
          variant={filter === 'Active' ? 'contained' : 'outlined'}
          btnName={'Active'} onClickBtn={() => {
          onClickFilterTasksHandler(tListId, 'Active')
        }}/>

        <Btn
          btnClass={'FilterBtn'}
          variant={filter === 'Completed' ? 'contained' : 'outlined'}
          btnName={'Completed'} onClickBtn={() => {
          onClickFilterTasksHandler(tListId, 'Completed')
        }}/>
      </div>
    </div>
  );
};
