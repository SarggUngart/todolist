import React from 'react';
import './App.css';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderMUI from "./UI/HeaderMUI";
import {useAppDispatch, useAppSelector} from "./store/store";
import {getTodoListsTC} from "./redusers/todolists-reducer";
import {RequestStatusType} from "./redusers/app-reduser";
import {ErrorSnackbar} from "./UI/ErrorSnackBar";
import {TodolistsWrapper} from "./components/TodolistsWrapper";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {NotFound} from "./components/NotFound";


function AppRedux(): JSX.Element {

  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isDarkMode = useAppSelector<boolean>(state => state.app.isDarkMode)

  const dispatch = useAppDispatch()

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

  React.useEffect(() => {
    dispatch(getTodoListsTC())
  }, [])


  return (<>
      <ThemeProvider theme={customTheme}>
        <CssBaseline/>
        <div className="App">
          <ErrorSnackbar/>
          <HeaderMUI
            isDarkMode={isDarkMode}
            status={status}
          />
          <Container>
            <Routes>
              <Route path={'/'} element={<TodolistsWrapper/>}/>
              <Route path={'/login'} element={<Login/>}/>
              <Route path={'/404'} element={<NotFound/>}/>
              <Route path={'*'} element={<Navigate to={'404'}/>}/>
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default AppRedux;
