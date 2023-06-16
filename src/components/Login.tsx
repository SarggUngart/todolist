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
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more';
  }
  return errors;
};


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
    },
  });


  console.log(formik.errors)
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
              onChange={formik.handleChange}
              label="Email"
              value={formik.values.email}
              name="email"
              margin="normal"
            />
            {formik.errors.email && <div>{formik.errors.email}</div>}

            <TextField
              onChange={formik.handleChange}
              type="password"
              label="Password"
              value={formik.values.password}
              name="password"
              margin="normal"
            />
            {formik.errors.password && <div>{formik.errors.password}</div>}

            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox
                onChange={formik.handleChange}
                name="rememberMe"/>}
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