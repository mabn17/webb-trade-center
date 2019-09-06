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

// import { signInUser } from '../../Helpers/Requests/sign/sign';

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
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const [errMessage, setErrMessage] = React.useState(null);
  const [inputValues, setInputValues] = React.useState({
    password: '',
    passwordTwo: '',
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

  const validatePassword = (
      size = 4, value = inputValues.password,
      valueTwo = inputValues.passwordTwo
    ) => {
    const len = value.length;

    if (len < size) return [false, 'Password has to be atleast 4 characters long.'];
    if (value !== valueTwo) return [false, 'Passwords does not match.'];
    return [true, ''];
  }

  const validateAll = () => {
    if (!validateEmail()) {
      setErrMessage('Invalid email address.');
      return false;
    }
    const validPwd = validatePassword();
    if (!validPwd[0]) {
      setErrMessage(validPwd[1]);
      return false;
    }
    setErrMessage(null);
    return true;
  }

  const doLogin = (e) => {
    e.preventDefault();

    if (!validateAll()) return;
    
    // signInUser(inputValues).then((res) => {
    //   console.log(res);
    //   console.log('');
    // }).catch(err => console.log(err.response));
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign Up
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordTwo"
            label="Password Again"
            type="password"
            id="passwordTwo"
            onChange={handleChange}
            autoComplete="current-password"
          />
          { errMessage ? (
            <Typography component="h1" variant="h5" className={classes.error}>
              { errMessage }
            </Typography>
          ) : null}
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
              <Link to="/login" variant="body2" className={classes.link}>
                {"Already a Member? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
