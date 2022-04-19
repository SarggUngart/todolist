import React from 'react';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

