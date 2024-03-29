import React from 'react';
// import {FilterType, TaskType} from "./App";
// import {ToDoListTitle} from "../components/ToDoListTitle";
// import {Tasks} from "../components/Tasks";
// import {InputBtn} from "../components/InputBtn";
// import {Btn} from "../components/Btn";
//
//
// type TodolistPropsType = {
//   tListId: string
//   removeTodoList: (todolistId: string) => void
//   toDoListTitle: string
//   tasks: TaskType[],
//   removeTask: (todolistId: string, id: string) => void
//   changeToDoListFilter: (todolistId: string, filter: FilterType) => void
//   addNewTask: (todolistId: string, inputTitle: string) => void
//   changeStatus: (todolistId: string, id: string, isDone: boolean) => void
//   filter: FilterType
//   changeTaskTitle: (todolistId: string, id: string, newTaskTitle: string) => void
//   changeTodoListTitle: (todoListId: string, newTitle: string) => void
//
// }
//
// export const Todolist: React.FC<TodolistPropsType> = (props) => {
//   const {
//     tListId,
//     toDoListTitle,
//     tasks,
//     filter,
//     removeTodoList,
//     addNewTask,
//     removeTask,
//     changeToDoListFilter,
//     changeStatus,
//     changeTaskTitle,
//     changeTodoListTitle
//   } = props;
//
//   const removeTodoListHandler = () => removeTodoList(tListId)
//
//   const addNewTaskHandler = (title: string) => {
//     addNewTask(tListId, title)
//   }
//   const changeStatusHandler = (id: string, isDone: boolean) => {
//     changeStatus(tListId, id, isDone)
//   }
//   const removeTaskHandler = (id: string) => {
//     removeTask(tListId, id)
//   }
//   const onClickFilterTasksHandler = (todolistId: string, filter: FilterType) => {
//     changeToDoListFilter(todolistId, filter)
//   }
//
//   const onClickChangeTaskTitle = (id: string, newTaskTitle: string) => {
//     changeTaskTitle(tListId, id, newTaskTitle)
//   }
//
//   const onDblClickTodoListTitleHandler = (newTitle: string) => {
//     changeTodoListTitle(tListId, newTitle)
//   }
//
//   // const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
//   //   switch (filter) {
//   //     case "Active":
//   //       return tasks.filter(t => !t.isDone);
//   //     case "Completed":
//   //       return tasks.filter(t => t.isDone);
//   //     default:
//   //       return tasks
//   //   }
//   // }
//
//
//   return (
//     <div>
//       <ToDoListTitle title={toDoListTitle} removeTodoList={removeTodoListHandler}
//                      changeTodoListTitle={onDblClickTodoListTitleHandler}/>
//       <InputBtn addNewItem={addNewTaskHandler}/>
//
//       {/*<Tasks tListId={tListId}*/}
//       {/*       filter={filter}*/}
//
//       {/*/>*/}
//
//       <div className="FilterBtnContainer">
//         <Btn
//           variant={filter === 'All' ? 'contained' : 'outlined'}
//           btnName={'All'} onClickBtn={() => {
//           onClickFilterTasksHandler(tListId, 'All')
//         }}/>
//
//         <Btn
//           variant={filter === 'Active' ? 'contained' : 'outlined'}
//           btnName={'Active'} onClickBtn={() => {
//           onClickFilterTasksHandler(tListId, 'Active')
//         }}/>
//
//         <Btn
//           variant={filter === 'Completed' ? 'contained' : 'outlined'}
//           btnName={'Completed'} onClickBtn={() => {
//           onClickFilterTasksHandler(tListId, 'Completed')
//         }}/>
//       </div>
//     </div>
//   );
// };
