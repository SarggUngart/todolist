import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

const validate = (values: any) => {
  const errors: FormikErrorType = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.trim().length < 4) {
    errors.password = 'Must be 4 characters or more';
  }
  return errors;
};

export type LoginType = {
  email: string,
  password: string,
  rememberMe: boolean
}

export const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm()
    },
  });

  const formValidErrorStyle = {color: 'red', fontSize: '13px'}

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'}> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email &&
              <div style={formValidErrorStyle}>{formik.errors.email}</div>}

            <TextField
              type="password"
              label="Password"
              margin='normal'
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password &&
              <div style={formValidErrorStyle}>{formik.errors.password}</div>}

            <FormControlLabel
              label={'Remember me'}
              control={
                <Checkbox
                  checked={formik.values.rememberMe}
                  {...formik.getFieldProps('rememberMe')}
                />}
            />
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}