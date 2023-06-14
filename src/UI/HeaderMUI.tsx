import React from 'react';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import {MenuIcon} from "@mui/material/MenuIcon";
import {MaterialUISwitch} from "./ModeSwitcher";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType, SetColorModeAC} from "../redusers/app-reduser";
import {useAppDispatch} from "../store/store";

type HeaderMUIType = {
  isDarkMode: boolean
  status: RequestStatusType
}

export const HeaderMUI: React.FC<HeaderMUIType> = (props) => {
  const {status, isDarkMode} = props
  const dispatch = useAppDispatch()

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
          {/*<MenuIcon/>*/}
        </IconButton>

        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          TodoLists
        </Typography>

        <FormGroup sx={{mr: 10}}>
          <FormControlLabel
            control={
              <MaterialUISwitch sx={{m: 1}}
                                onChange={(e) => dispatch(SetColorModeAC(e.currentTarget.checked))}
              />}
            label={isDarkMode ? 'Dark' : 'Light'}
          />
        </FormGroup>

        <Button color="inherit">Login</Button>

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