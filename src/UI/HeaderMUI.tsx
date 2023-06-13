import React from 'react';
import {AppBar, Button, FormControlLabel, FormGroup, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {MaterialUISwitch} from "./ModeSwitcher";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "../redusers/app-reduser";

type HeaderMUIType = {
  isDarkMode: boolean
  setIsDarkMode: (isDarkMode: boolean) => void
  status: RequestStatusType
}

export const HeaderMUI: React.FC<HeaderMUIType> = (props) => {
  const {isDarkMode, status, setIsDarkMode} = props
  console.log(status)
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
          <MenuIcon/>
        </IconButton>

        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          TodoLists
        </Typography>

        <FormGroup sx={{mr: 10}}>
          <FormControlLabel
            control={
              <MaterialUISwitch sx={{m: 1}}
                                onChange={(e) => setIsDarkMode(e.currentTarget.checked)}
              />}
            label={isDarkMode ? 'Dark' : 'Light'}
          />
        </FormGroup>

        <Button color="inherit">Login</Button>

      </Toolbar>
      {status === 'loading'
        &&
        <Box sx={{width: '100%', position: 'absolute', top: '60px'}}>
          <LinearProgress/>
        </Box>
      }
    </AppBar>
  );
};

export default HeaderMUI;