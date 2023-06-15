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
import {InputWithBtn} from "./components/InputWithBtn";
import {createTodoListTC, getTodoListsTC, TodolistDomainType} from "./redusers/todolists-reducer";
import {RequestStatusType} from "./redusers/app-reduser";
import {ErrorSnackbar} from "./UI/ErrorSnackBar";
import {Login} from "./components/Login";
import {Navigate, Route, Routes} from "react-router-dom";


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

          <Routes>
            <Route path={'/'} element={<Container sx={{height: '100vh'}}>
              <Grid container sx={{padding: '20px 0 50px 0'}}>
                <InputWithBtn addNewItem={addNewTodoList}/>
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
            </Container>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/404'} element={<h1>Page not found</h1>}/>
            <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
          </Routes>

        </div>
      </ThemeProvider>

    </>


  );
}

export default AppRedux;
