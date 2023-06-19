import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../store/store";
import {SetErrorAC} from "../redusers/app-reduser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector<string | null>(state => state.app.error)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(SetErrorAC(null))
  };


  return (
    <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
      <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
        {error}
      </Alert>
    </Snackbar>
  );
}