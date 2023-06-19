import React from 'react';
import Grid from "@mui/material/Grid";

export const NotFound = () => {
  return (
    <Grid container justifyContent={"center"} sx={{textTransform: 'uppercase', fontSize: '42px'}}>
      <h2>
        Page not found
      </h2>
    </Grid>
  );
};

