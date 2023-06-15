import React from 'react';
import {ToDoListTitle} from "./ToDoListTitle";
import {Tasks} from "./Tasks";
import {InputWithBtn} from "./InputWithBtn";
import {Btn} from "./Btn";
import {
  ChangeToDoListFilterAC,
  FilterType,
  removeTodoListTC,
  TodolistDomainType,
  updateTodoListTitleTC
} from "../redusers/todolists-reducer";
import {addTaskTC, getTasksTC} from "../redusers/tasks-reduces";
import {useAppDispatch, useAppSelector} from "../store/store";
import {TaskStatuses, TaskApiType} from "../api/todolist-api";

type TodolistPropsType = {
  todoLists: TodolistDomainType
}

export const TodolistRedux: React.FC<TodolistPropsType> = React.memo(({todoLists}) => {
  const {
    id,
    title,
    filter,
    entityStatus
  } = todoLists

  const tasks = useAppSelector<TaskApiType[]>(state => state.tasks[id])
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getTasksTC(id))
  }, [])

  const removeTodoListHandler = React.useCallback(() => {
    dispatch(removeTodoListTC(id))
  }, [id])

  const onClickAddNewItemHandler = React.useCallback((title: string) => {
    dispatch(addTaskTC(id, title))
  }, [id, title])


  const onClickFilterTasksHandler = React.useCallback((id: string, filter: FilterType) => {
    dispatch(ChangeToDoListFilterAC(id, filter))
  }, [dispatch, id, filter])


  const changeTodoListTitleHandler = React.useCallback((newTitle: string) => {
    dispatch(updateTodoListTitleTC(id, newTitle))
  }, [])


  const getFilteredTasks = (tasks: TaskApiType[], filter: FilterType): TaskApiType[] => {
    switch (filter) {
      case "Active":
        return tasks.filter(t => t.status === TaskStatuses.New);
      case "Completed":
        return tasks.filter(t => t.status === TaskStatuses.Complited);
      default:
        return tasks
    }
  }

  return (
    <div>
      <ToDoListTitle title={title}
                     removeTodoList={removeTodoListHandler}
                     changeTodoListTitle={changeTodoListTitleHandler}
                     entityStatus={entityStatus}
      />

      <InputWithBtn addNewItem={onClickAddNewItemHandler} disabled={entityStatus === 'loading'}/>

      {getFilteredTasks(tasks, filter).map(t =>
        <Tasks key={t.id} task={t} id={id}/>
      )}

      <div className="FilterBtnContainer">
        <Btn
          variant={filter === 'All' ? 'contained' : 'outlined'}
          btnName={'All'}
          onClickBtn={onClickFilterTasksHandler.bind(this, id, 'All')}/>

        <Btn
          variant={filter === 'Active' ? 'contained' : 'outlined'}
          btnName={'Active'}
          onClickBtn={onClickFilterTasksHandler.bind(this, id, 'Active')}/>

        <Btn
          variant={filter === 'Completed' ? 'contained' : 'outlined'}
          btnName={'Completed'}
          onClickBtn={onClickFilterTasksHandler.bind(this, id, 'Completed')}/>
      </div>
    </div>
  );
})
