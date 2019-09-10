// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';

// import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

// import { registerUser, signInUser } from '../../Helpers/Requests/sign/sign';
// import { setToken, hasError } from '../../Helpers/Methods/TokenHandeler';
// import { compareAndValidate } from '../../Helpers/Validators/password';
// import { validateEmail } from '../../Helpers/Validators/email';

// const useStyles = makeStyles(theme => ({
//   '@global': {
//     body: {
//       backgroundColor: theme.palette.common.white,
//     },
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: '#3f51b5',
//   },
//   form: {
//     width: '100%',
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
  // link: {
  //   color: '#3f51b5',
  //   textDecoration: 'none',
  // },
  // error: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   color: 'red',
  // }
// }));

// const LoginPage = (props) => {
//   const classes = useStyles();
  // const [errMessage, setErrMessage] = React.useState(null);
  // const [inputValues, setInputValues] = React.useState({
  //   password: '',
  //   passwordTwo: '',
  //   email: ''
  // });

  // const handleChange = (event) => {
  //   event.persist();
  //   setInputValues(inputValues => ({ ...inputValues, [event.target.name]: event.target.value }));
  // }

  // const validateAll = () => {
  //   let validatePass = compareAndValidate(inputValues.password, inputValues.passwordTwo, 4);
  //   if (!validatePass[0]) {
  //     setErrMessage(validatePass[1]);
  //     return false;
  //   }
  //   if (!validateEmail(inputValues.email)) {
  //     setErrMessage('Invalid email address.');
  //     return false;
  //   }

//     return true;
//   }

  // const doLogin = (e) => {
  //   e.preventDefault();

  //   if (!validateAll()) return;
  //   registerUser(inputValues).then((registerd) => {
  //     if (hasError(registerd)) {
  //       setErrMessage(registerd);
  //     } else {
  //       signInUser(inputValues).then((loggedIn) => {
  //         if (hasError(loggedIn)) {
  //           setErrMessage(loggedIn);
  //         } else {
  //           setToken(loggedIn.token);

  //           props.updateAll();
  //           props.history.push('/account');
  //         }
  //       })
  //     }
  //   });
  // }

//   return (
//     <Container component="main" maxWidth="xs">
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h2" variant="h5">
//           Sign Up
//         </Typography>
//         <form className={classes.form} >
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             onChange={handleChange}
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             onChange={handleChange}
//             autoComplete="current-password"
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="passwordTwo"
//             label="Password Again"
//             type="password"
//             id="passwordTwo"
//             onChange={handleChange}
//             autoComplete="current-password"
//           />
//           { errMessage ? (
//             <Typography component="h1" variant="h5" className={classes.error}>
//               { errMessage }
//             </Typography>
//           ) : null}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={doLogin}
//             name="register"
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item>
              // <Link to="/login" variant="body2" className={classes.link}>
              //   {"Already a Member? Login"}
              // </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//     </Container>
//   );
// }

// export default LoginPage;

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { registerUser, signInUser } from '../../Helpers/Requests/sign/sign';
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
    marginTop: theme.spacing(3),
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

const SignUpPage = (props) => {
  const classes = useStyles();
  const [errMessage, setErrMessage] = React.useState(null);
  const [inputValues, setInputValues] = React.useState({
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    agree: false
  });

  const handleChange = (event) => {
    event.persist();
    setInputValues(inputValues => ({ ...inputValues, [event.target.name]: event.target.value }));
  };

  const handleChangeBox = (event) => {
    event.persist();
    setInputValues(inputValues => ({ ...inputValues, "agree": !inputValues.agree }));
  }

  const validateAll = () => {
    if (!validateEmail(inputValues.email)) {
      setErrMessage('Invalid email address.');
      return false;
    }
    if (inputValues.firstName === '' || !inputValues.firstName) {
      setErrMessage('No firstname selected');
      return false;
    }
    if (inputValues.lastName === '' || !inputValues.lastName) {
      setErrMessage('No lastname selected');
      return false;
    }
    if (!validatePassLen(inputValues.password)) {
      setErrMessage('Password needs to be atleast 4 characters long');
      return false;
    }
    if (!inputValues.agree) {
      setErrMessage('must agree to the terms');
      return false;
    }

    return true;
  }

  const doLogin = (e) => {
    e.preventDefault();

    if (!validateAll()) return;
    registerUser(inputValues).then((registerd) => {
      if (hasError(registerd)) {
        setErrMessage(registerd);
      } else {
        signInUser(inputValues).then((loggedIn) => {
          if (hasError(loggedIn)) {
            setErrMessage(loggedIn);
          } else {
            setToken(loggedIn.token);

            props.updateAll();
            props.history.push('/account');
          }
        })
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password (4+ characters)"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="notChecked" color="primary" />}
                label="I agree to terms and conditions"
                required
                name="agree"
                onChange={handleChangeBox}
              />
            </Grid>
          </Grid>
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
            name="register"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="login" variant="body2" className={classes.link}>
                {"Already a Member? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUpPage;
