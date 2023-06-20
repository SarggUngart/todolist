import React from 'react';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {MaterialUISwitch} from "./ModeSwitcher";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType, SetColorModeAC} from "../redusers/app-reduser";
import {useAppDispatch, useAppSelector} from "../store/store";
import {LogoutTC} from "../redusers/auth-reducer";

type HeaderMUIType = {
  isDarkMode: boolean

}

export const HeaderMUI: React.FC<HeaderMUIType> = (props) => {
  const {isDarkMode} = props
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  let isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const onClickLogoutHandler = () => {
    dispatch(LogoutTC())
  }


  return (
    <AppBar position="static">

      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}
        >
        </IconButton>

        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          TodoLists
        </Typography>

        <FormGroup sx={{
          position: 'absolute',
          right: '100px'
        }}>
          <FormControlLabel
            control={
              <MaterialUISwitch
                onChange={(e) => dispatch(SetColorModeAC(e.currentTarget.checked))}
              />}
            label={isDarkMode ? 'Dark' : 'Light'}
          />
        </FormGroup>

        {isLoggedIn
          &&
          <Button onClick={onClickLogoutHandler} color="inherit">{'Logout'}</Button>
        }

      </Toolbar>
      {status === 'loading'
        &&
        <Box sx={{width: '100%', position: 'absolute', top: '60px'}}>
          <LinearProgress color={'secondary'}/>
        </Box>
      }

    </AppBar>
  );
};

export default HeaderMUI;