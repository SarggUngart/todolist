import React, {Reducer} from 'react';
// import './App.css';
// import {Todolist} from "./components/Todolist";
// import {v1} from "uuid";
// import {InputBtn} from "./components/InputBtn";
// import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
// import HeaderMUI from "./UI/HeaderMUI";
// import {
//   AddTodoListAC,
//   ChangeToDoListFilterAC,
//   ChangeToDoListTitleAC,
//   RemoveTodolistAC,
//   RootTodoListAT,
//   todolistReducer
// } from "./redusers/todolists-reducer";
// import {
//   addTaskAC,
//   changeTaskStatusAC,
//   changeTaskTitleAC,
//   removeTaskAC,
//   RootTasksAT,
//   tasksReducer
// } from "./redusers/tasks-reduces";
//
// export type todoListsType = {
//   id: string
//   title: string
//   filter: FilterType
// }
//
// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }
//
// export type TasksStateType = {
//   [tdListId: string]: TaskType[]
// }
//
// export type FilterType = 'All' | 'Active' | 'Completed'
//
// function AppUseReducer(): JSX.Element {
//   const tdList1 = v1()
//   const tdList2 = v1()
//
//   const [todoLists, dispatchTodoLists] = React.useReducer<Reducer<todoListsType[], RootTodoListAT>>(todolistReducer, [
//       {id: tdList1, title: 'what to learn', filter: 'All'},
//       {id: tdList2, title: 'what to buy', filter: 'All'}
//     ]
//   )
//   const [tasks, dispatchTasks] = React.useReducer<Reducer<TasksStateType, RootTasksAT>>(tasksReducer, {
//     [tdList1]: [
//       {id: v1(), title: 'HTML', isDone: true},
//       {id: v1(), title: 'CSS', isDone: true},
//       {id: v1(), title: 'JS', isDone: false},
//     ],
//     [tdList2]: [
//       {id: v1(), title: 'Milk', isDone: true},
//       {id: v1(), title: 'Water', isDone: true},
//       {id: v1(), title: 'Book', isDone: false},
//       {id: v1(), title: 'Beer', isDone: false}
//     ],
//   })
//
//   const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
//
//
// //TASKS:
//   const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
//     dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
//   }
//   const addNewTask = (todolistId: string, inputTitle: string) => {
//     dispatchTasks(addTaskAC(inputTitle, todolistId))
//   }
//
//   const removeTask = (todolistId: string, id: string) => {
//     dispatchTasks(removeTaskAC(id, todolistId))
//   }
//   const changeTaskTitle = (todolistId: string, id: string, newTaskTitle: string) => {
//     dispatchTasks(changeTaskTitleAC(id, newTaskTitle, todolistId))
//   }
//
// //TODOLIST:
//   const addNewTodoList = (todolistTile: string) => {
//     const action = AddTodoListAC(todolistTile)
//     dispatchTodoLists(action)
//     dispatchTasks(action)
//   }
//   const changeToDoListFilter = (todolistId: string, filter: FilterType) => {
//     dispatchTodoLists(ChangeToDoListFilterAC(todolistId, filter))
//   }
//   const removeTodoList = (todolistId: string) => {
//     const action = RemoveTodolistAC(todolistId)
//     dispatchTodoLists(action)
//     dispatchTasks(action)
//   }
//   const changeTodoListTitle = (todoListId: string, newTitle: string) => {
//     dispatchTodoLists(ChangeToDoListTitleAC(todoListId, newTitle))
//   }
//
//   const theme = !isDarkMode ? 'light' : 'dark'
//
//   const customTheme = createTheme({
//     palette: {
//       primary: {
//         main: '#1769aa',
//         contrastText: '#fff',
//       },
//       secondary: {
//         main: '#651fff',
//         contrastText: '#fff',
//       },
//       mode: theme
//     }
//   });
//
//   return (
//     <ThemeProvider theme={customTheme}>
//       <CssBaseline/>
//       <div className="App">
//         <HeaderMUI
//           isDarkMode={isDarkMode}
//           setIsDarkMode={setIsDarkMode}/>
//
//         <Container>
//           <Grid container sx={{padding: '20px 0 50px 0'}}>
//             <InputBtn addNewTask={addNewTodoList}/>
//           </Grid>
//
//           <Grid container spacing={8}>
//             {todoLists.map(tl => {
//               return (
//                 <Grid key={tl.id} item>
//                   <Paper elevation={8} sx={{p: '20px'}}>
//                     <Todolist key={tl.id}
//                               tListId={tl.id}
//                               toDoListTitle={tl.title}
//                               filter={tl.filter}
//                               tasks={tasks[tl.id]}
//                               removeTodoList={removeTodoList}
//                               removeTask={removeTask}
//                               changeToDoListFilter={changeToDoListFilter}
//                               addNewTask={addNewTask}
//                               changeStatus={changeStatus}
//                               changeTaskTitle={changeTaskTitle}
//                               changeTodoListTitle={changeTodoListTitle}
//                     />
//                   </Paper>
//                 </Grid>
//               )
//             })}
//           </Grid>
//         </Container>
//       </div>
//     </ThemeProvider>
//
//
//   );
// }
//
// export default AppUseReducer;
