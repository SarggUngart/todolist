import React from 'react';
import './App.css';
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
import HeaderMUI from "./UI/HeaderMUI";
import {useAppDispatch, useAppSelector} from "./store/store";
import {TodolistRedux} from "./components/TodolistRedux";
import {InputBtn} from "./components/InputBtn";
import {AddTodoListAC, getTodoListsTC, TodolistDomainType} from "./redusers/todolists-reducer";
import {TaskType} from "./api/todolist-api";

export type TasksStateType = {
  [tdListId: string]: TaskType[]
}

function AppRedux(): JSX.Element {

  const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todoLists)
  const dispatch = useAppDispatch()
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getTodoListsTC())
  }, [])

  const theme = !isDarkMode ? 'light' : 'dark'

  const addNewTodoList = React.useCallback((title: string) => {
    dispatch(AddTodoListAC(title))
  }, [dispatch])

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
            <InputBtn addNewItem={addNewTodoList}/>
          </Grid>

          <Grid container spacing={8}>
            {todoLists.map(tl => {
              return (
                <Grid key={tl.id} item>
                  <Paper elevation={8} sx={{p: '20px', minWidth: '310px'}}>
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
