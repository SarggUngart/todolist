import React from 'react';
import './App.css';
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import HeaderMUI from "./UI/HeaderMUI";
import {useAppDispatch, useAppSelector} from "./store/store";
import {TodolistRedux} from "./components/TodolistRedux";
import {InputBtn} from "./components/InputBtn";
import {createTodoListTC, getTodoListsTC, TodolistDomainType} from "./redusers/todolists-reducer";
import {TaskType} from "./api/todolist-api";
import {RequestStatusType} from "./redusers/app-reduser";
import {ErrorSnackbar} from "./UI/ErrorSnackBar";

export type TasksStateType = {
  [tdListId: string]: TaskType[]
}

function AppRedux(): JSX.Element {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todoLists)
  const isDarkMode = useAppSelector<boolean>(state => state.app.isDarkMode)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getTodoListsTC())
  }, [])

  const theme = !isDarkMode ? 'light' : 'dark'

  const addNewTodoList = React.useCallback((title: string) => {
    dispatch(createTodoListTC(title))
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


  return (<>
      <ThemeProvider theme={customTheme}>
        <CssBaseline/>
        <div className="App">
          <ErrorSnackbar/>
          <HeaderMUI
            isDarkMode={isDarkMode}
            status={status}
          />

          <Container sx={{height: '100vh'}}>
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

    </>


  );
}

export default AppRedux;
