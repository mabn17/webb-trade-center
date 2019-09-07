import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { signInUser } from '../../Helpers/Requests/sign/sign';
import { setToken, hasError } from '../../Helpers/Methods/TokenHandeler';
import { validatePassLen } from '../../Helpers/Validators/password';
import { validateEmail } from '../../Helpers/Validators/email';


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

const LoginPage = (props) => {
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

  const validateAll = () => {
    if (!validateEmail(inputValues.email)) {
      setErrMessage('Invalid email address.');
      return false;
    }
    if (!validatePassLen(inputValues.password)) {
      setErrMessage('Password has to be atleast 4 characters long.');
      return false;
    }
    setErrMessage(null);
    return true;
  }

  const doLogin = (e) => {
    e.preventDefault();

    if (!validateAll()) return;
    signInUser(inputValues)
      .then((res) => {
        if (hasError(res)) {
          setErrMessage(res)
        } else {
          setToken(res.token);
          setInputValues({ email: null, password: null });
          props.updateAll();
          props.history.push('/account');
        }
      })
  }

  return (
    <Container component="main" maxWidth="xs">
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
            name="login"
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
