import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { validateLoginForm} from '../../utils';
import { loginUser } from "../../fakeDB";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  const [userData, setUserData] = useState({
    email: 'test@test.com',
    password: '1'
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateLoginForm(userData);
    setErrors(err);

    if (!Object.keys(err).length) {
      const { success, message } = loginUser(userData);
      console.log('success', success);
      if (!success) {

        setErrors(prevState => ({ ...prevState, email: message }));
      } else {
        // redirect to home
        handleClick();
      }
    }
  };

  const handleOnChange = (e) => setUserData((prevState) => ({...prevState, [e.target.name]: e.target.value}));
  const emailErrorHelperText = typeof errors.email === "string" ? errors.email : '';



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={!!errors.email}
            value={userData.email}
            onChange={handleOnChange}
            helperText={emailErrorHelperText}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={errors.password}
            value={userData.password}
            onChange={handleOnChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}