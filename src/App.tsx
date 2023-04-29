import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {InputBtn} from "./components/InputBtn";
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
import HeaderMUI from "./UI/HeaderMUI";

export type todoListsType = {
  id: string
  title: string
  filter: FilterType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [tdListId: string]: TaskType[]
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App(): JSX.Element {
  const tdList1 = v1()
  const tdList2 = v1()

  const [todoLists, setTodoLists] = React.useState<todoListsType[]>([
      {id: tdList1, title: 'what to learn', filter: 'All'},
      {id: tdList2, title: 'what to buy', filter: 'All'}
    ]
  )
  const [tasks, setTasks] = React.useState<TasksStateType>({
    [tdList1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: false},
    ],
    [tdList2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Book', isDone: false},
      {id: v1(), title: 'Beer', isDone: false}
    ],
  })

  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);


//TASKS:
  const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: !isDone} : t)})
  }
  const addNewTask = (todolistId: string, inputTitle: string) => {
    const newTask: TaskType = {id: v1(), title: inputTitle, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }
  const removeTask = (todolistId: string, id: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
  }
  const changeTaskTitle = (todolistId: string, id: string, newTaskTitle: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: newTaskTitle} : t)})
  }

//TODOLIST:
  const addNewTodoList = (todolistTile: string) => {
    const newTodoList: todoListsType = {
      id: v1(),
      title: todolistTile,
      filter: 'All'
    }
    setTodoLists([...todoLists, newTodoList])
    setTasks({[newTodoList.id]: [], ...tasks})
  }
  const changeToDoListFilter = (todolistId: string, filter: FilterType) => {
    setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
  }
  const removeTodoList = (todolistId: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }
  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
  }

  const theme = !isDarkMode ? 'light' : 'dark'

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#1769aa',
        contrastText: '#fff',
      },
      secondary: {
        main: '#651fff',
        contrastText: '#fff',
      },
      mode: theme
    }
  });


  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      <div className="App">
        <HeaderMUI
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}/>

        <Container>
          <Grid container sx={{padding: '20px 0 50px 0'}}>
            <InputBtn addNewTask={addNewTodoList}/>
          </Grid>

          <Grid container spacing={8}>
            {todoLists.map(tl => {
              return (
                <Grid key={tl.id} item>
                  <Paper elevation={8} sx={{p: '20px'}}>
                    <Todolist key={tl.id}
                              tListId={tl.id}
                              toDoListTitle={tl.title}
                              filter={tl.filter}
                              tasks={tasks[tl.id]}
                              removeTodoList={removeTodoList}
                              removeTask={removeTask}
                              changeToDoListFilter={changeToDoListFilter}
                              addNewTask={addNewTask}
                              changeStatus={changeStatus}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>


  );
}

export default App;
