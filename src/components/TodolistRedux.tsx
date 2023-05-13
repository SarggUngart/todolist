import React from 'react';
import {FilterType, TaskType} from "../old/App";
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {InputBtn} from "./InputBtn";
import {Btn} from "./Btn";
import {useDispatch, useSelector} from "react-redux";
import {ChangeToDoListFilterAC, ChangeToDoListTitleAC, RemoveTodolistAC} from "../redusers/todolists-reducer";
import {addTaskAC} from "../redusers/tasks-reduces";
import {TodoListsType} from "../AppRedux";
import {AppRootStateType} from "../store/store";


type TodolistPropsType = {
  todoLists: TodoListsType
}

export const TodolistRedux: React.FC<TodolistPropsType> = React.memo(({todoLists}) => {
  const {
    tListId,
    title,
    filter
  } = todoLists

  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[tListId])
  const dispatch = useDispatch()
  console.log('todolist comp')

  const removeTodoListHandler = React.useCallback(() => {
    dispatch(RemoveTodolistAC(tListId))
  }, [tListId])

  const addNewTaskHandler = React.useCallback((title: string) => {
    dispatch(addTaskAC(title, tListId))
  }, [title, tListId])


  const onClickFilterTasksHandler = React.useCallback((tListId: string, filter: FilterType) => {
    dispatch(ChangeToDoListFilterAC(tListId, filter))
  }, [dispatch, tListId, filter])


  const onClickFilterTasksHandlerAll = React.useCallback(() => {
    dispatch(ChangeToDoListFilterAC(tListId, 'All'))
  }, [])

  const onClickFilterTasksHandlerActive = React.useCallback(() => {
    dispatch(ChangeToDoListFilterAC(tListId, 'Active'))
  }, [])

  const onClickFilterTasksHandlerComp = React.useCallback(() => {
    dispatch(ChangeToDoListFilterAC(tListId, 'Completed'))
  }, [])

  const onDblClickTodoListTitleHandler = React.useCallback(() => {
    dispatch(ChangeToDoListTitleAC(tListId, title))
  }, [tListId, title])


  const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
    switch (filter) {
      case "Active":
        return tasks.filter(t => !t.isDone);
      case "Completed":
        return tasks.filter(t => t.isDone);
      default:
        return tasks
    }
  }

  return (
    <div>
      <ToDoListTitle title={title}
                     removeTodoList={removeTodoListHandler}
                     changeTodoListTitle={onDblClickTodoListTitleHandler}/>

      <InputBtn addNewItem={addNewTaskHandler}/>

      {getFilteredTasks(tasks, filter).map(t =>
        <Tasks key={t.id} task={t} tListId={tListId}/>
      )}

      <div className="FilterBtnContainer">
        <Btn
          variant={filter === 'All' ? 'contained' : 'outlined'}
          btnName={'All'}
          onClickBtn={onClickFilterTasksHandler.bind(this, tListId, 'All')}/>

        <Btn
          variant={filter === 'Active' ? 'contained' : 'outlined'}
          btnName={'Active'}
          onClickBtn={onClickFilterTasksHandler.bind(this, tListId, 'Active')}/>

        <Btn
          variant={filter === 'Completed' ? 'contained' : 'outlined'}
          btnName={'Completed'}
          onClickBtn={onClickFilterTasksHandler.bind(this, tListId, 'Completed')}/>
      </div>
    </div>
  );
})
