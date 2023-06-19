import React from 'react';
import './App.css';
import { Container, createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material//CircularProgress";
import HeaderMUI from "./UI/HeaderMUI";
import {useAppDispatch, useAppSelector} from "./store/store";
import {ErrorSnackbar} from "./UI/ErrorSnackBar";
import {TodoListsWrapper} from "./components/TodoListsWrapper";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {NotFound} from "./components/NotFound";
import {MeTC} from "./redusers/auth-reducer";


function App(): JSX.Element {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector<boolean>(state => state.app.isDarkMode)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
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
    dispatch(MeTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return (<>
      <ThemeProvider theme={customTheme}>
        <CssBaseline/>
        <div className="App">
          <ErrorSnackbar/>
          <HeaderMUI
            isDarkMode={isDarkMode}

          />
          <Container>
            <Routes>
              <Route path={'/'} element={<TodoListsWrapper/>}/>
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

export default App;
