import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: '#3f51b5',
    textDecoration: 'none',
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const [errMessage, setErrMessage] = React.useState(null);
  const [inputValues, setInputValues] = React.useState({
    password: '',
    email: ''
  });

  const handleChange = (event) => {
    event.persist();
    setInputValues(inputValues => ({ ...inputValues, [event.target.name]: event.target.value }));
  }

  const validateEmail = (value = inputValues.email) => {
    const email = value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }

  const validatePassword = (size = 4, value = inputValues.password) => {
    const len = value.length;
    if (len < size) return false;
    return true;
  }

  const validateAll = () => {
    if (!validateEmail()) {
      setErrMessage('Invalid email address.');
      return false;
    }
    if (!validatePassword()) {
      setErrMessage('Password has to be atleast 4 characters long.');
      return false;
    }
    setErrMessage(null);
    return true;
  }

  const doLogin = (e) => {
    e.preventDefault();

    if (!validateAll()) return;
    console.log(process.env.REACT_APP_BACKEND_URL);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        { errMessage }
      </Typography>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2" className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
