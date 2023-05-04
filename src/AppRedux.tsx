import React from 'react';
import './App.css';
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
import HeaderMUI from "./UI/HeaderMUI";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodolistRedux} from "./components/TodolistRedux";
import {InputBtn} from "./components/InputBtn";
import {addTaskAC} from "./redusers/tasks-reduces";
import {AddTodoListAC} from "./redusers/todolists-reducer";

export type TodoListsType = {
  tListId: string
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

function AppRedux(): JSX.Element {
  const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)
  const dispatch = useDispatch()
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  const theme = !isDarkMode ? 'light' : 'dark'

  const addNewTask = (title: string) => {
    dispatch(AddTodoListAC(title))
  }

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
            <InputBtn addNewItem={addNewTask}/>
          </Grid>

          <Grid container spacing={8}>
            {todoLists.map(tl => {
              return (
                <Grid key={tl.tListId} item>
                  <Paper elevation={8} sx={{p: '20px'}}>
                    <TodolistRedux todoLists={tl}/>
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

export default AppRedux;
